import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import logo from '../assets/logo.svg';

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'


const navigation = [
  { name: 'Dashboard', to: '/restaurantDashboard', current: false },
  { name: 'Orders', to: '/orders', current: false },
  { name: 'Profile', to: '/setup', current: false },
  { name: 'Table structure', to: '/structure', current: false },
  { name: 'Reservations', to: '/reservations', current: false },
  { name: 'Employees', to: '/employees', current: false },
  { name: 'Menu', to: '/menu', current: false },
]



function classNames(...classes) {
return classes.filter(Boolean).join(' ')
}


export default function RestaurantDefaultLayout() {
    const {user, token, setUser, setToken} = useStateContext();

    if(!token){
        return <Navigate to ="/restaurantlogin" />
    }

    

    const onLogout = ev => {
        ev.preventDefault()

        axiosClient.post('/reslogout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }

    // const userNavigation = [
    //     { name: 'Your Profile', href: '#' },
    //     // { name: 'Settings', href: '#' },
    //     { name: 'Log out', href: '#', onClick: onLogout },
    // ]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect( () => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


return (
<div>
  <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          {/* Desktop view */}
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button*/}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Company logo and navigation */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={logo} alt="Your Company" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ml-6">
                    {/* Map over navigation items to create the tabs */}
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                          ? 'bg-green-500 text-white'
                          : 'text-gray-500 hover: hover:text-green-500',
                          'block rounded-md px-3 py-2 text-base font-medium',
                          location.pathname === item.to 
                          ? 'bg-green-500 text-white' 
                          : 'text-gray-500 hover:text-green-500',
                         
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
                {user.name}
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-500 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 focus:ring-offset-green-500 focus:text-green-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button
                      className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* Replace the image source with the user's profile image */}
                      <img
                        className="h-8 w-8 rounded-full"
                        src="src/assets/lauren.jpg"
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-green-500 ring-opacity-5 focus:outline-none">
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
            <div className="space-y-1 px-2 pb-3 pt-2">
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

      <Outlet />
  </div>

    



  // <div className="min-h-full">
  //     <Disclosure as="nav" className="bg-white">
  //       {({ open }) => (
  //         <>
  //           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  //             <div className="flex h-16 items-center justify-between">
  //               <div className="flex items-center">
  //                 <div className="flex-shrink-0">
  //                   <img
  //                     className="h-12 w-12 object-contain"
  //                     src={logo}
  //                     alt="Your Company"
  //                   />
  //                 </div>
  //                 <div className="hidden md:block">
  //                   <div className="ml-10 flex items-baseline space-x-4">
  //                     {navigation.map((item) => (
  //                       <a
  //                         key={item.name}
  //                         href={item.href}
  //                         className={classNames(
  //                           item.current
  //                             ? 'bg-gray-900 text-white'
  //                             : 'text-gray-300 hover:bg-gray-700 hover:text-white',
  //                           'rounded-md px-3 py-2 text-sm font-medium'
  //                         )}
  //                         aria-current={item.current ? 'page' : undefined}
  //                       >
  //                         {item.name}
  //                       </a>
  //                     ))}
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="hidden md:block">
  //                 <div className="ml-4 flex items-center md:ml-6">
  //                   {/* <p>{user.name}</p>
  //                   <p>{user.id}</p>
  //                   <p>{user.email}</p> */}
  //                   <button
  //                     type="button"
  //                     className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
  //                   >
  //                     <span className="sr-only">View notifications</span>
  //                     <BellIcon className="h-6 w-6" aria-hidden="true" />
  //                   </button>

  //                   {/* Profile dropdown */}
  //                   <Menu as="div" className="relative ml-3">
  //                     <div>
  //                       <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
  //                         <span className="sr-only">Open user menu</span>
  //                         <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
  //                       </Menu.Button>
  //                     </div>
  //                     <Transition
  //                       as={Fragment}
  //                       enter="transition ease-out duration-100"
  //                       enterFrom="transform opacity-0 scale-95"
  //                       enterTo="transform opacity-100 scale-100"
  //                       leave="transition ease-in duration-75"
  //                       leaveFrom="transform opacity-100 scale-100"
  //                       leaveTo="transform opacity-0 scale-95"
  //                     >
  //                       <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
  //                         {userNavigation.map((item) => (
  //                           <Menu.Item key={item.name}>
  //                             {({ active }) => (
  //                               <a
  //                                 href={item.href}
  //                                 onClick={item.onClick}
  //                                 className={classNames(
  //                                   active ? 'bg-gray-100' : '',
  //                                   'block px-4 py-2 text-sm text-gray-700'
  //                                 )}
  //                               >
  //                                 {item.name}
  //                               </a>
  //                             )}
  //                           </Menu.Item>
  //                         ))}
  //                       </Menu.Items>
  //                     </Transition>
  //                   </Menu>
  //                 </div>
  //               </div>
  //               <div className="-mr-2 flex md:hidden">
  //                 {/* Mobile menu button */}
  //                 <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
  //                   <span className="sr-only">Open main menu</span>
  //                   {open ? (
  //                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
  //                   ) : (
  //                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
  //                   )}
  //                 </Disclosure.Button>
  //               </div>
  //             </div>
  //           </div>

  //           <Disclosure.Panel className="md:hidden">
  //             <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
  //               {navigation.map((item) => (
  //                 <Disclosure.Button
  //                   key={item.name}
  //                   as="a"
  //                   href={item.href}
  //                   className={classNames(
  //                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
  //                     'block rounded-md px-3 py-2 text-base font-medium'
  //                   )}
  //                   aria-current={item.current ? 'page' : undefined}
  //                 >
  //                   {item.name}
  //                 </Disclosure.Button>
  //               ))}
  //             </div>
  //             <div className="border-t border-gray-700 pb-3 pt-4">
  //               <div className="flex items-center px-5">
  //                 <div className="flex-shrink-0">
  //                   <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
  //                 </div>
  //                 <div className="ml-3">
  //                   <div className="text-base font-medium leading-none text-white">{user.name}</div>
  //                   <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
  //                 </div>
  //                 <button
  //                   type="button"
  //                   className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
  //                 >
  //                   <span className="sr-only">View notifications</span>
  //                   <BellIcon className="h-6 w-6" aria-hidden="true" />
  //                 </button>
  //               </div>
  //               <div className="mt-3 space-y-1 px-2">
  //                 {userNavigation.map((item) => (
  //                   <Disclosure.Button
  //                     key={item.name}
  //                     as="a"
  //                     href={item.href}
  //                     className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
  //                   >
  //                     {item.name}
  //                   </Disclosure.Button>
  //                 ))}
  //               </div>
  //             </div>
  //           </Disclosure.Panel>
  //         </>
  //       )}
  //     </Disclosure>

  //     <Outlet/>
        
  //     </div>
   
/*old........................*/
    // <div id="defaultLayout">
    //     <aside>
    //         <Link to="/restaurantDashboard">Dashboard </Link>
    //         <Link to="/profile">Profile</Link>
    //         <Link to="/structure">Table Staructure</Link>
    //         <Link to="/reservations">Reservations</Link>
    //     </aside>
    //     <div className="content">
    //         <header>
    //             <div>
    //                 Header
    //             </div>
    //             <div>
    //                 {user.name}
    //                 <a href='#' onClick={onLogout} className='btn-logout'>Logout</a>
    //             </div>
    //         </header>
    //         <main>
    //             <Outlet />
    //         </main>
    //     </div>
    // </div>
  )
}


