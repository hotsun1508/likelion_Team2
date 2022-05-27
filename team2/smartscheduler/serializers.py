#djangoreactapi/post/models.py
from rest_framework import serializers
from .models import Student

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'student_name',
            'student_number',
            'password',
        )
        model = Student