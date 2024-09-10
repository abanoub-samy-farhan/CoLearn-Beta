'use client'
import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCookies } from 'react-cookie'
const navigation = [
  { name: 'Features', href: '#Features' },
  { name: 'Contact', href: '#Contact' },
]

const features = [
  {
    name: 'Classroom Management',
    description: "Facilitating the organization of classes, assignments, announcements, and more."
  },
  {
    name: 'Progress Tracking',
    description: "Providing tools to monitor student progress and identify areas for improvement."
  },
  {
    name: 'Process Automation',
    description: "Automating routine tasks to save time and improve efficiency such as giving feedbacks and payments using Stripe."
  }
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signedIn, setSignedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['session_id']);

  const checkAuth = async () => {
    if (cookies.session_id){
      setSignedIn(true);
    }
    else{
      setSignedIn(false);
    }
  };
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  const handleSignOut = () => {
    removeCookie('session_id');
    window.location.reload();
  }
  const handleScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);
  
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Colearn</span>
              <img
                alt=""
                src="/logo/avatar.png"
                className="w-auto lg:h-12 h-10"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900"
              onClick={handleScroll}
              >
                <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-purple-700"
              >
                {item.name} 
                </button>
              </a>
            ))}
          </div>
          {signedIn ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="/dashboard" className="p-1.5 px-3 text-sm font-semibold leading-6 text-gray-900 m-1.5 rounded-md hover:bg-purple-100">
              Dashboard
              </a>
              <button 
                type='button' 
                className="p-1.5 text-sm font-semibold px-3 leading-6 text-gray-900 m-1.5 rounded-md hover:bg-purple-100"
                onClick={() => handleSignOut()}>
                  Sign out
              </button>
            </div>
            ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="/signin" className="text-sm rounded-md p-1.5 font-semibold leading-6 text-gray-900 p-1.5 m-1.5 hover:bg-purple-100 ">
                Log in
              </a>
            </div>
          )}
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">CoLearn</span>
                <img
                  alt=""
                  src="/logo/avatar.png"
                  className="h-10 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {signedIn ? (
                  <div className="py-6">
                    <a
                      href="/dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/signout"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Sign out
                    </a>
                  </div>)
                    : (
                    <div className="py-6">
                      <a href="/signin" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                    Log in
                  </a>
                </div>)}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <section className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56" id='About'>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Elevate Learning with Easy Management.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            CoLearn is a cutting-edge platform designed to streamline classroom management, making it intuitive and efficient. 
            With powerful tools for organizing lessons, tracking progress, and engaging students, CoLearn empowers educators to focus on what matters most—teaching and inspiring the next generation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/signin"
                className="rounded-md bg-purple-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              {/* Pressing the learn more href to go to the features */}
              <a href="#Features" 
              onClick={handleScroll}
              className="text-sm font-semibold leading-6 text-gray-900 hover:bg-purple-100 px-3.5 py-2.5 rounded-md">
                <span>Learn More</span>
              </a>

            </div>
          </div>
        </section>
        <section className="py-20 sm:py-24 lg:py-32 my-2" id="Features">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-y-16 sm:gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col justify-items-center items-center space-y-6 p-6 text-center"
              style={{ transitionDelay: "100ms" }}
            >
              <img
                alt=""
                src="/logo/logo.png"
                className="h-16 w-auto"
              />
              <h2 className="text-2xl font-semibold text-gray-900">{feature.name}</h2>
              <p className="text-lg leading-7 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      {/* Making a contact section */}
      <div className="bg-gray-900 text-white py-20 sm:py-24 lg:py-32" id="Contact">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight">Contact Us</h2>
            <p className="mt-6 text-lg leading-8">
              Have a question or need help? Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="mt-12 flex items-center justify-center gap-x-6">
              <a
                href="/signin"
                className="rounded-md bg-purple-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="/signin"
                className="rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Add a footer for CoLearn company */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h2 className="text-2xl font-semibold">About</h2>
              <p className="mt-4 text-base leading-7">
                CoLearn is a cutting-edge platform designed to streamline classroom management, making it intuitive and efficient. With powerful tools for organizing lessons, tracking progress, and engaging students, CoLearn empowers educators to focus on what matters most—teaching and inspiring the next generation.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Features</h2>
              <ul className="mt-4 text-base leading-7">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Contact</h2>
              <address className="mt-4 text-base leading-7">
                <p>1234 Elm St.</p>
                <p>Springfield, IL 62701</p>
                <p>United States</p>
              </address>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-6">
            <p className="text-base leading-7">
              &copy; 2024 CoLearn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
