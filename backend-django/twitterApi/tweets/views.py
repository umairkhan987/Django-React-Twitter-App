from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, redirect

from .forms import TweetForm
from .models import Tweet


def tweet_create_view(request, *args, **kwargs):
    form = TweetForm(request.POST or None)
    if form.is_valid():
        obj = form.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201);
        return redirect("/")
    return render(request, "common/form.html", context={"form": form})


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html')


def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweet_list = [x.serialize() for x in qs]
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
