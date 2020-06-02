from django.urls import path, include

from accounts.views import MyTokenObtainPairView

urlpatterns = [
    path('token', MyTokenObtainPairView.as_view(), name="token")
]