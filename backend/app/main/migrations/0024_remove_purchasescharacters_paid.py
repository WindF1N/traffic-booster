# Generated by Django 5.1.1 on 2024-09-13 19:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_purchasescharacters_paid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='purchasescharacters',
            name='paid',
        ),
    ]