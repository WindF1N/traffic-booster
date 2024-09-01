from django.contrib import admin
from .models import CustomUser, Characters, Tasks, Balances, Farmings, Advertisers, Tariffs, Wallets, GameKeys, Games, PurchasesCharacters, CompletedTasks, UsedGameKeys
from django.forms import Textarea, TextInput

# Регистрация моделей с настройками отображения

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'character', 'referral_code', 'referred_by')
    search_fields = ('username', 'email', 'referral_code')
    list_filter = ('is_staff', 'is_active', 'date_joined')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'character', 'referral_code', 'referred_by')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

@admin.register(Characters)
class CharactersAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'price_ton', 'price_stars', 'multiplier')
    list_filter = ('type',)
    search_fields = ('name',)

@admin.register(Tasks)
class TasksAdmin(admin.ModelAdmin):
    list_display = ('category', 'title', 'reward', 'limit_type', 'get_limit_count', 'time_to_complete', 'advertiser', 'link')
    list_filter = ('category', 'limit_type', 'advertiser')
    search_fields = ('title', 'description', 'category', 'link')

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, request, **kwargs)
        if db_field.name == 'description':
            formfield.widget = Textarea(attrs={'placeholder': 'Введите пункты для выполнения задания используя строки'})
        if db_field.name == 'limit_count_reserved':
            formfield.widget = TextInput(attrs={'disabled': True})
        return formfield
    
    def get_limit_count(self, obj):
        if obj.limit_type == 'limited':
            return f"{obj.limit_count_reserved}/{obj.limit_count}"
        else:
            return "∞"
        
    get_limit_count.short_description = 'Лимит мест'

    class Media:
        js = ['tasks_admin.js']
        
@admin.register(Balances)
class BalancesAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount')
    search_fields = ('user__username',)

@admin.register(Farmings)
class FarmingsAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'start_date', 'end_date')
    search_fields = ('user__username',)

@admin.register(Advertisers)
class AdvertisersAdmin(admin.ModelAdmin):
    list_display = ('user', 'payment_date', 'tariff')
    list_filter = ('tariff',)
    search_fields = ('user__username',)

@admin.register(Tariffs)
class TariffsAdmin(admin.ModelAdmin):
    list_display = ('name', 'price_ton', 'price_stars')
    search_fields = ('name',)

@admin.register(Wallets)
class WalletsAdmin(admin.ModelAdmin):
    list_display = ('user', 'address')
    search_fields = ('user__username', 'address')

@admin.register(GameKeys)
class GameKeysAdmin(admin.ModelAdmin):
    list_display = ('value',)
    search_fields = ('value',)

@admin.register(Games)
class GamesAdmin(admin.ModelAdmin):
    list_display = ('name', 'link')
    search_fields = ('name', 'description')

@admin.register(PurchasesCharacters)
class PurchasesCharactersAdmin(admin.ModelAdmin):
    list_display = ('user', 'character', 'amount_paid', 'currency', 'purchase_date')
    search_fields = ('user', 'character')

@admin.register(CompletedTasks)
class CompletedTasksAdmin(admin.ModelAdmin):
    list_display = ('user', 'task', 'amount_reward', 'status', 'complete_date')
    search_fields = ('user', 'task', 'amount_reward', 'status')

@admin.register(UsedGameKeys)
class UsedGameKeysAdmin(admin.ModelAdmin):
    list_display = ('user', 'game_key', 'use_date')
    search_fields = ('user', 'game_key')