from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework.test import APIClient

from .models import Tweet


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test1", password="test1")
        Tweet.objects.create(content="test the first tweet", user=self.user)
        Tweet.objects.create(content="test the 2nd tweet", user=self.user)
        Tweet.objects.create(content="test the 3rd tweet", user=self.user)

    def test_tweet_created(self):
        tweet = Tweet.objects.create(content="test the 4th tweet", user=self.user)
        self.assertEqual(tweet.id, 4)
        self.assertEqual(tweet.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password="test1")
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_action_like(self):
        client = self.get_client()
        data = {"id": 1, "action": "like"}
        response = client.post("/api/tweets/action", data)
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 1)

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/api/tweets/action", {"id": 2, "action": "like"})
        self.assertEqual(response.status_code, 200)

        tweet_like_count = self.user.tweetlike_set.count()
        self.assertEqual(tweet_like_count, 1)

        response = client.post("/api/tweets/action", {"id": 2, "action": "unlike"})
        self.assertEqual(response.status_code, 200)

        like_count = response.json().get("likes")
        self.assertEqual(like_count, 0)

    def test_action_retweet(self):
        client = self.get_client()
        response = client.post("/api/tweets/action", {"id": 2, "action": "retweet"})
        self.assertEqual(response.status_code, 201)

    def test_tweet_create(self):
        client = self.get_client()
        response = client.post("/api/tweets/create", {"content": "test the create tweet", "user": self.user})
        self.assertEqual(response.status_code, 201)
        total_obj = Tweet.objects.all().count()
        self.assertEqual(total_obj, response.json().get("id"))

    def test_tweet_detail(self):
        client = self.get_client()
        response = client.get("/api/tweets/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(1, response.json().get("id"))

    def test_tweet_delete(self):
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete")
        self.assertEqual(response.status_code, 200)
        response = client.delete("/api/tweets/1/delete")
        self.assertEqual(response.status_code, 404)

    def test_tweet_related_name(self):
        user = self.user
        self.assertEqual(user.tweets.count(), 3)
