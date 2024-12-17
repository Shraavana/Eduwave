import React, { useState } from 'react';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    experience: '',
    certificate: '',
    certificate: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Handle file upload separately
    if (name === 'certificate') {
      setFormData(prev => ({
        ...prev,
        certificate: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Experience validation
    if (!formData.experience) {
      newErrors.experience = 'Teaching experience is required';
    } else {
      const expYears = parseFloat(formData.experience);
      if (isNaN(expYears) || expYears < 1) {
        newErrors.experience = 'Experience must be at least 1 year';
      }
    }

    // Certificate validation
    if (!formData.certificate) {
      newErrors.certificate = 'Educational certificate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate form before submission
    if (validateForm()) {
      setIsLoading(true);

      // Create FormData for file upload
      const formSubmissionData = new FormData();
      Object.keys(formData).forEach(key => {
        formSubmissionData.append(key, formData[key]);
      });

      // Simulating an API call
      setTimeout(() => {
        // Here you would typically send the formSubmissionData to your backend
        console.log('Form submitted', formData);
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-3xl font-extrabold text-gray-800">Create your Tutor Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
              sign in if you already have an account
            </a>
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Teaching Experience */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Teaching Experience (Years)
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="number"
                  min="1"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.experience ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
                  placeholder="Minimum 1 year"
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-500">{errors.experience}</p>
                )}
              </div>

              {/* Educational Certificate */}
              <div>
              <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
    Degree
  </label>
  <select
    id="certificate"
    name="certificate"
    required
    value={formData.certificate}

    className={`w-full px-3 py-2 border ${
      errors.certificate ? 'border-red-500' : 'border-gray-300'
    } rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
  >
    <option value="">Select Degree</option>
    <option value="bed">B.Ed</option>
    <option value="msc">M.Sc</option>
    <option value="ma">M.A</option>
    <option value="other">Other</option>
  </select>
  {errors.certificate && (
    <p className="mt-1 text-sm text-red-500">{errors.certificate}</p>
  )}
              </div>

              {/* Profile Picture */}
              <div>
                <label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
                  Certificate
                </label>
                <input
                  id="certificate"
                  name="certificate"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ${
                  isLoading && 'opacity-75 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">Or continue with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {['Facebook', 'Twitter', 'GitHub'].map((provider) => (
                <a
                  key={provider}
                  href="#"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
                >
                  <span className="sr-only">Sign up with {provider}</span>
                  <img src={`/${provider.toLowerCase()}.svg`} alt={provider} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative hidden lg:block">
          <img
            src="\tutor.jpg?height=600&width=400"
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