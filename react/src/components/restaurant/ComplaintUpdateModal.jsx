import React from 'react';
import { useRef } from 'react';

import { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";
import { useEffect } from "react";

export default function ComplaintUpdateModal({ isOpen, onCancel, onConfirm ,complaint}) {
  if (!isOpen) {
    return null;
  }
  
       const ReplyRef=useRef();
      const  titleRef = useRef();
       const user_emailRef = useRef();
       const descriptionRef=useRef();
       

  
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState('');
  







    ///////////////

   // 

    // const navigate = useNavigate();
    // const history = useHistory();

    const onSubmit = (ev) => {
      ev.preventDefault();
  
      // Prepare the updated complaint data
      const updatedComplaintData = {
        id: complaint[0].id,
        
        reply : ReplyRef.current.value,
      title: titleRef.current.value,
      
      description: descriptionRef.current.value,
      };
  
      // Call the parent's update function and pass the updated data
      onConfirm(updatedComplaintData);
    };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg" style={{ width: '550px' }}>
       
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
         Reply 
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
           
          </p>
        </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {complaint && complaint.length > 0 ? (
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
              htmlFor="Complaint title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Title
            </label>
            <div className="mt-1">
              <input
                ref={titleRef}
                id="title"
                name="title"
                type="text"
              defaultValue={complaint[0].title}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        

          <div className="my-4">
            <label
              htmlFor="Description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Description
            </label>
            <div className="mt-2">
              <input
                ref={descriptionRef}
                id="description"
                name="description"
                type="text"
                defaultValue ={complaint[0].description} 
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

     
      
          
        


          <div>
          <label
              htmlFor="Reply"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Reply
            </label>
            <div className="mt-2">
            <textarea
      ref={ReplyRef}
      id="reply"
      name="reply"
      rows="2" // You can adjust the number of rows as needed
      required
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    ></textarea>
            </div>
          </div>


          <br></br>     
         
         <br></br>



          <div className="flex space-x-4">
          <button
      className="flex-1 bg-gray-300 hover:bg-gray-400 px-3 py-1.5 rounded"
      onClick={onCancel}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="flex-1 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Reply
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
