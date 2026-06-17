from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    category = models.CharField(max_length=100)
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    excerpt = models.CharField(max_length=255, blank=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=[('user', 'User'), ('admin', 'Admin')], default='user')

    def __str__(self):
        return f"{self.user.username} - {self.role}"
        