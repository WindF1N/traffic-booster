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
from django.http import HttpResponseForbidden
import ipaddress

def check_ip(request):
    allowed_ips = ['10.0.0.0/24']  # Разрешенные IP-адреса из VPN-сети
    client_ip = request.META.get('REMOTE_ADDR')

    if not any(ipaddress.ip_address(client_ip) in ipaddress.ip_network(ip_range) for ip_range in allowed_ips):
        return HttpResponseForbidden("Доступ запрещен")

    return None

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
    
admin.site.check_ip = check_ip