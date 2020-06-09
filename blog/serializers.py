from rest_framework import serializers
from . import models

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ('name', )


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = ('title', 'body', 'categories', )


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ('author', 'body', 'post', )