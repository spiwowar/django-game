import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from .models import Hero, Enemy


def game(request):
    return render(request, 'game/game.html')

@csrf_exempt
def update_hero(request):
    print(request)
    # if request.method == 'POST':
    body = request.body.decode('utf-8')
    body = json.loads(body)
    x_position = body['x']
    y_position = body['y']
    #try:
    hero = Hero.objects.get(id=1)
    #except Hero.DoesNotExist:
    hero.x = x_position
    hero.y = y_position
    hero.save()
    print('Updated hero position to values: x = {}, y = {}'.format(hero.x, hero.y))
    return JsonResponse({'x': hero.x, 'y': hero.y})

@csrf_exempt
def update_enemy(request):
    # if request.method == 'POST':
    body = request.body.decode('utf-8')
    body = json.loads(body)
    id = body['id']
    x_position = body['x']
    y_position = body['y']
    try:
        enemy = Enemy.objects.get(id=id)
    except Enemy.DoesNotExist:
        enemy = Enemy(id=id, x=x_position, y=y_position)
    else:
        enemy.x = x_position
        enemy.y = y_position
    enemy.save()
    print('Updated enemy position to values: id = {}, x = {}, y = {}'.format(enemy.id, enemy.x, enemy.y))
    return JsonResponse({'id': enemy.id, 'x': enemy.x, 'y': enemy.y})


def get_hero(request):
    try:
        hero = Hero.objects.get(id=1)
    except Hero.DoesNotExist:
        hero = Hero(x=11, y=11)
        hero.save()
    return JsonResponse({'x': hero.x, 'y': hero.y})


def get_enemies(request):
    enemies = Enemy.objects.all()
    enemies_json = [{'id': enemy.id, 'x': enemy.x, 'y': enemy.y} for enemy in enemies]
    return JsonResponse({'enemies': enemies_json})
