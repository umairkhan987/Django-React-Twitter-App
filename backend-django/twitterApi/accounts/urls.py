from django.urls import path, include

from accounts.views import MyTokenObtainPairView, UserCreate


urlpatterns = [
    path('token', MyTokenObtainPairView.as_view(), name="token"),
    path('register', UserCreate.as_view(), name="register"),
]