from django.core.management.base import BaseCommand
from main.models import Characters, PurchasesCharacters
from main.serializers import CharactersSerializer
from django.utils import timezone
from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model
from django.core.cache import cache
from TonTools import *

User = get_user_model()

class Command(BaseCommand):
    help = 'Проверяет новые транзакции на кошелёк, для покупки персонажей'

    def handle(self, *args, **kwargs):
        client = TonCenterClient()
        wallet = Wallet(provider=client, address='UQDJsVlshIwmaoVuPYg3ihUAsIaMTPd9-OgH7rtj-YDAHQHu')
        trs = async_to_sync(wallet.get_transactions)(limit=100)
        for tr in trs:
            tr = tr.to_dict_user_friendly()
            if tr["type"] == "in":
                invoice = cache.get(f'ton-invoice_{tr["comment"]}')
                if invoice:
                    try:
                        user = User.objects.get(telegram_id=invoice["telegram_id"])
                    except User.DoesNotExist:
                        cache.delete(f'ton-invoice_{tr["comment"]}')
                        continue
                    try:
                        character = Characters.objects.get(id=invoice["character_id"])
                    except Characters.DoesNotExist:
                        cache.delete(f'ton-invoice_{tr["comment"]}')
                        continue
                    user.character = character
                    user.save()
                    PurchasesCharacters.objects.create(
                        user=user, 
                        character=character,
                        amount_paid=character.price_ton,
                        currency="ton"
                    )
                    character_serializer = CharactersSerializer(character)
                    cache.set(f'message_{invoice["telegram_id"]}_{timezone.now().timestamp() * 1000}', {
                        "type": "success",
                        "text": f'Уровень {character.name} получен',
                        "name": "Успех:",
                        "new_character": character_serializer.data
                    }, timeout=60*60)
                    cache.delete(f'ton-invoice_{tr["comment"]}')