from django.conf import settings
from django.http import HttpResponse, JsonResponse, Http404
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .forms import TweetForm
from .models import Tweet
from .serializers import TweetSerializer, TweetActionSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def tweet_detail_view(request, id, *args, **kwargs):
    qs = Tweet.objects.filter(id=id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)


@api_view(['DELETE', 'POST'])
def tweet_delete_view(request, id, *args, **kwargs):
    qs = Tweet.objects.filter(id=id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "you cannot delete this tweet."}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Tweet successfully removed"}, status=200)


@api_view(['POST'])
def tweet_action_view(request, *args, **kwargs):
    """
    id is required.
    Action option are like, unlike and re-tweet
    """
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        id = data.get("id")
        action = data.get("action")

        qs = Tweet.objects.filter(id=id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
        elif action == "retweet":
            pass
    return Response({}, status=200)


def tweet_create_view_pure_django(request, *args, **kwargs):
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


def tweet_list_view_pure_django(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweet_list = [x.serialize() for x in qs]
    data = {
        "response": tweet_list
    }
    return JsonResponse(data)


def tweet_detail_view_pure_django(request, id):
    data = {
        "id": id
    }
    try:
        qs = Tweet.objects.get(pk=id)
        data["content"] = qs.content
    except:
        data["message"] = "no tweet found"

    return JsonResponse(data)
