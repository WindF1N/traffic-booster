# Generated by Django 4.1.13 on 2024-08-20 21:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_gamekeys_create_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usedgamekeys',
            name='amount_reward',
        ),
    ]
