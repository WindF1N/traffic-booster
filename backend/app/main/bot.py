import logging
from aiogram import Bot, Dispatcher, types
import asyncio

API_TOKEN = '7327393500:AAG9xQX1QZwdNVM2HpN6lkcNuDvUMsPpMdo'

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize bot and dispatcher
bot = Bot(token=API_TOKEN)
dp = Dispatcher()

@dp.pre_checkout_query()
async def process_pre_checkout_query(pre_checkout_query: types.PreCheckoutQuery): 
    print("checkout_process")
    await bot.answer_pre_checkout_query(pre_checkout_query.id, ok=True)

async def main():
    await dp.start_polling(bot)
    
asyncio.run(main())