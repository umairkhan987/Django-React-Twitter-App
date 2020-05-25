import random

from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render

from .models import Tweet


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html')


def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweet_list = [{"id": x.id, "content": x.content, "likes": random.randint(0, 150)} for x in qs]
    data = {
        "response": tweet_list
    }
    return JsonResponse(data)


def tweet_detail_view(request, id):
    data = {
        "id": id
    }
    try:
        qs = Tweet.objects.get(pk=id)
        data["content"] = qs.content
    except:
        data["message"] = "no tweet found"

    return JsonResponse(data)
