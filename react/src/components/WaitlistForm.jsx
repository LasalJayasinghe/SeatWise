import React, { useState } from 'react';

const WaitlistForm = ({ user, selectedDate, selectedSlot, onClose, onConfirm }) => {
  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Collect the form data and call the onConfirm function
    const formData = {
      username,
      phoneNumber,
      selectedDate,
      selectedSlot,
    };
    onConfirm(formData);
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg">
      <h4 className="text-lg font-bold mb-4">Join the Waitlist</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-1">
            Username:
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
          <label htmlFor="phoneNumber" className="block font-bold mb-1">
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
          <p>You will receive a notice through the app when the slot is available</p>
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
