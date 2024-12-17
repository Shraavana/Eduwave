from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from ..models import *
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Save the user
            user = serializer.save()
            
            # Generate OTP
            otp = user.generate_otp()
            print(otp)
            
            # Send OTP via email
            try:
                print("User getting the emailllllllllllllllllllllllllllll")
                send_mail(
                    'Your OTP for Registration',
                    f'Your OTP is: {otp}',
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
                print("User didint got ittttttttttttttttttttttttttttttttttt")
            except Exception as e:
                # If email sending fails, you might want to handle this
                print(f"Error sending OTP email: {e}")
            
            # Prepare response data
            response_data = {
                'email': user.email,
                'message': 'User registered. OTP sent to email.',
                # Optionally, you can send partial user info
                'user_id': user.id,
                'username': user.username
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        
        try:
            user = User.objects.get(email=email)
            
            # Check if OTP is correct and not expired (valid for 10 minutes)
            if (user.otp == otp and 
                user.otp_created_at and 
                timezone.now() - user.otp_created_at < timezone.timedelta(minutes=10)):
                
                # Mark email as verified
                user.is_email_verified = True
                user.otp = None  # Clear OTP after successful verification
                user.otp_created_at = None
                user.save()
                
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                
                return Response({
                    'message': 'Email verified successfully',
                    'refresh_token': str(refresh),
                    'access_token': str(refresh.access_token)
                }, status=status.HTTP_200_OK)
            
            return Response({'error': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)
        
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)    


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        
        if user:
            # Check if email is verified
            if not user.is_email_verified:
                return Response({
                    'message': 'Please verify your email first'
                }, status=status.HTTP_403_FORBIDDEN)

            # Generate JWT token
            refresh_token = RefreshToken.for_user(user)
            return Response({
                'userid': user.id,
                'username': user.username,
                'is_tutor': user.is_tutor,
                'access_token': str(refresh_token.access_token),
                'refresh_token': str(refresh_token)
            }, status=status.HTTP_200_OK)
        
        return Response({
            'message': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)