# Generated by Django 4.1.13 on 2024-08-17 19:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_customuser_telegram_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='PurchasesCharacters',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchase_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата покупки')),
                ('amount_paid', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Сумма оплаты')),
                ('currency', models.CharField(max_length=10, verbose_name='Валюта')),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.characters', verbose_name='Персонаж')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Покупка персонажа',
                'verbose_name_plural': 'Покупки персонажей',
            },
        ),
    ]