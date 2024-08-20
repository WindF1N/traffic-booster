from rest_framework import serializers
from .models import CustomUser, Characters, Tasks, Balances, Advertisers, Tariffs, Wallets, GameKeys, Games, PurchasesCharacters, CompletedTasks, UsedGameKeys

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'referral_code', 'referred_by', 'character']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            referral_code=validated_data.get('referral_code'),
            referred_by=validated_data.get('referred_by'),
            character=validated_data.get('character')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class CharactersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characters
        fields = '__all__'

class TasksSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Tasks
        fields = '__all__'

    def get_status(self, obj):
        user = self.context.get('user')
        if user:
            try:
                completed_task = CompletedTasks.objects.get(user=user, task=obj)
                return completed_task.status
            except CompletedTasks.DoesNotExist:
                return None
        return None

class BalancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balances
        fields = '__all__'

class AdvertisersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisers
        fields = '__all__'

class TariffsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tariffs
        fields = '__all__'

class WalletsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallets
        fields = '__all__'

class GameKeysSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameKeys
        fields = '__all__'

class GamesSerializer(serializers.ModelSerializer):
    used_keys_count = serializers.SerializerMethodField()

    class Meta:
        model = Games
        fields = '__all__'

    def get_used_keys_count(self, obj):
        user = self.context.get('user')
        if user:
            used_game_keys_count = UsedGameKeys.objects.filter(user=user, game_key__game=obj).count()
            return used_game_keys_count
        return 0

class PurchasesCharactersSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchasesCharacters
        fields = '__all__'

class CompletedTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedTasks
        fields = '__all__'