from rest_framework import serializers
from django.contrib.auth.models import User
from tutor.models import Tutor, TutorApprovalLog

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class TutorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Tutor
        fields = [
            'id', 'user', 'username', 'email', 
            'teaching_experience', 'degree', 
            'certificate', 'status'
        ]
        read_only_fields = ['status']

class TutorApprovalSerializer(serializers.ModelSerializer):
    tutor_details = TutorSerializer(source='tutor', read_only=True)
    
    class Meta:
        model = TutorApprovalLog
        fields = [
            'id', 'tutor', 'tutor_details', 
            'admin', 'status', 'created_at', 'comments'
        ]