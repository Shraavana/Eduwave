from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from tutor.models import Tutor, TutorApprovalLog

class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user is not None and user.is_staff:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_staff': user.is_staff
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                }
            }, status=status.HTTP_200_OK)
        
        return Response({
            'error': 'Invalid credentials or insufficient permissions'
        }, status=status.HTTP_401_UNAUTHORIZED)

class AdminLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({
            'message': 'Logout successful'
        }, status=status.HTTP_200_OK)

class AdminDashboardView(APIView):
    def get(self, request):
        # Provide dashboard statistics
       

        stats = {
            'total_tutors': Tutor.objects.count(),
            'pending_tutors': Tutor.objects.filter(status='pending').count(),
            'approved_tutors': Tutor.objects.filter(status='approved').count(),
            'declined_tutors': Tutor.objects.filter(status='declined').count(),
            'recent_approvals': TutorApprovalLog.objects.filter(
                status='approved'
            ).order_by('-created_at')[:5].values(
                'tutor__username', 
                'tutor__email', 
                'created_at'
            )
        }
        
        return Response(stats)