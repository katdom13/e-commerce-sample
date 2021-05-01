import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


# Create your views here.
def get_csrf(request):
    response = JsonResponse({
        "info": "Success - Set CSRF cookie"
    })
    response["X-CSRFToken"] = get_token(request)

    return response


@require_POST
def login_view(request):
    # Collect data from request
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    # Validate before authentication
    if username is None or password is None:
        return JsonResponse({"info": "Username and Password is needed"}, status=400)

    # Authenticate
    user = authenticate(username=username, password=password)

    if not user:
        return JsonResponse({"info": "User does not exist"}, status=400)

    # Login
    login(request, user)
    return JsonResponse({"info": "User logged in successfully"})


class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        print(request.user.username)
        return JsonResponse({"username": request.user.username})
