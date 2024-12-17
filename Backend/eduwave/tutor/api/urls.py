from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TutorViewSet

router = DefaultRouter()
router.register(r'tutors', TutorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('tutors/<int:pk>/approve/', TutorViewSet.as_view({'post': 'approve_or_decline'}), name='tutor-approve-decline'),
]