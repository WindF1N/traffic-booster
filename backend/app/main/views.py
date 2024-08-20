from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
import jwt
import urllib.parse
import hmac
import hashlib
import random
import string
from django.conf import settings
import json
import traceback
from .models import CustomUser, Characters, Tasks, Balances, Advertisers, Tariffs, Wallets, GameKeys, Games, PurchasesCharacters, CompletedTasks, UsedGameKeys
from .serializers import (
    CustomUserSerializer, CharactersSerializer, TasksSerializer, BalancesSerializer,
    AdvertisersSerializer, TariffsSerializer, WalletsSerializer, GameKeysSerializer, GamesSerializer,
    PurchasesCharactersSerializer, CompletedTasksSerializer
)

User = get_user_model()

class TelegramAuthView(APIView):
    def post(self, request):
        try:
            init_data = urllib.parse.parse_qs(json.loads(request.body)['initData'])
            if self.verify_telegram_init_data(init_data):
                user_data = self.extract_user_data(init_data)
                user, created = User.objects.get_or_create(telegram_id=user_data['telegram_id'])
                user.username = user_data['username']
                user.referral_code = self.generate_referral_code()
                user.save()
                # Добавляем персонажа с типом standart
                if created:
                    if 'start_param' in init_data:
                        try:
                            referred_user = CustomUser.objects.get(referral_code=init_data['start_param'][0])
                            user.referred_by = referred_user
                            try:
                                balance = Balances.objects.get(user=referred_user)
                                balance.amount += 100000
                                balance.save()
                            except Balances.DoesNotExist:
                                balance = Balances.objects.create(user=referred_user, amount=100000)  # Создаем баланс с начальным значением 100000.
                        except:
                            pass
                    standard_character = Characters.objects.get(type='standart')
                    user.character = standard_character
                    user.save()
                payload = {
                    'user_id': user.id,
                    'telegram_id': user_data['telegram_id'],
                }
                token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
                return Response({'token': token}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid init data'}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def verify_telegram_init_data(self, parsed_data):
        try:
            hash_ = parsed_data['hash'][0]
            data_check_string = '\n'.join(f'{key}={value[0]}' for key, value in sorted(parsed_data.items()) if key != 'hash')
            secret_key = hmac.new(b'WebAppData', settings.TELEGRAM_BOT_TOKEN.encode(), hashlib.sha256).digest()
            calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
            return hmac.compare_digest(calculated_hash, hash_)
        except:
            traceback.print_exc()
            return False

    def extract_user_data(self, init_data):
        user_data = init_data['user'][0]
        user_dict = json.loads(user_data.replace('true', 'true').replace('false', 'false').replace('null', 'null'))
        username = user_dict.get('username', self.generate_username_hash(user_dict['id']))
        return {
            'telegram_id': user_dict['id'],
            'username': username,
        }

    def generate_username_hash(self, user_id):
        return hashlib.md5(str(user_id).encode('utf-8')).hexdigest()[:8]

    def generate_referral_code(self):
        characters = string.ascii_letters + string.digits
        while True:
            code = ''.join(random.choice(characters) for _ in range(6))
            if not User.objects.filter(referral_code=code).exists():
                return code
            
class AccountInfoView(APIView):
    def get(self, request):
        token = request.headers.get('Authorization', '').split(' ')[-1]
        if not token:
            return Response({'error': 'Token not provided'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            balance = Balances.objects.get(user=user)
        except Balances.DoesNotExist:
            balance = Balances.objects.create(user=user, amount=0)  # Создаем баланс с начальным значением 0

        balance_serializer = BalancesSerializer(balance)

        character = user.character
        character_serializer = CharactersSerializer(character)

        account_info = {
            'user': CustomUserSerializer(user).data,
            'balance': balance_serializer.data,
            'character': character_serializer.data,
        }
        return Response(account_info, status=status.HTTP_200_OK)
    
class CharactersView(APIView):
    def get(self, request):
        token = request.headers.get('Authorization', '').split(' ')[-1]
        if not token:
            return Response({'error': 'Token not provided'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        characters = Characters.objects.all().order_by('multiplier')
        character_serializer = CharactersSerializer(characters, many=True)
        return Response({
            "characters": character_serializer.data
        }, status=status.HTTP_200_OK)
    
    def post(self, request):
        token = request.headers.get('Authorization', '').split(' ')[-1]
        if not token:
            return Response({'error': 'Token not provided'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        data = json.loads(request.body)
        if data["currency"] == "stars":
            balance = Balances.objects.get(user=user)
            character = Characters.objects.get(id=data["character_id"])
            if character.price_stars > balance.amount:
                return Response({'error': 'Not enough stars'}, status=status.HTTP_400_BAD_REQUEST)
            balance.amount -= character.price_stars
            balance.save()
            user.character = character
            user.save()
            purchase_character = PurchasesCharacters.objects.create(
                user=user, 
                character=character,
                amount_paid=character.price_stars,
                currency=data["currency"]
            )
            purchase_character_serializer = PurchasesCharactersSerializer(purchase_character)
            return Response({'purchase': purchase_character_serializer.data}, status=status.HTTP_200_OK)
        elif data["currency"] == "ton":
            return Response({'success': 'Coming soon...'}, status=status.HTTP_200_OK)
        
class SyncBalanceView(APIView):
    def post(self, request):
        token = request.headers.get('Authorization', '').split(' ')[-1]
        if not token:
            return Response({'error': 'Token not provided'}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Получение данных о балансе из запроса
        balance_to_add = request.data.get('balance', 0)
        if not isinstance(balance_to_add, int) or balance_to_add < 0:
            return Response({'error': 'Invalid balance value'}, status=status.HTTP_400_BAD_REQUEST)
        
        balance = Balances.objects.get(user=user)
        # Обновление баланса пользователя
        balance.amount += balance_to_add
        balance.save()

        return Response({'message': 'Balance updated successfully', 'new_balance': balance.amount}, status=status.HTTP_200_OK)
    
class TasksView(APIView):
    def get(self, request):
        token = request.headers.get('Authorization', '').split(' ')[-1]
        if not token:
            return Response({'error': 'Token not provided'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        tasks = Tasks.objects.all().order_by('limit_type')
        tasks_serializer = TasksSerializer(tasks, context={'user': user}, many=True)
        return Response({
            "tasks": tasks_serializer.data
        }, status=status.HTTP_200_OK)
    
    def post(self, request):
        token = request.headers.get('Authorization', '').split(' ')[-1]
        if not token:
            return Response({'error': 'Token not provided'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        data = json.loads(request.body)
        balance = Balances.objects.get(user=user)
        task = Tasks.objects.get(id=data["task_id"])
        try:
            completed_task = CompletedTasks.objects.get(user=user, task=task)
            completed_task_serializer = CompletedTasksSerializer(completed_task)
            return Response({
                'error': 'Task already completed',
                'completed_task': completed_task_serializer.data,
            }, status=status.HTTP_400_BAD_REQUEST)
        except:
            completed_task = CompletedTasks.objects.create(
                user=user, 
                task=task,
                amount_reward=task.reward,
                status="pending" if task.time_to_complete > 0 else "awarded"
            )
            if completed_task.status == "awarded":
                balance.amount += task.reward
                balance.save()
            task.limit_count_reserved += 1
            task.save()
            task_serializer = TasksSerializer(task, context={'user': user})
            completed_task_serializer = CompletedTasksSerializer(completed_task)
            balance_serializer = BalancesSerializer(balance)
            return Response({
                'new_balance': balance_serializer.data,
                'task': task_serializer.data
            }, status=status.HTTP_200_OK)

class GamesView(APIView):
    def get(self, request):
        token = request.headers.get('Authorization', '').split(' ')[-1]
        if not token:
            return Response({'error': 'Token not provided'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        games = Games.objects.all()
        games_serializer = GamesSerializer(games, context={'user': user}, many=True)
        return Response({
            "games": games_serializer.data
        }, status=status.HTTP_200_OK)
    
class CheckKeyView(APIView):
    def post(self, request):
        token = request.headers.get('Authorization', '').split(' ')[-1]
        if not token:
            return Response({'error': 'Token not provided'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        data = json.loads(request.body)
        try:
            balance = Balances.objects.get(user=user)
            game = Games.objects.get(id=data["game_id"])
            game_key = GameKeys.objects.get(value=data["key"], game=game, used=False)
        except Balances.DoesNotExist:
            return Response({'error': 'Balance not found'}, status=status.HTTP_404_NOT_FOUND)
        except Games.DoesNotExist:
            return Response({'error': 'Game not found'}, status=status.HTTP_404_NOT_FOUND)
        except GameKeys.DoesNotExist:
            return Response({'error': 'Game key not found'}, status=status.HTTP_404_NOT_FOUND)
        if UsedGameKeys.objects.filter(user=user, game_key=game_key).exists():
            return Response({'error': 'Game key already used'}, status=status.HTTP_400_BAD_REQUEST)
        used_game_keys = UsedGameKeys.objects.filter(user=user, game_key__game=game)
        if used_game_keys.count() < 3:
            UsedGameKeys.objects.create(user=user, game_key=game_key)
            game_key.used = True
            game_key.save()
        if used_game_keys.count() == 3:
            balance.amount += 1000000
            balance.save()
        balance_serializer = BalancesSerializer(balance)
        return Response({
            "new_balance": balance_serializer.data,
            "used_game_keys_count": used_game_keys.count()
        }, status=status.HTTP_200_OK)

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class CharactersViewSet(viewsets.ModelViewSet):
    queryset = Characters.objects.all()
    serializer_class = CharactersSerializer

class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer

class BalancesViewSet(viewsets.ModelViewSet):
    queryset = Balances.objects.all()
    serializer_class = BalancesSerializer

class AdvertisersViewSet(viewsets.ModelViewSet):
    queryset = Advertisers.objects.all()
    serializer_class = AdvertisersSerializer

class TariffsViewSet(viewsets.ModelViewSet):
    queryset = Tariffs.objects.all()
    serializer_class = TariffsSerializer

class WalletsViewSet(viewsets.ModelViewSet):
    queryset = Wallets.objects.all()
    serializer_class = WalletsSerializer

class GameKeysViewSet(viewsets.ModelViewSet):
    queryset = GameKeys.objects.all()
    serializer_class = GameKeysSerializer

class GamesViewSet(viewsets.ModelViewSet):
    queryset = Games.objects.all()
    serializer_class = GamesSerializer