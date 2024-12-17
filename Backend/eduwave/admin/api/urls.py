from django.urls import path
from .views import (
    AdminLoginView, 
    AdminLogoutView, 
    AdminDashboardView,
    TutorViewSet
)

urlpatterns = [
    # Authentication Routes
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin/logout/', AdminLogoutView.as_view(), name='admin-logout'),
    
    # Dashboard Route
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
    
    # Tutor Management Routes
    path('admin/tutors/', TutorViewSet.as_view({'get': 'list'}), name='admin-tutor-list'),
    path('admin/tutors/<int:pk>/approve/', TutorViewSet.as_view({'post': 'approve_or_decline'}), name='admin-tutor-approve'),
]