import React from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link, useLocation } from 'react-router-dom';

export default function Profile() {
  return (

    <div className="p-12 mx-20 ">

    
  

 


    <form >

    {/* <div className="flex items-center w-full p-8 px-4 bg-white rounded sm:flex-row sm:px-20 md:px-10 ">

      <div className="mb-4 sm:mr-10 sm:mb-0">
        <img
          className="object-cover w-20 h-20 mr-10 rounded-full sm:w-40 sm:h-40"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
        />
      </div>
      <div>
        <h1 className="mb-1 text-xl font-semibold sm:text-3xl">Profile</h1>
        <p className="mb-4 text-xs text-gray-600 sm:text-sm">Update your photo and other personal details.</p>
      </div>
      
      <div className="flex ml-auto space-x-2">
        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
        <button className="px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900">Save</button>
      </div>


    </div> */}

<div className="flex flex-col items-center w-full p-8 px-4 space-y-4 bg-white rounded sm:flex-row sm:px-20 md:px-10 sm:space-y-0">
  <div className="mb-4 sm:mr-10 sm:mb-0">
    <img
      className="object-cover w-20 h-20 mr-10 rounded-full sm:w-40 sm:h-40"
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      alt="Profile"
    />
  </div>
  <div className="flex flex-col">
    <h1 className="mb-1 text-xl font-semibold sm:text-3xl">Profile</h1>
    <p className="mb-4 text-xs text-gray-600 sm:text-sm">Update your photo and other personal details.</p>
    <div className="flex space-x-2">
      <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
      <button className="px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900">Save</button>
    </div>
  </div>
</div>






      <div className="space-y-12">
   

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 ">Personal </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  // ref={nameRef}
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  // ref={lastnameRef}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="hometown" className="block text-sm font-medium leading-6 text-gray-900">
                Hometown
              </label>
              <div className="mt-2">
                <input
                  // ref={hometownRef}
                  type="text"
                  name="hometown"
                  id="hometown"
                  autoComplete="hometown"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            <div className="sm:col-span-3">
              <label htmlFor="birth-date" className="block text-sm font-medium leading-6 text-gray-900">
                Birth date
              </label>
              <div className="mt-2">
                <input
                  // ref={birthdateRef}
                  type="date"
                  name="birth-date"
                  id="birth-date"
                  autoComplete="birth-date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            <div className="col-span-full">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender
              </label>


              <div className="flex mt-2 gap-x-6">
                <div className="flex items-center gap-x-3">
                  <input
                  // ref={genderRef}
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Male
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                  // ref={genderRef}
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Female
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                  // ref={genderRef}
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    Other
                  </label>
                </div>
              </div>

            </div>


            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="flex items-center mt-2 gap-x-3">
                <UserCircleIcon className="w-12 h-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                // ref={aboutRef}
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

          </div>
        </div>

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 ">Preferences</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>


          
          <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Meal preferences
              </label>
 
              <div className="mt-2">
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Dessert</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Bakery</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Snack</button>

             
              </div>
              
            </div>
            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Cuisine preferences
              </label>

              <div className="mt-2">
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">English</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Sri lankan</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Indian</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Italian</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Chinese</button>
              
              
              </div>
              
            </div>
            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Beverage Preferences
              </label>

              <div className="mt-2">
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Cold</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Hot</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Natural</button>
            

              </div>
              
            </div>

            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Restaurant
              </label>

              <div className="mt-2">
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Luxury</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Casual</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Fast</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Cafe</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Family</button>

              </div>
              
            </div>

            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Who are you?
              </label>

              <div className="mt-2">
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Student</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Researcher</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Employer</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Unemployed</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Local</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Foreigner</button>
              

              </div>
              
            </div>

            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Personality
              </label>

              <div className="mt-2">
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">SJ</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">SP</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">NF</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">NT</button>

              </div>
              
            </div>

        </div>

        {/* <div className="grid grid-cols-1 pb-12 mt-10 border-b border-gray-900/10 gap-x-6 gap-y-8 sm:grid-cols-6">
          <Link className='font-bold hover:text-green-500'>
          Change Password
          </Link>
          
        </div> */}

        {/* <div className="grid grid-cols-1 pb-12 mt-10 border-b border-gray-900/10 gap-x-6 gap-y-8 sm:grid-cols-6">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 ">Credentials</h2>
      
          <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  // ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  // ref={passwordRef}
                  type="password"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Conform password
              </label>
              <div className="mt-2">
                <input
                  // ref={passwordConfirmationRef}
                  type="password"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            

          
   

        </div> */}



      </div>


    </form>







    



    
    </div>

  );
}
