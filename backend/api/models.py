from django.contrib.auth.models import User
from django.db import models

class Post(models.Model):
    content = models.CharField(max_length=200)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)