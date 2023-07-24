import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';


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
        navigate('/reservations');
      }, 2000);
    } catch (error) {
      console.error('Error submitting the form:', error);
      // Handle error here (e.g., show an error message)
    }
  };
  const handleClose = () => {
    navigate(-1); // go back to previous page
  };
  

  return (
    <div className="bg-white p-6 rounded-md shadow-lg">
      <h4 className="text-lg font-bold mb-4">Join the Waitlist</h4>
      <form onSubmit={handleConfirm}> {/* Use handleConfirm for form submission */}
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-1">
            User name:
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-1">
            Email address:
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h5 className="font-bold mb-2">Selected Date:</h5>
          <p>{selectedDate && selectedDate.toDateString()}</p>
        </div>
        <div className="mb-4">
          <h5 className="font-bold mb-2">Selected Time Slot:</h5>
          <p>
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
          className="px-4 py-2 ml-4 rounded border border-gray-500">
          Close
        </button>
        </div>
      </form>

      {/* Success Pop-up */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h4 className="text-lg font-bold mb-4">Success</h4>
            <p>You have successfully joined the waitlist.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitlistPage;
