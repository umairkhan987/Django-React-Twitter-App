from django.urls import path
from . import views

urlpatterns = [
    path("", views.tweet_list_view, name="tweet_list"),
    path("feed", views.tweet_feed_view, name="feed_tweet"),
    path("create", views.tweet_create_view, name="create_tweet"),
    path("<int:id>", views.tweet_detail_view, name="tweet_detail"),
    path("action", views.tweet_action_view, name="tweet_action"),
    path("<int:id>/delete", views.tweet_delete_view, name="tweet_delete"),
]
