from django.urls import path
from . import views

urlpatterns = [
    path('', views.game, name='game'),
    path('update_hero/', views.update_hero, name='update_hero'),
    path('update_enemy/', views.update_enemy, name='update_enemy'),
    path('get_hero/', views.get_hero, name='get_hero'),
    path('get_enemies/', views.get_enemies, name='get_enemies'),
]
