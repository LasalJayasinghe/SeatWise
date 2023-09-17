import React from 'react';
import { useRef } from 'react';

import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";

export default function OffersUpdateModal({ isOpen, onCancel, onConfirm ,Offer}) {
  if (!isOpen) {
    return null;
  }
  
  const [message, setMessage] = useState('');
 
  const MealRef =useRef();
  const OfferTypeRef = useRef()
  //const nameRef = useRef()
  const OfferTitleRef = useRef()
  const OfferPercentageRef = useRef()
  const OfferDescriptionRef = useRef()
  const StartDateRef = useRef()
  const EndDateRef = useRef()
  const DaysRef = useRef()
  const MinAmountRef = useRef()
  const [errors, setErrors] = useState(null);







    ///////////////

   // 

    // const navigate = useNavigate();
    // const history = useHistory();

    const onSubmit = (ev) => {
      ev.preventDefault();
  
      // Prepare the updated cashier data
      const updatedOffersData = {
        id: Offer[0].id,
      
        meal: MealRef.current.value,
        offer_type: OfferTypeRef.current.value,
        offer_title  : OfferTitleRef.current.value, 
        offer_percentage:OfferPercentageRef.current.value, 
        offer_description :OfferDescriptionRef.current.value, 
       start_date : StartDateRef.current.value,
        end_date : EndDateRef.current.value,
        days_of_week:DaysRef.current.value,
        minimum_purchase_amount:MinAmountRef.current.value, 
       
   
      };
  
      // Call the parent's update function and pass the updated data
      onConfirm(updatedOffersData);
    };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
     <div className="bg-white p-6 rounded shadow-lg" style={{ width: '550px',maxHeight: '700px', overflowY: 'auto'  }}>
       
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" style={{ }}>
            
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Update Offers
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Please update details of the selected offer
          </p>
        </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {Offer && Offer.length > 0 ? (
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
              htmlFor="meal"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Meal
            </label>
            <div className="mt-1">
              <input
                ref={MealRef}
                id="Meal"
                name="Meal"
                type="text"
              defaultValue={Offer[0].meal}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        

          <div className="my-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Offer Type
            </label>
            <div className="mt-2">
              <input
                ref={OfferTypeRef}
                id="offer_type"
                name="offer_type"
                type="offer_type"
                defaultValue ={Offer[0].offer_type} 
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

     
          <div>
            <label
              htmlFor="offer_title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Offer Title
            </label>
            <div className="mt-2">
              <input
                ref={OfferTitleRef}
                id="offer_title"
                name="offer_title"
                type="text"
                defaultValue={Offer[0].offer_title}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="offer_title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Offer Percentage
            </label>
            <div className="mt-2">
              <input
                ref={OfferPercentageRef}
                id="offer_percentage"
                name="offer_percentage"
                type="text"
                defaultValue={Offer[0].offer_percentage}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Start Date
            </label>
            <div className="mt-2">
              <input
                ref={StartDateRef}
                id="start_date"
                name="start_date"
                type="text"
                defaultValue={Offer[0].start_date}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium leading-6 text-gray-900"
            >End Date
            </label>
            <div className="mt-2">
              <input
                ref={EndDateRef}
                id="end_date"
                name="end_date"
                type="text"
                defaultValue={Offer[0].end_date}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium leading-6 text-gray-900"
            >Minimum Purchase Amount
            </label>
            <div className="mt-2">
              <input
                ref={MinAmountRef}
                id="minimum_purchase_amount"
                name="minimum_purchase_amount"
                type="text"
                defaultValue={Offer[0].minimum_purchase_amount}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium leading-6 text-gray-900"
            >Days of Week
            </label>
            <div className="mt-2">
              <input
                ref={DaysRef}
                id="days_of_week"
                name="days_of_week"
                type="text"
                defaultValue={Offer[0].days_of_week}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>



          <div>
            <label
              htmlFor="offer_description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Offer Description
            </label>
            <div className="mt-2">
              <input
                ref={OfferDescriptionRef}
                id="offer_description"
                name="offer_description"
                type="text"
                defaultValue={Offer[0].offer_description}
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
