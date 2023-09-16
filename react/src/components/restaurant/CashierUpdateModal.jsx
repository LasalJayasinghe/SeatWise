import React from 'react';
import { useRef } from 'react';

import { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";
import { useEffect } from "react";

export default function CashierUpdateModal({ isOpen, onCancel, onConfirm ,cashier}) {
  if (!isOpen) {
    return null;
  }
  const cashiernameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState('');
  







    ///////////////

   // 

    // const navigate = useNavigate();
    // const history = useHistory();

    const onSubmit = (ev) => {
      ev.preventDefault();
  
      // Prepare the updated cashier data
      const updatedCashierData = {
        id: cashier[0].id,
        cashiername: cashiernameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
      };
  
      // Call the parent's update function and pass the updated data
      onConfirm(updatedCashierData);
    };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg" style={{ width: '550px' }}>
       
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Update Cashier Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Please update details of your cashier person
          </p>
        </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {cashier && cashier.length > 0 ? (
        <form
          onSubmit={onSubmit}
          className="space-y-1"
          action='#'
          method="POST"
        >
{message && (
  <div className={`p-2 ${message.includes('Successfully') ? 'bg-green-500 text-white-300' : 'bg-red-200 text-white-800'}`}>
    {message}
  </div>
)}


           
       

          <div>
            <label
              htmlFor="cashiername"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Cashier Name
            </label>
            <div className="mt-1">
              <input
                ref={cashiernameRef}
                id="cashiername"
                name="cashiername"
                type="text"
              defaultValue={cashier[0].cashier_name}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        

          <div className="my-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Email address
            </label>
            <div className="mt-2">
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email["
                defaultValue ={cashier[0].email} 
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

     
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Phone Number
            </label>
            <div className="mt-2">
              <input
                ref={phoneRef}
                id="phone"
                name="phone"
                type="text"
                defaultValue={cashier[0].cashier_phone_number}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

         
          <div>
		<label htmlFor='password' className="block text-sm font-medium leading-6 text-gray-900">
				Password 
				<div className="mt-2">
                 <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
        
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
			</label>


	</div>


    <div>
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Confirm Password
            </label>
            <div className="mt-1">
              <input
                ref={passwordConfirmationRef}
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                autoComplete="passwordConfirmation"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex space-x-4">
    <button
      type="submit"
      className="flex-1 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Update
    </button>
    <button
      className="flex-1 bg-gray-300 hover:bg-gray-400 px-3 py-1.5 rounded"
      onClick={onCancel}
    >
      Cancel
    </button>
  </div>
        </form>

      ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>

      </div>
    </div>
  );
}
