from django.urls import resolve
from django.http import Http404

class WireGuardMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if resolve(request.path_info).app_name == 'admin':
            allowed_ips = ['94.25.182.30']
            client_ip = request.META.get('HTTP_X_FORWARDED_FOR')
            if client_ip:
                # Извлекаем первый IP-адрес из заголовка X-Forwarded-For
                client_ip = client_ip.split(',')[0].strip()
            else:
                client_ip = request.META.get('REMOTE_ADDR')
            if client_ip not in allowed_ips:
                raise Http404
        response = self.get_response(request)
        return response