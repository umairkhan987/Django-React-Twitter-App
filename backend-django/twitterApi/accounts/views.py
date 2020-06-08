from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.serializers import MyTokenObtainPairSerializer, UserSerializer
from rest_framework.decorators import api_view


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# simple method to register user
@api_view(['POST'])
def register_user(request, *args, **kwargs):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=201)


# Generic view for Register User
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

# class Login(views.APIView):
#     def post(self, request, *args, **kwargs):
#         if not request.data:
#             return Response({'Error': "Please provide username and password"}, status=400)
#
#         username = request.data['username']
#         password = request.data['password']
#
#         user = auth.authenticate(username=username, password=password)
#         if user:
#             payload = {
#                 'id': user.id,
#                 'username': user.username
#             }
#
#             jwt_token = {'token': jwt.encode(payload, "SECRET_KEY")}
#             return Response(
#                 jwt_token,
#                 status=200,
#                 content_type="application/json"
#             )
#         else:
#             return Response(
#                 {"Error": "Invalid Credentials"},
#                 status=400,
#                 content_type="application/json"
#             )
