from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from accounts.models import Profile
from accounts.serializers import MyTokenObtainPairSerializer, UserSerializer
from rest_framework.decorators import api_view
from .serializers import ProfileSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# function based view for register user
@api_view(['POST'])
def register_user(request, *args, **kwargs):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=201)


# Generic based view or class based view for register user
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


@api_view(['GET'])
def profile_detail_view(request, username, *args, **kwargs):
    try:
        qs = Profile.objects.filter(user__username=username)
        if not qs.exists():
            return Response({"Error": "Profile Not Found"}, status=404)
        profile = qs.first()
        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data, status=200)
    except Profile.DoesNotExist:
        return Response({"Error": "Profile Not Found"}, status=404)


@api_view(['GET'])
def get_profile_view(request, *args, **kwargs):
    try:
        if not request.user.is_authenticated:
            return Response({'Error': "Unauthorized Access"}, status=401)
        user = request.user
        profile = user.profile
        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data, status=200)
    except Profile.DoesNotExist:
        return Response({"Error": "Profile Not Found"}, status=404)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'Error': "Unauthorized Access"}, status=401)
        user = request.user
        profile = user.profile
        serializer = ProfileSerializer(instance=profile, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=200)

    # def post(self, request):
    #     if hasattr(request.user, 'profile'):
    #         return Response({"Error": "Profile already created."}, status=403)
    #     serializer = ProfileSerializer(data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save(user=request.user)
    #         return Response(serializer.data, status=201)


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
