from django.db import models

class Post(models.Model):
    content = models.CharField(max_length=200)
    owner = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)