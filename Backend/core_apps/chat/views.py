from django.shortcuts import render
from django.http import JsonResponse


def HelloWorld(request):
    greetings = 'Hello World!'
    return JsonResponse({'message': greetings})




