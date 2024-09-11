import os
import django
import sys
sys.path.append('/home/creatxr/traffic-booster/backend/app')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

import logging
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
import asyncio
from django.conf import settings

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize bot and dispatcher
bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
dp = Dispatcher()

@dp.message(Command('start'))
async def start_command(message: types.Message):
    buttons = [
        [types.InlineKeyboardButton(text="Начать зарабатывать", url="https://t.me/traffic_booster_dev_bot/dev")],
        [types.InlineKeyboardButton(text="Перейти в сообщество", url="https://t.me/Traffbooster_community")]
    ]
    keyboard = types.InlineKeyboardMarkup(inline_keyboard=buttons)
    await bot.send_message(message.chat.id, "Добро пожаловать!", reply_markup=keyboard)

@dp.pre_checkout_query()
async def process_pre_checkout_query(pre_checkout_query: types.PreCheckoutQuery):
    await bot.answer_pre_checkout_query(pre_checkout_query.id, ok=True)

async def main():
    await dp.start_polling(bot)
    
asyncio.run(main())