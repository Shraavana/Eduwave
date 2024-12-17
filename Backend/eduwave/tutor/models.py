from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

class Tutor(models.Model):
    DEGREE_CHOICES = [
        ('bed', 'B.Ed'),
        ('msc', 'M.Sc'),
        ('ma', 'M.A'),
        ('other', 'Other')
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('declined', 'Declined')
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tutor_profile')
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    teaching_experience = models.FloatField(validators=[MinValueValidator(1.0)])
    degree = models.CharField(max_length=20, choices=DEGREE_CHOICES)
    certificate = models.FileField(upload_to='tutor_certificates/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    approval_date = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.username

class TutorApprovalLog(models.Model):
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    admin = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=Tutor.STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    comments = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.tutor.username} - {self.status}"