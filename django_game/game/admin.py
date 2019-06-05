from django.contrib import admin

# Register your models here.
from .models import Hero, Enemy

admin.site.register(Hero)
admin.site.register(Enemy)