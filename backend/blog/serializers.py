from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    date=serializers.DateTimeField(source='created_at', read_only=True)
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'category','author', 'date', 'excerpt', 'is_published']
        read_only_fields = ['author']