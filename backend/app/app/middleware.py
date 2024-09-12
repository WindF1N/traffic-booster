from django.http import HttpResponseForbidden
from django.urls import resolve
from django.http import Http404

class WireGuardMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Проверяем, является ли текущий путь частью админской панели
        if resolve(request.path_info).app_name == 'admin':
            allowed_ips = ['94.25.182.30']  # Разрешенные IP-адреса из VPN-сети
            client_ip = request.META.get('HTTP_X_REAL_IP', request.META.get('REMOTE_ADDR', None))
            if not client_ip in allowed_ips:
                return HttpResponseForbidden("Доступ запрещен для IP-адреса %s" % client_ip)

        response = self.get_response(request)
        return response