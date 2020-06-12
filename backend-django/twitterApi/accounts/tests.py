from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from .models import Profile


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test1", password="test1")
        self.userb = User.objects.create_user(username="test2", password="test2")

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password="test1")
        return client

    def test_profile_created(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user
        second = self.userb
        first.profile.followers.add(second)
        qs = second.following.filter(user=first)
        first_user_following_no_one = first.following.all()
        self.assertTrue(qs.exists())
        self.assertFalse(first_user_following_no_one.exists())

    def test_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(f"/api/auth/profile/{self.userb.username}/follow",
                               {"action": "follow"}
                               )
        data = response.json()
        self.assertEqual(data['followers'], 1)
        self.assertEqual(response.status_code, 200)

        response = client.post(f"/api/auth/profile/{self.userb.username}/follow",
                               {"action": "unfollow"}
                               )
        data = response.json()
        self.assertEqual(data['followers'], 0)
        self.assertEqual(response.status_code, 200)
