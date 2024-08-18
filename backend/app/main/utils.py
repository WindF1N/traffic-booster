import hashlib
import hmac
from django.conf import settings
import urllib.parse
import traceback

# def verify_telegram_init_data(init_data):
#     try:
#         data_check_string = '\n'.join(sorted([f"{k}={v}" for k, v in init_data.items() if k != 'hash']))
#         secret_key = hmac.new(key=settings.TELEGRAM_BOT_TOKEN.encode(), msg='WebAppData'.encode(), digestmod=hashlib.sha256).digest()
#         hash = hmac.new(key=secret_key, msg=data_check_string.encode(), digestmod=hashlib.sha256).hexdigest()
#         return hash == init_data['hash']
#     except Exception as e:
#         return False
    
def verify_telegram_init_data(init_data):
    try:
        parsed_data = urllib.parse.parse_qs(init_data)
        hash_ = parsed_data['hash'][0]
        data_check_string = '\n'.join(f'{key}={value[0]}' for key, value in sorted(parsed_data.items()) if key != 'hash')
        secret_key = hmac.new(b'WebAppData', settings.TELEGRAM_BOT_TOKEN.encode(), hashlib.sha256).digest()
        calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
        return hmac.compare_digest(calculated_hash, hash_)
    except:
        traceback.print_exc()
        return False