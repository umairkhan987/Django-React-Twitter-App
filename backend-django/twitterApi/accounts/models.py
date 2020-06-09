from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save


class Profile(models.Model):
    user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE, related_name='profile')
    location = models.CharField(max_length=220, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)


def user_did_save(sender, instance, created, *args, **kwargs):
    # Profile.objects.get_or_create(user=instance)
    if created:
        Profile.objects.get_or_create(user=instance)


post_save.connect(user_did_save, sender=User)
