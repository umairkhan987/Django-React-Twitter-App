from django.urls import path
from . import views

urlpatterns = [
    path("", views.home_view, name="home"),
    path("tweets", views.tweet_list_view, name="tweet_list"),
    path("create-tweet", views.tweet_create_view, name="create_tweet"),
    path("tweets/<int:id>", views.tweet_detail_view, name="tweet_detail"),
]
