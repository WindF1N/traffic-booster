import os
import django
import sys
sys.path.append('/home/creatxr/traffic-booster/backend/app')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

import logging
from aiogram import Bot, Dispatcher, types
import asyncio
from django.conf import settings

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize bot and dispatcher
bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
dp = Dispatcher()

@dp.pre_checkout_query()
async def process_pre_checkout_query(pre_checkout_query: types.PreCheckoutQuery): 
    print("checkout_process")
    await bot.answer_pre_checkout_query(pre_checkout_query.id, ok=True)

async def main():
    await dp.start_polling(bot)
    
asyncio.run(main())