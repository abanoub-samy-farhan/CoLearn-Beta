'use client'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [cookies, setCookie] = useCookies(['session_id']);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    const passwordInput = document.getElementById('password')
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
      setPasswordVisible(true)

    } else {
      passwordInput.type = 'password'
      setPasswordVisible(false)
    }
  }

  const checkAuth = async () => {
    if (cookies.session_id){
      window.location.href = '/dashboard'
    }
  };
  
  useEffect(() => {
    checkAuth();
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address')
    } else {
      setEmailError('')
    }
  }

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long')
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    validateEmail(email)
    validatePassword(password)
    if (emailError || passwordError) {
      return
    }
    fetch('http://localhost:5500/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password}),
    }).then(async (res) => {
      if (res.status === 200) {
        console.log('Logged in successfully')
        const data = await res.json()
        console.log(data.id)
        setCookie('session_id', data.id, { path: '/' })
        window.location.href = '/dashboard'
      } else if (res.status === 404) {
        setLoginError('The user is not registered')
      }
      else {
        setLoginError('Invalid email or password')
      }
    })
    
  }

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      {/* Adding a nav bar for returning home */}
      <nav className="absolute inset-x-0 top-0 z-50">
        <div className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Colearn</span>
              <img
                alt=""
                src="/logo/logo.png"
                className="h-8 w-auto"
              />
            </a>
          </div>
        </div>
      </nav>
      <div className="max-w-md w-full space-y-8 p-10 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  validateEmail(e.target.value)
                }}
              />
              {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"} // Toggle between text/password
                  required
                  minLength={8}
                  data-twe-validate="password"
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                />
                {/* Toggle the eye icon */}
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                >
                {passwordVisible && <IoMdEyeOff />}
                {!passwordVisible && <IoMdEye />}
              </button>
              {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-purple-600 hover:text-indigo-500">
              Sign Up
            </a>
          </p>
          {loginError && <p className="mt-1 text-sm text-red-600">{loginError}</p>}
        </div>
      </div>
    </div>
  )
}
