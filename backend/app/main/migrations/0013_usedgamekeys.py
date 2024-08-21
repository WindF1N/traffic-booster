# Generated by Django 4.1.13 on 2024-08-20 20:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_remove_games_description_gamekeys_game'),
    ]

    operations = [
        migrations.CreateModel(
            name='UsedGameKeys',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('use_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата использования')),
                ('amount_reward', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Сумма награды')),
                ('game_key', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.gamekeys', verbose_name='Игровой ключ')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Использованный ключ',
                'verbose_name_plural': 'Использованные ключи',
            },
        ),
    ]