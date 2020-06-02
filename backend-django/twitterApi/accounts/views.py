from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView

# change claim and get new Token Class
from accounts.serializers import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
