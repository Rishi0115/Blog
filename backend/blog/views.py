from django.shortcuts import render
from rest_framework import viewsets
from .models import BlogPost
from .serializers import BlogPostSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from .permissions import IsAuthorOrReadOnly

# Create your views here.
class BlogPostViewSet(viewsets.ModelViewSet):
    queryset=BlogPost.objects.all()
    serializer_class=BlogPostSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ['category', 'author', 'is_published']
    ordering_fields = ['created_at', 'updated_at','title']
    search_fields = ['title', 'content']
    permission_classes = [IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)