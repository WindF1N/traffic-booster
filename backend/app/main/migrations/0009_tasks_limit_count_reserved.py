# Generated by Django 4.1.13 on 2024-08-18 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_completedtasks'),
    ]

    operations = [
        migrations.AddField(
            model_name='tasks',
            name='limit_count_reserved',
            field=models.IntegerField(blank=True, null=True, verbose_name='Занято мест'),
        ),
    ]