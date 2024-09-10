'use client';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { MdMenu } from "react-icons/md";
import { LogoutOutlined, DeleteOutlined } from '@ant-design/icons';
import { CookiesProvider, useCookies } from 'react-cookie';
import Classrooms from './Classrooms';
import QuizMaker from './Quizmaker';

const navigationItems = [
  { name: 'Classrooms', href: '#' },
  { name: 'Assignments', href: '#' },
  { name: 'Quizzes', href: '#' },
  { name: 'Analytics', href: '#analytics' },
];

function DeleteAccountModal({ setIsModalOpen, removeCookie, cookies }) {
  const handleDeleteAccount = () => {
    const id = cookies.session_id;
    fetch(`http://localhost:5500/api/v1/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      if (res.status === 200) {
        console.log('Account deleted successfully');
        removeCookie('session_id');
        window.location.href = '/';
      } else {
        console.log('Failed to delete account');
      }
    });
  };
  return (
    <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-4/5 lg:w-2/5" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold text-gray-900">Delete Account</h2>
        <p className="text-gray-700">Are you sure you want to delete your account?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={handleDeleteAccount}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ setIsModalOpen }) {
  const [selectedItem, setSelectedItem] = useState(navigationItems[0].name);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden p-6 flex justify-between items-center text-gray-900 width-full">
        <button onClick={() => setMobileMenuOpen(true)}>
          <MdMenu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-900 text-white flex flex-col transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex items-center justify-between p-6">
          <a href="/" className="text-white text-lg font-bold">
            CoLearn Dashboard
          </a>
          <button onClick={() => setMobileMenuOpen(false)} className="text-white lg:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => {
                setSelectedItem(item.name);
                setMobileMenuOpen(false);
              }}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                selectedItem === item.name ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="flex-shrink-0 p-4 border-t border-gray-700">
          <a
            href="/"
            className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-red-700 hover:text-white m-1"
          >
            Log Out
          </a>
          <button
            className="group flex items-center px-2 w-full py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-red-700 hover:text-white m-1"
            onClick={() => setIsModalOpen(true)}
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(navigationItems[0].name);
  const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSignOut = () => {
    removeCookie('session_id');
  };

  return (
    <CookiesProvider>
      {cookies.session_id ? (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
          {/* Mobile navbar button */}
          <MobileMenu setIsModalOpen={setIsDeleteModalOpen} />

          {isDeleteModalOpen && (
            <DeleteAccountModal setIsModalOpen={setIsDeleteModalOpen} removeCookie={removeCookie} cookies={cookies} />
          )}

          {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white lg:flex lg:flex-col hidden">
            <div className="flex-shrink-0 p-6">
              <a href="/" className="text-white text-lg font-bold">
                CoLearn Dashboard
              </a>
            </div>
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setSelectedItem(item.name)}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    selectedItem === item.name ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex-shrink-0 p-4 border-t border-gray-700">
              <a
                href="/"
                className="group flex items-center px-2 py-2 text-sm font-medium w-full rounded-md text-gray-300 hover:bg-red-700 hover:text-white m-1"
                onClick={handleSignOut}
              >
                <LogoutOutlined className="mr-2" />
                Log Out
              </a>
              <button
                className="group flex items-center px-2 py-2 text-sm font-medium w-full rounded-md text-gray-300 hover:bg-red-700 hover:text-white mb-10 m-1"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <DeleteOutlined className="mr-2" />
                Delete Account
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-auto p-6">
            <QuizMaker />
          </div>
        </div>
      ) : (
        <Navigate to="/signin" />
      )}
    </CookiesProvider>
  );
}
