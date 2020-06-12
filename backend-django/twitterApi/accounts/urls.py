from django.urls import path, include

from accounts.views import MyTokenObtainPairView, UserCreate, ProfileView, profile_detail_view, get_profile_view, \
    user_follow_view

urlpatterns = [
    path('token', MyTokenObtainPairView.as_view(), name="token"),
    path('register', UserCreate.as_view(), name="register"),
    path('profile', get_profile_view, name="get-profile"),
    path('profile/update', ProfileView.as_view(), name="profile-update"),
    path('profile/<str:username>', profile_detail_view, name="profile-detail-view"),
    path('profile/<str:username>/follow', user_follow_view, name="profile-follow"),
]
