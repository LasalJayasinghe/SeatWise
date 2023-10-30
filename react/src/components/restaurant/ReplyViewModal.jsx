import React from 'react';
import { useRef } from 'react';

import { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";
import { useEffect } from "react";

export default function ReplyViewModal({ isOpen, onCancel, Request}) {
  if (!isOpen) {
    return null;
  }
  
  const [message, setMessage] = useState('');







    ///////////////

   // 

    // const navigate = useNavigate();
    // const history = useHistory();

    /*const onSubmit = (ev) => {
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
    };*/
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg" style={{ width: '550px' }}>
       
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
         Reply for your request
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            
          </p>
        </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {Request && Request.length > 0 ? (
        <form
        
          className="space-y-1"
          action='#'
          method="POST"
        >
{message && (
  <div className={`p-2 ${message.includes('Successfully') ? 'bg-green-500 text-white-300' : 'bg-red-200 text-white-800'}`}>
    {message}
  </div>
)}


           
       



        








<div className="my-4">
  <label
    htmlFor="issue"
    className="block text-sm font-medium leading-6 text-gray-900"
  >Reply by SEATWISE team
  </label>
  <div className="mt-1">
  <textarea
//ref={issueRef}
id="issue"
name="issue"
rows="5" // You can adjust the number of rows as needed
required
readOnly
className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
value={Request[0].reply|| ''}
></textarea>
  </div>
</div>
            




          <div className="flex space-x-4">

    <button
      className="flex-1 bg-gray-300 hover:bg-gray-400 px-3 py-1.5 rounded"
      onClick={onCancel}
    >
    Back
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
