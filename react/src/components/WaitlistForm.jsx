import React, { useState } from 'react';
import axios from 'axios';

const WaitlistForm = ({ selectedDate, selectedSlot, onClose, onConfirm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect the form data
    const formData = {
      name: username,
      email,
      selected_slot_id: selectedSlot.id,
      selected_date: selectedDate.toISOString().split('T')[0],
    };

    try {
      // Make the API call to submit the form data
      const response = await axios.post('/api/waitlist', formData);
      console.log(response.data); // Optional: log the response data

      // Call the onConfirm function and close the form
      onConfirm(formData);
      onClose();
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error('Error saving waitlist data:', error);
      // You can also display an error message to the user here if needed
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg">
      <h4 className="text-lg font-bold mb-4">Join the Waitlist</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-1">
            User name:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <h5 className="font-bold mb-2">Selected Date:</h5>
          <p>{selectedDate.toDateString()}</p>
        </div>
        <div className="mb-4">
          <h5 className="font-bold mb-2">Selected Time Slot:</h5>
          <p>
            {selectedSlot.availability
              ? `${selectedSlot.start_time} - ${selectedSlot.end_time} (Available)`
              : `${selectedSlot.start_time} - ${selectedSlot.end_time} (Waiting)`}
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
          <button type="button" className="px-4 py-2 ml-4 rounded border border-gray-500" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default WaitlistForm;
