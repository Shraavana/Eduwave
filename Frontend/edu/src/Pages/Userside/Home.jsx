import React from 'react'
import { ArrowRightIcon, AcademicCapIcon, DevicePhoneMobileIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="inline-block p-3 bg-emerald-100 rounded-full">
      <Icon className="h-6 w-6 text-emerald-600" />
    </div>
    <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
)


export default function Home() {
    const navigate = useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const handleAuthAction = () =>{
      console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
      if (isLoggedIn){
        console.log("Logging out...")
        setIsLoggedIn(false);
      }
      else{
        console.log("heloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        navigate('/signin');
      }
    };
   

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="\logo.webp?height=40&width=40" alt="Eduwave Logo" className="h-10 w-10 mr-3" />
              <span className="text-2xl font-bold text-emerald-600">Eduwave</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-emerald-600">Courses</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">Tutors</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">Certificate</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">About</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">Contact</a>
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition duration-300" onClick={handleAuthAction}>
              {isLoggedIn ? 'Logout' : 'GetStarted'}
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Empower Your <span className="text-emerald-600">Learning Journey</span> with Eduwave
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover a world of knowledge at your fingertips. Join thousands of learners and expert instructors on Eduwave, your gateway to endless possibilities.
              </p>
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition duration-300 inline-flex items-center shadow-lg">
                Start Learning Now
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
            <img
                src="\background.webp"
                alt="Students learning online"
                className="absolute inset-0 w-full h-full object-cover"/>

            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 rounded-xl my-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Eduwave?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={AcademicCapIcon}
              title="Expert-Led Courses"
              description="Learn from industry professionals and acclaimed academics in various fields."
            />
            <FeatureCard 
              icon={DevicePhoneMobileIcon}
              title="Learn Anytime, Anywhere"
              description="Access your courses on any device, at your own pace and convenience."
            />
            <FeatureCard 
              icon={UserGroupIcon}
              title="Collaborative Learning"
              description="Engage with a global community of learners through forums and group projects."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald-600 text-white py-16 rounded-xl mx-4 sm:mx-6 lg:mx-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Future?</h2>
            <p className="text-xl mb-8">Join Eduwave today and take the first step towards your goals.</p>
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
              Sign Up for Free
            </button>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Learners Say</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg border border-emerald-100">
            <p className="text-gray-600 italic mb-4 text-lg leading-relaxed">
              "Eduwave has completely transformed my learning experience. The courses are engaging, the instructors are knowledgeable, and the community is incredibly supportive. I've gained skills that have directly impacted my career growth."
            </p>
            <div className="flex items-center">
              <img src="\tutor.jpg?height=50&width=50" alt="Student" className="h-12 w-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold text-gray-900">Sarah Johnson</p>
                <p className="text-emerald-600">Web Developer</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="\logo.webp?height=40&width=40" alt="Eduwave Logo" className="h-8 w-8 mr-3" />
              <span className="text-xl font-bold text-emerald-600">Eduwave</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-emerald-600">Terms</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">Contact</a>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-600 text-sm">
            © 2023 Eduwave. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
