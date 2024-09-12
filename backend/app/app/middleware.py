from django.http import HttpResponseForbidden
from django.urls import resolve

class WireGuardMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Проверяем, является ли текущий путь частью админской панели
        if resolve(request.path_info).app_name == 'admin':
            allowed_ips = ['10.0.0.0/24']  # Разрешенные IP-адреса из VPN-сети
            client_ip = request.META.get('HTTP_X_FORWARDED_FOR')

            if client_ip:
                # Извлекаем первый IP-адрес из заголовка X-Forwarded-For
                client_ip = client_ip.split(',')[0].strip()
            else:
                client_ip = request.META.get('REMOTE_ADDR')

            if not any(self.ip_in_range(client_ip, ip_range) for ip_range in allowed_ips):
                return HttpResponseForbidden(f"Доступ запрещен для IP-адреса {client_ip}\n{request.META.get('HTTP_X_FORWARDED_FOR')}\n{request.META.get('REMOTE_ADDR')}\n{request.META.get('HTTP_X_REAL_IP')}")

        response = self.get_response(request)
        return response

    def ip_in_range(self, ip, ip_range):
        import ipaddress
        return ipaddress.ip_address(ip) in ipaddress.ip_network(ip_range)