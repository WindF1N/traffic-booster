from django.http import HttpResponseForbidden
from django.urls import resolve

class WireGuardMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Проверяем, является ли текущий путь частью админской панели
        if resolve(request.path_info).app_name == 'admin':
            allowed_ips = ['10.0.0.0/24']  # Разрешенные IP-адреса из VPN-сети
            client_ip = request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR'))

            if not any(self.ip_in_range(client_ip, ip_range) for ip_range in allowed_ips):
                return HttpResponseForbidden("Доступ запрещен для IP-адреса %s" % client_ip)

        response = self.get_response(request)
        return response

    def ip_in_range(self, ip, ip_range):
        import ipaddress
        return ipaddress.ip_address(ip) in ipaddress.ip_network(ip_range)