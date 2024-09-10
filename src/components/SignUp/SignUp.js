'use client'
import { useState } from 'react'
import { validate } from 'uuid'

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [role, setRole] = useState('teacher')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.length === 0) {
      setEmailError('Email is required')
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email address')
    }
    else {
        setEmailError('')
    }
  }

  const validatePassword = (password) => {
    if (password.length === 0) {
      setPasswordError('Password is required')
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long')
    } else {
      setPasswordError('')
    }
  }

    const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword.length === 0) {
      setConfirmPasswordError('Confirm Password is required')
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match')
    } else {
      setConfirmPasswordError('')
    }
}
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle sign up logic
    if (!emailError && !passwordError && !confirmPasswordError) {
        await fetch('http://localhost:5500/signup',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password,
                role
            })
        }).then((res) => {
            if (res.ok){
                window.location.href = '/signin';
                console.log('User created successfully')
            }
            else if (res.status === 409){
                setEmailError('User already exists, try logging in')
            }
            else{
                console.log('Internal server error')
            }
        })
    }
    else{
        validateEmail(email)
        validatePassword(password)
        validateConfirmPassword(confirmPassword)
    }
  }

return (
    <div className="bg-white to-red-500 min-h-screen flex items-center justify-center ">
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
        <div className="max-w-md w-full space-y-8 p-10 rounded-lg shadow-lg mt-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Create your account
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                    {/* Making firstname, lastname feilds next to each other */}
                    <div className="flex flex-row my-2 space-x-2">
                        <div>
                            <label htmlFor="first-name" className="sr-only">First Name</label>
                            <input
                                id="first-name"
                                name="first-name"
                                type="text"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="First Name"
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="last-name" className="sr-only">Last Name</label>
                            <input
                                id="last-name"
                                name="last-name"
                                type="text"
                                required
                                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Last Name"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => {
                                    setEmail(e.target.value)
                                    validateEmail(e.target.value)
                            }}
                        />
                        {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                    setPassword(e.target.value)
                                    validatePassword(e.target.value)
                            }}
                        />
                            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)
                                    validateConfirmPassword(e.target.value)
                            }}
                        />
                            {confirmPasswordError && <p className="mt-1 text-sm text-red-600">{confirmPasswordError}</p>}
                    </div>
                    {/* Adding an arial for Teacher and Student options */}
                    <div className='space-y-2'>
                        <label htmlFor="role" className="sr-only">Role</label>
                        <select
                            id="role"
                            name="role"
                            required
                            className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
            </div>
                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-800 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            <div className="text-center mt-2">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="/signin" className="font-medium text-purple-600 hover:text-purple-500">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    </div>
)
}
