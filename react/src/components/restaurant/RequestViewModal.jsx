import React from 'react';
import { useRef } from 'react';

import { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";
import { useEffect } from "react";

export default function RequestViewModal({ isOpen, onCancel, Request}) {
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
          Your Request
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


           
       



        

      
          <div className="grid grid-cols-2 gap-2">

<div>
  <label
    htmlFor="restaurantname"
    className="block text-sm font-medium leading-6 text-gray-900"
  >Restaurant Name
  </label>
  <div className="mt-1">
    <input
   
      id="restaurantname"
      name="restaurantname"
      type="text"
      required
      readOnly
      
     Value={Request[0].id}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
</div>

<div>
  <label
    htmlFor="brn"
    className="block text-sm font-medium leading-6 text-gray-900"
  >Business Registration No
  </label>
  <div className="mt-1">
    <input
      //ref={brnRef}
      id="brn"
      name="brn"
      type="text"
    Value={Request[0].brn}
      required
      readOnly
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
</div>

</div>

<div className="my-4">
  <label
    htmlFor="email"
    className="block text-sm font-medium leading-6 text-gray-900"
  >Email address
  </label>
  <div className="mt-1">
    <input
   //   ref={emailRef}
      id="email"
      name="email"
      type="email"
     Value={Request[0].email}
      required
      readOnly
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
</div>




<div className="grid grid-cols-2 gap-2">

<div>
  <label
    htmlFor="name"
    className="block text-sm font-medium leading-6 text-gray-900"
  >Contact Person Name
  </label>
  <div className="mt-1">
    <input
     // ref={nameRef}
      id="name"
      name="name"
      type="text"
      Value={Request[0].name}
      required
      readOnly
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
  <div className="mt-1">
    <input
     // ref={phoneRef}
      id="phone"
      name="phone"
      type="text"
      Value={Request[0].phone}
      required
      readOnly
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
</div>






</div>
<div>
<label
htmlFor="priority"
className="block text-sm font-medium leading-6 text-gray-900"
>
Priority
</label>
<div className="mt-1">
    <input
     // ref={phoneRef}
      id="priority"
      name="priority"
      type="text"
      Value={Request[0].priority}
      required
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  </div>
<div className="mt-2 flex items-center space-x-4">



</div>
</div>
<div className="my-4">
  <label
    htmlFor="issue"
    className="block text-sm font-medium leading-6 text-gray-900"
  >Describe your issue 
  </label>
  <div className="mt-1">
  <textarea
//ref={issueRef}
id="issue"
name="issue"
rows="2" // You can adjust the number of rows as needed
required
readOnly
className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
value={Request[0].issue_description || ''}
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
