import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import backBtn from '../../../assets/back-button.png';

const WaitlistPage = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the selectedDate and selectedSlot from the location state
  const { selectedDate, selectedSlot } = location.state || {};

  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for showing the success pop-up

  const handleConfirm = async (e) => {
    e.preventDefault();
  
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const selectedSlotId = selectedSlot?.id;
  
    // Validate the form fields (you can add more validation as needed)
    if (!username || !email || !selectedSlotId) {
      // Show an error message if any of the fields are empty
      alert('Please fill all the required fields to proceed.');
      return;
    }
  
    try {
      // Send the form data to the server
      await axiosClient.post('/waitlist', {
        username,
        email,
        selectedDate,
        selectedSlot: {
          id: selectedSlotId,
          start_time: selectedSlot.start_time,
          end_time: selectedSlot.end_time,
          availability: selectedSlot.availability,
        },
      });
  
      // Show the success pop-up
      setShowSuccessPopup(true);
  
      // Close the success pop-up after a delay (e.g., 2000 milliseconds)
      setTimeout(() => {
        setShowSuccessPopup(false);
  
        // Navigate to the reservations page
        navigate('/activities');
      }, 2000);
    } catch (error) {
      console.error('Error submitting the form:', error);
      // Handle error here (e.g., show an error message)
    }
  };

  const handleClose = () => {
    navigate(-1); // go back to the previous page
  };

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className='flex justify-end'>
          <button 
            type="button"
            onClick={handleClose} 
            className="border-transparent border-radius-50% ">
            <img src={backBtn} className='w-10' onClick={handleClose} alt="Back Button" />
          </button>
        </div>
        
        <h2 className="mt-10 mb-4 text-4xl font-bold leading-9 tracking-tight text-left text-gray-900">
          Join the waitlist
        </h2>
        <p className="font-semibold tracking-tight text-left text-gray-500 text-md mt-">
          Never miss out on an available slot! Share your contact info, and we'll keep you updated.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleConfirm}>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
            </div>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mb-4">
            <h5 className="mb-1 text-gray-500">Selected Date:</h5>
            <p className='font-bold text-gray-700'>{selectedDate && selectedDate.toDateString()}</p>
          </div>
          <div className="mb-4">
            <h5 className="mb-1 text-gray-500">Selected Time Slot:</h5>
            <p className='font-bold text-gray-700'>
              {selectedSlot
                ? selectedSlot.availability
                  ? `${selectedSlot.start_time} - ${selectedSlot.end_time} (Available)`
                  : `${selectedSlot.start_time} - ${selectedSlot.end_time} (Waiting)`
                : ''}
            </p>
          </div>

          <div className="mb-4">
            <h5 className="font-bold mb-2">Confirm your details to join the waitlist</h5>
            <p>You will receive a notice through the email address you provided when the slot is available</p>
          </div>
          <div className="mb-4">
            <button type="submit" className="px-4 py-2 rounded bg-green-500 text-white">
              Confirm
            </button>
            <button 
              type="button"
              onClick={handleClose} 
              className="px-4 py-2 ml-4 rounded border border-gray-500"
            >
              Close
            </button>
          </div>
        </form>
      </div>

      <div className="p-6 bg-white">
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="p-16 bg-white rounded-lg shadow-lg">
              <h4 className="mb-4 text-lg font-bold">You have successfully joined the waitlist! </h4>
              <p>We'll notify you as soon as the slot becomes available. Thank you for your interest</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistPage;
