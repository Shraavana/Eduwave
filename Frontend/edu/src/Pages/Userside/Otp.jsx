import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve email from local storage (set during signup)
    const registeredEmail = localStorage.getItem('registeredEmail');
    if (registeredEmail) {
      setEmail(registeredEmail);
    } else {
      // If no email is found, redirect back to signup
      navigate('/signup');
    }
  }, [navigate]);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/verify-otp/`, 
        { email, otp }
      );

      // Clear stored email after successful verification
      localStorage.removeItem('registeredEmail');

      // Store tokens if needed
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('access_token', response.data.access_token);

      // Show success and navigate to login/home
      toast.success('Email verified successfully');
      navigate('/signin');  // or '/home' depending on your routing
    } catch (error) {
      // Handle error scenarios
      if (error.response) {
        toast.error(error.response.data.error || 'OTP verification failed');
        setError(error.response.data.error || 'Verification failed');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-black-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the OTP sent to {email}
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleOTPSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="otp" className="sr-only">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength="6"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  // Only allow numeric input
                  const value = e.target.value.replace(/\D/g, '');
                  setOTP(value);
                  setError('');
                }}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;