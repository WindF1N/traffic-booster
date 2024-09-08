from django.core.management.base import BaseCommand
from main.models import CompletedTasks
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from aiogram import Bot
from asgiref.sync import async_to_sync

class Command(BaseCommand):
    help = 'Выводит все завершенные задачи'

    def handle(self, *args, **kwargs):
        # Initialize bot and dispatcher
        bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
        completed_tasks = CompletedTasks.objects.filter(status='pending').exclude(task__link='https://t.me/TraffVPN_bot')
        self.stdout.write(self.style.SUCCESS('Выполнение команды check_completed_tasks'))
        if completed_tasks:
            for completed_task in completed_tasks:
                if completed_task.task.link.startswith('https://t.me/') and completed_task.task.chat_id:
                    # Проверка подписки пользователя на канал или группу
                    user_id = completed_task.user.telegram_id
                    try:
                        chat_member = async_to_sync(bot.get_chat_member)(chat_id=completed_task.task.chat_id, user_id=user_id)
                        if chat_member.status in ['member', 'creator', 'administrator']:
                            completed_task.status = 'awarded'
                            self.stdout.write(f'ID: {completed_task.id}, Task: {completed_task.task.title}, User: {completed_task.user.username}, Status: {completed_task.status}\nGood! User found in chat')
                            completed_task.save()
                        else:
                            self.stdout.write(f'ID: {completed_task.id}, Task: {completed_task.task.title}, User: {completed_task.user.username}, Status: {completed_task.status}\nUser not found in chat')
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f'Ошибка при проверке подписки: {e}'))
                        self.award_completed_task(completed_task)
                else:
                    self.award_completed_task(completed_task)
        else:
            self.stdout.write(self.style.WARNING('Нет завершенных задач'))

    def award_completed_task(self, completed_task):
        if timezone.now() >= completed_task.complete_date + timedelta(hours=completed_task.task.time_to_complete):
            completed_task.status = 'awarded'
            completed_task.save()
            self.stdout.write(f'ID: {completed_task.id}, Task: {completed_task.task.title}, User: {completed_task.user.username}, Status: {completed_task.status}\nThe task is paid')