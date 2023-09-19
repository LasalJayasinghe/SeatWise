import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';

const SuccessMessage = ({ onClose, navigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/activities'); // Navigate to the activities page after a delay (e.g., 2000 milliseconds)
      onClose();
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [navigate, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="p-16 bg-white rounded-lg shadow-lg">
        <h4 className="mb-4 text-lg font-bold">Reservation Successful!</h4>
        <p>Thank you for using Seatwise.</p>
      </div>
    </div>
  );
};

const ConfirmationPopup = ({ onClose, selectedTables, selectedDate, startTime, endTime }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch the user's name when the component mounts
    const fetchUserName = async () => {
      try {
        const response = await axiosClient.get('/user-data'); // Replace with the correct API endpoint
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, []);

  const handleConfirmClick = async () => {
    console.log('Confirm button clicked');
    console.log('userName:', userName); // Add this line

    // Create an object with the data to be sent
    const reservationData = {
      selectedTableNumbers: selectedTables.map((table) => table.table_number),
      date: selectedDate,
      start_time: startTime,
      end_time: endTime,
      number_of_participants: selectedTables.reduce(
        (acc, table) => acc + table.number_of_participants,
        0
      ),
      tablefortwo: 'No', // Change this based on your form input
    };
  
    // Send the reservation data to the API endpoint
    const response = await axiosClient.post('/reserve-tables', reservationData);
    console.log('Response:', response); // Add this line

    // Redirect to the activities page
    navigate('/activities');
  
    // Close the popup
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <span className="popup-close" onClick={onClose}>
          &#10005;
        </span>
        <h2 className="text-xl font-bold mb-4">Confirmation Popup</h2>
        <p className="text-gray-600 mb-4">Please review your reservation details.</p>
        <div className="mb-4">
          <p className="font-semibold">Reservant Name: {userName}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Selected Tables:</p>
          <ul className="list-disc pl-6">
            {selectedTables.map((table) => (
              <li key={table.id}>Table No. {table.table_number}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Amount to Pay (LKR): {selectedTables.length * 50}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Reservation Number: {Math.floor(Math.random() * 1000000)}</p>
        </div>
        <div className="flex gap-4">
          {/* Render Confirm button */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
          {/* Render Cancel button */}
          <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
