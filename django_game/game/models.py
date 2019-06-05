from django.db import models


# Create your models here.

class Hero(models.Model):
    x_pos = models.IntegerField(name='x')
    y_pos = models.IntegerField(name='y')
    # health
    # attack


class Enemy(models.Model):
    id = models.IntegerField(name='id', primary_key=True)
    x_pos = models.IntegerField(name='x')
    y_pos = models.IntegerField(name='y')
    # health
    # attack
