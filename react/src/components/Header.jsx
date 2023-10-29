import React, { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import axiosClient from '../axios-client.js';


const navigation = [
  { name: 'Home', to: '/dashboard' },
  { name: 'Restaurants', to: '/restaurants' },
  { name: 'Meals', to: '/meals' },
  { name: 'Activities', to: '/activities' },
  { name: 'Table for two', to: '/tablefortwo' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = ({ user, onLogout }) => {

  const [isOpen, setIsOpen] = useState(false);

  const openSlideOver = () => {
    setIsOpen(true);
  };

  const closeSlideOver = () => {
    setIsOpen(false);
  };

  const slideOverClasses = isOpen
    ? 'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-96 shadow-xl transform translate-x-0 transition-transform ease-in-out duration-300'
    : 'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-96 shadow-xl transform translate-x-full transition-transform ease-in-out duration-300';



  const location = useLocation(); // Get the current location
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const imageUrl =
    user?.profileImageUrl ||
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>


<div className={slideOverClasses}>
        <div className="p-4 border-r border-gray-200">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Cart</h2>
            <button className="text-gray-500" onClick={closeSlideOver}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="py-4">
  <div className="flex mb-4">
    <div className="rounded-lg w-16 h-16 bg-gray-300 mr-4"></div> {/* Product image */}
    <div className="flex-grow">
      <div className="font-semibold">Product Name 1</div> {/* Product name */}
      <div className="text-gray-500">Quantity: 2</div> {/* Product quantity */}
      <div className="font-semibold">LKR 20.00</div> {/* Product price */}
    </div>
    <button className="text-red-500 ml-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="0" fill="#FED7D7" /> {/* Change the fill color here */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12H18" />
      </svg>
    </button>
  </div>

  <div className="flex mb-4">
    <div className="rounded-lg w-16 h-16 bg-gray-300 mr-4"></div> {/* Product image */}
    <div className="flex-grow">
      <div className="font-semibold">Product Name 2</div> {/* Product name */}
      <div className="text-gray-500">Quantity: 1</div> {/* Product quantity */}
      <div className="font-semibold">LKR 15.00</div> {/* Product price */}
    </div>
    <button className="text-red-500 ml-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="0" fill="#FED7D7" /> {/* Change the fill color here */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12H18" />
      </svg>
    </button>
  </div>

  {/* Cart total */}
  <div className="mt- text-gray-500">
    <span className="font-bold">Total:</span>
    <span className="ml-auto">LKR 35.00</span>
    <p><span className="font-bold">Order Fee: LKR 1552.00</span><span className="ml-auto"> (40% off the total)</span></p>
  </div>
  
</div>


        </div>

        <button className="bg-green-500 text-white p-4 hover:bg-green-600" onClick={closeSlideOver}>
          Conform Order - LKR 1552.00
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-10"
          onClick={closeSlideOver}
        />
      )}




          {/* Desktop view */}
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Mobile menu button*/}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Company logo and navigation */}
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="items-center flex-shrink-0">
                  <img className="w-auto h-8" src={logo} alt="Your Company" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex ml-6 space-x-4">
                    
                    {/* Map over navigation items to create the tabs */}
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            location.pathname.startsWith(item.to) ? 'bg-green-500 text-white' : 'text-gray-500 hover:text-green-500',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>


              {/* User profile and notification icons */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              
  
              <button
        onClick={openSlideOver}
        className="p-1 text-gray-500 bg-white rounded-full hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 focus:ring-offset-green-500 "
      >
       <ShoppingBagIcon className="w-6 h-6" aria-hidden="true" /> {/* Cart icon */}
      </button>



              <Menu as="div" className="relative inline-block text-left">
      <div>

      <Menu.Button >
  <span
    className="p-1 text-gray-500 bg-white rounded-full hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 focus:ring-offset-green-500 focus:text-green-500">
    <span className="sr-only">View notifications</span>
    <BellIcon className="w-6 h-6" aria-hidden="true" />
  </span>
</Menu.Button>

      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-96 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <h6 className='font-bold'>Sample notification 1</h6>
                  <p>notification description goes here</p>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <h6 className='font-bold'>Sample notification 2</h6>
                  <p>notification description goes here</p>
                </a>
              )}
            </Menu.Item>
          </div>
  

          {/* <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Delete
                </a>
              )}
            </Menu.Item>
          </div> */}
        </Menu.Items>
      </Transition>
    </Menu>



                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button
                      className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* Replace the image source with the user's profile image */}
                      <img
                        className="w-8 h-8 rounded-full"
                        src={imageUrl}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  {/* Profile dropdown menu */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-green-500 ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile" 
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            onClick={onLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>

                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile view */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    item.current ? 'bg-green-500 text-white' : 'text-gray-500 hover: hover:text-green-500',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;