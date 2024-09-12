from django.urls import resolve
from django.http import Http404

class WireGuardMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if resolve(request.path_info).app_name == 'admin':
            allowed_ips = ['94.25.182.30'] 
            client_ip = request.META.get('HTTP_X_REAL_IP', request.META.get('REMOTE_ADDR', None))
            if not client_ip in allowed_ips:
                raise Http404

        response = self.get_response(request)
        return response