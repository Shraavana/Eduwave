
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SignUp() {
  const navigate = useNavigate();
  const authentication_user = useSelector((state) => state.authentication_user);

  // State management for form fields and errors
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  // Redirect if authenticated
  useEffect(() => {
    if (
      authentication_user.isAuthenticated &&
      !authentication_user.isAdmin &&
      !authentication_user.isTutor
    ) {
      navigate('/');
    }
  }, [authentication_user, navigate]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on input change
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    const { username, email, password, confirm_password } = formState;

    if (!username.trim()) {
      newErrors.username = 'Username is required *';
    } else if (username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters *';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required *';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format *';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required *';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters *';
    }

    if (!confirm_password.trim()) {
      newErrors.confirm_password = 'Confirm Password is required *';
    } else if (password !== confirm_password) {
      newErrors.confirm_password = 'Passwords do not match!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const { username, email, password, confirm_password } = formState;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/signup/`, formData);
      
      // Store email for OTP verification
      localStorage.setItem('registeredEmail', email);
      
      // Show success toast
      toast.success('Registration successful. Please verify your email.');
      
      // Navigate to OTP verification page
      navigate('/otp');
    } catch (error) {
      console.error("Error in Signup", error);
      
      // Handle different error scenarios
      if (error.response) {
        switch (error.response.status) {
          case 400:
            // Handle validation errors
            toast.error('Invalid registration details. Please check your information.');
            break;
          case 409:
            // Handle email already exists
            toast.error('An account with this email already exists.');
            break;
          default:
            toast.error('Registration failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-black-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-3xl font-extrabold text-gray-800">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/signin" className="font-medium text-teal-600 hover:text-teal-500">
              sign in if you already have an account
            </a>
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Username Input */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Choose a username"
                  value={formState.username}
                  onChange={handleChange}
                />
                {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="you@example.com"
                  value={formState.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Enter your password"
                  value={formState.password}
                  onChange={handleChange}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Confirm your password"
                  value={formState.confirm_password}
                  onChange={handleChange}
                />
                {errors.confirm_password && (
                  <span className="text-red-500 text-sm">{errors.confirm_password}</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative hidden lg:block">
          <img
            src="/girl.avif"
            alt="A person using a laptop"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-700 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl font-bold text-center px-6">
              Join our community and start your journey today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;