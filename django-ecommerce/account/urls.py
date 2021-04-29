from django.urls import path

from . import views

app_name = "account"


urlpatterns = [
    # For generating csrf token
    path("csrf/", views.get_csrf, name="api-csrf"),
    # For logging in
    # path("login/", views.login, name="api-login"),
    # # Collect the username and return for confirmation
    # path("whoami/", views.WhoAmIView.as_view(), name="whoami"),
]
