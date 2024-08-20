from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

class CustomUser(AbstractUser):
    character = models.ForeignKey('Characters', on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Персонаж")
    referral_code = models.CharField(max_length=255, unique=True, null=True, blank=True, verbose_name="Реферальный код")
    referred_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Пригласил")
    telegram_id = models.BigIntegerField(unique=True, null=True, blank=True, verbose_name="Telegram ID")

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

class Characters(models.Model):
    TYPE_CHOICES = [
        ('standart', 'Новичок'),
        ('silver', 'Опытный'),
        ('gold', 'Легенда'),
    ]
    name = models.CharField(max_length=255, verbose_name="Имя")
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, verbose_name="Тип")
    price_ton = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена в TON")
    price_stars = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена в Stars")
    multiplier = models.DecimalField(max_digits=2, decimal_places=1, verbose_name="Множитель заработка")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Персонаж"
        verbose_name_plural = "Персонажи"

class Tasks(models.Model):
    LIMIT_TYPE_CHOICES = [
        ('limited', 'Лимитированный'),
        ('unlimited', 'Безлимитный'),
    ]
    title = models.CharField(max_length=255, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")
    reward = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Награда")
    limit_type = models.CharField(max_length=10, choices=LIMIT_TYPE_CHOICES, verbose_name="Тип лимита")
    limit_count = models.IntegerField(null=True, blank=True, verbose_name="Количество мест")
    limit_count_reserved = models.IntegerField(blank=True, verbose_name="Занято мест", default=0)
    time_to_complete = models.IntegerField(verbose_name="Время начисления монет (в часах)")
    advertiser = models.ForeignKey('Advertisers', on_delete=models.CASCADE, verbose_name="Рекламодатель")
    category = models.CharField(max_length=255, verbose_name="Категория")
    link = models.CharField(max_length=255, verbose_name="Ссылка")
    picture = models.ImageField(upload_to='tasks/', verbose_name="Иконка")
    picture_color = models.CharField(max_length=10, verbose_name="Цвет тени иконки")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Задание"
        verbose_name_plural = "Задания"

class Balances(models.Model):
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, verbose_name="Пользователь")
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Количество монет")

    def __str__(self):
        return f"Balance for User {self.user.username}"

    class Meta:
        verbose_name = "Баланс"
        verbose_name_plural = "Балансы"

class Advertisers(models.Model):
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, verbose_name="Пользователь")
    payment_date = models.DateTimeField(verbose_name="Дата и время оплаты")
    tariff = models.ForeignKey('Tariffs', on_delete=models.CASCADE, verbose_name="Тариф")

    def __str__(self):
        return f"Advertiser {self.user.username}"

    class Meta:
        verbose_name = "Рекламодатель"
        verbose_name_plural = "Рекламодатели"

class Tariffs(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    price_ton = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена в TON")
    price_stars = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена в Stars")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тариф"
        verbose_name_plural = "Тарифы"

class Wallets(models.Model):
    user = models.OneToOneField('CustomUser', on_delete=models.CASCADE, verbose_name="Пользователь")
    address = models.CharField(max_length=255, verbose_name="Адрес кошелька")

    def __str__(self):
        return self.address

    class Meta:
        verbose_name = "Кошелек"
        verbose_name_plural = "Кошельки"

class Games(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название")
    picture = models.ImageField(upload_to='games/', verbose_name="Картинка")
    link = models.CharField(max_length=255, verbose_name="Ссылка")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Игра"
        verbose_name_plural = "Игры"

class GameKeys(models.Model):
    game = models.ForeignKey('Games', on_delete=models.CASCADE, verbose_name="Игра")
    value = models.CharField(max_length=255, unique=True, verbose_name="Значение ключа")
    used = models.BooleanField(default=False, verbose_name="Использован")
    create_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    def __str__(self):
        return self.value

    class Meta:
        verbose_name = "Игровой ключ"
        verbose_name_plural = "Игровые ключи"

class UsedGameKeys(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, verbose_name="Пользователь")
    game_key = models.ForeignKey('GameKeys', on_delete=models.CASCADE, verbose_name="Игровой ключ")
    use_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата использования")

    def __str__(self):
        return f"Исппользованный ключ {self.game_key.value} пользователем {self.user.username} в {self.use_date}"

    class Meta:
        verbose_name = "Использованный ключ"
        verbose_name_plural = "Использованные ключи"

class PurchasesCharacters(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, verbose_name="Пользователь")
    character = models.ForeignKey('Characters', on_delete=models.CASCADE, verbose_name="Персонаж")
    purchase_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата покупки")
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Сумма оплаты")
    currency = models.CharField(max_length=10, verbose_name="Валюта")

    def __str__(self):
        return f"Покупка {self.character.name} пользователем {self.user.username} в {self.purchase_date}"

    class Meta:
        verbose_name = "Покупка персонажа"
        verbose_name_plural = "Покупки персонажей"

class CompletedTasks(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Выполняется'),
        ('awarded', 'Награда получена'),
    ]
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, verbose_name="Пользователь")
    task = models.ForeignKey('Tasks', on_delete=models.CASCADE, verbose_name="Задание")
    complete_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата выполнения")
    amount_reward = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Сумма награды")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, verbose_name="Статус")

    def __str__(self):
        return f"""Задание "{self.task.title}" выполнено пользователем {self.user.username} в {self.complete_date}"""

    class Meta:
        verbose_name = "Выполненное задание"
        verbose_name_plural = "Выполненные задания"

@receiver(pre_save, sender=CompletedTasks)
def save_old_status(sender, instance, **kwargs):
    try:
        old_instance = sender.objects.get(pk=instance.pk)
        instance._old_status = old_instance.status
    except sender.DoesNotExist:
        instance._old_status = None

@receiver(post_save, sender=CompletedTasks)
def update_user_balance(sender, instance, **kwargs):
    if instance._old_status != 'awarded' and instance.status == 'awarded':
        balance = Balances.objects.get(user=instance.user)
        balance.amount += instance.amount_reward
        balance.save()