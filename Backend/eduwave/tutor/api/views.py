from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings

from tutor.models import Tutor, TutorApprovalLog
from .serializers import TutorSerializer, TutorApprovalSerializer

class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create user
        user = User.objects.create_user(
            username=serializer.validated_data['username'],
            email=serializer.validated_data['email']
        )
        
        # Create tutor profile
        tutor = serializer.save(user=user, status='pending')
        
        # Send confirmation email
        self._send_signup_confirmation_email(tutor)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['POST'])
    def approve_or_decline(self, request, pk=None):
        tutor = self.get_object()
        status_choice = request.data.get('status', 'pending')
        admin = request.user

        if status_choice not in ['approved', 'declined']:
            return Response(
                {'error': 'Invalid status'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update tutor status
        tutor.status = status_choice
        tutor.save()

        # Create approval log
        TutorApprovalLog.objects.create(
            tutor=tutor, 
            admin=admin, 
            status=status_choice,
            comments=request.data.get('comments', '')
        )

        # Send email notification
        self._send_status_change_email(tutor)

        return Response({
            'message': f'Tutor {status_choice}', 
            'status': tutor.status
        })

    def _send_signup_confirmation_email(self, tutor):
        subject = 'Tutor Signup Received'
        message = f'''
        Hello {tutor.username},

        Your tutor signup has been received and is pending approval. 
        You will be notified once the admin reviews your application.

        Best regards,
        Tutor Platform
        '''
        send_mail(
            subject, 
            message, 
            settings.DEFAULT_FROM_EMAIL, 
            [tutor.email]
        )

    def _send_status_change_email(self, tutor):
        subject = 'Tutor Application Status Update'
        message = f'''
        Hello {tutor.username},

        Your tutor application status has been updated to: {tutor.get_status_display()}.
        
        {'Congratulations! You can now login to your account.' if tutor.status == 'approved' else 'Please contact support for more information.'}

        Best regards,
        Tutor Platform
        '''
        send_mail(
            subject, 
            message, 
            settings.DEFAULT_FROM_EMAIL, 
            [tutor.email]
        )