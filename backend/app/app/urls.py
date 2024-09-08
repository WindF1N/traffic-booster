from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from main.views import (
    CustomUserViewSet, CharactersViewSet, TasksViewSet, BalancesViewSet,
    AdvertisersViewSet, TariffsViewSet, WalletsViewSet, GameKeysViewSet, 
    GamesViewSet, TelegramAuthView, AccountInfoView, CharactersView, SyncBalanceView, 
    TasksView, GamesView, CheckKeyView, FarmingView, MessagesView, CheckVPNPayment
)
from django.conf import settings
from django.conf.urls.static import static

# router = DefaultRouter()
# router.register(r'users', CustomUserViewSet)
# router.register(r'characters', CharactersViewSet)
# router.register(r'tasks', TasksViewSet)
# router.register(r'balances', BalancesViewSet)
# router.register(r'advertisers', AdvertisersViewSet)
# router.register(r'tariffs', TariffsViewSet)
# router.register(r'wallets', WalletsViewSet)
# router.register(r'gamekeys', GameKeysViewSet)
# router.register(r'games', GamesViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(router.urls)),
    path('auth/telegram/', TelegramAuthView.as_view(), name='telegram_auth'),
    path('me/', AccountInfoView.as_view(), name='account_info'),
    path('characters/', CharactersView.as_view(), name='characters'),
    path('tasks/', TasksView.as_view(), name='tasks'),
    path('games/', GamesView.as_view(), name='games'),
    path('sync_balance/', SyncBalanceView.as_view(), name='sync_balance'),
    path('farming/', FarmingView.as_view(), name='farming'),
    path('check_key/', CheckKeyView.as_view(), name='check_key'),
    path('get_messages/', MessagesView.as_view(), name='get_messages'),
    path('check_vpn_payment/', CheckVPNPayment.as_view(), name='check_vpn_payment'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)