import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosConfig.js"; 
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setAuthentication } from "../../redux/slices/authSlice.js";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticationUser = useSelector((state) => state.authentication_user);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Redirect authenticated users
  useEffect(() => {
    if (authenticationUser.isAuthenticated && !authenticationUser.isAdmin && !authenticationUser.isTeacher) {
      navigate("/");
    }
  }, [authenticationUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError("");
    setPasswordError("");

    if (!formData.email.trim()) {
      setEmailError("Email is required");
      return false;
    }

    if (!emailPattern.test(formData.email)) {
      setEmailError("Invalid email format");
      return false;
    }

    if (!formData.password.trim()) {
      setPasswordError("Password is required");
      return false;
    }

    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError(""); // Clear previous login errors

    if (!validate()) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/login/`, formData);

      if (res.status === 200) {
        const { access_token, refresh_token, userid, is_tutor, username } = res.data;

        // Save tokens to local storage
        localStorage.setItem("access", access_token);
        localStorage.setItem("refresh", refresh_token);
        localStorage.setItem("userid", userid);

        // Dispatch authentication state
        dispatch(
          setAuthentication({
            name: username,
            isAuthenticated: true,
            userid,
            isAdmin: false,
            isTeacher: is_tutor, // Use is_tutor from backend
          })
        );

        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error", error);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error("Invalid credentials");
            setLoginError("Invalid email or password");
            break;
          case 403:
            toast.error("Please verify your email first");
            setLoginError("Email not verified");
            navigate("/otp"); // Optional: redirect to OTP verification
            break;
          default:
            toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-black-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white p-8 rounded-xl shadow-lg grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-3xl font-extrabold text-gray-800">Sign In to Your Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
              Sign Up
            </Link>{" "}
            if you don't have an account
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
              </div>
            </div>
            {loginError && <p className="text-red-600 text-sm mt-1">{loginError}</p>}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ${
                  isLoading && "opacity-75 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative hidden lg:block">
          <img
            src="/boy.jpg"
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

export default SignIn;