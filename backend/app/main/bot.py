import os
import django
import sys
sys.path.append('/home/creatxr/traffic-booster/backend/app')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

import logging
from aiogram import Bot, Dispatcher, F, types, Router
from aiogram.filters import Command
import asyncio
from django.conf import settings
from main.models import Characters, PurchasesCharacters
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.utils import timezone
from asgiref.sync import sync_to_async
from main.serializers import CharactersSerializer

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize bot and dispatcher
bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
dp = Dispatcher()
router = Router()
dp.include_router(router)

User = get_user_model()

@dp.message(Command('start'))
async def start_command(message: types.Message):
    buttons = [
        [types.InlineKeyboardButton(text="Начать зарабатывать", url="https://t.me/traffic_booster_dev_bot/dev")],
        [types.InlineKeyboardButton(text="Перейти в сообщество", url="https://t.me/Traffbooster_community")]
    ]
    keyboard = types.InlineKeyboardMarkup(inline_keyboard=buttons)
    await bot.send_message(message.chat.id, """
<b>Добро пожаловать в мир Traffic Booster!</b>
Выполняя простые задания и учавствуя в увлекательных играх, вы уже сейчас можете получать уникальные бонусы от наших партнёров! Более того, всё наше активное сообщество получит airdrop токена $TRAFF. Не забывайте: с друзьями играть веселее и выгоднее — приглашайте их и зарабатывайте больше наград вместе!
""", reply_markup=keyboard, parse_mode='HTML')

@router.pre_checkout_query()
async def process_pre_checkout_query(query: types.PreCheckoutQuery):
    await query.answer(ok=True)

@router.message(F.successful_payment)
async def success_payment(message: types.Message, bot: Bot):
    character_id = message.successful_payment.invoice_payload.split("_")[-1]
    try:
        user = await sync_to_async(User.objects.get)(telegram_id=message.from_user.id)
    except User.DoesNotExist:
        return
    try:
        character =  await sync_to_async(Characters.objects.get)(id=character_id)
    except Characters.DoesNotExist:
        return
    user.character = character
    await sync_to_async(user.save)()
    await sync_to_async(PurchasesCharacters.objects.create)(
        user=user, 
        character=character,
        amount_paid=character.price_stars,
        currency="stars"
    )
    character_serializer = CharactersSerializer(character)
    await sync_to_async(cache.set)(f'message_{message.from_user.id}_{timezone.now().timestamp() * 1000}', {
        "type": "success",
        "text": f'Уровень {character.name} получен',
        "name": "Успех:",
        "new_character": character_serializer.data
    }, timeout=60*60)
    # await bot.refund_star_payment(
    #     user_id=message.from_user.id,
    #     telegram_payment_charge_id=message.successful_payment.telegram_payment_charge_id,
    # )
    await message.answer(text=f"Уровень {character.name} получен")

async def main():
    await dp.start_polling(bot)
    
asyncio.run(main(), debug=True)