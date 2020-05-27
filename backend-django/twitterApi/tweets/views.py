from django.conf import settings
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, redirect

from .forms import TweetForm
from .models import Tweet


def tweet_create_view(request, *args, **kwargs):
    # if user is not authenticated
    if not request.user.is_authenticated:
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)

    # if user is authenticated
    form = TweetForm(request.POST or None)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user.is_authenticated or None
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201);
        return redirect("/")

    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)

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
