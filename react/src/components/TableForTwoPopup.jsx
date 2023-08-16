import React, { useState } from 'react';

const TableForTwoPopup = ({ onClose, reservation }) => {
  const [requested, setRequested] = useState(false);

  // Handle requesting the table for two
  const handleRequest = () => {
    // Implement the logic to send a request to the server
    // You can use axios or any other HTTP client library

    // Once the request is sent successfully, set requested to true
    setRequested(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <span className="popup-close" onClick={onClose}>
          &#10005;
        </span>
        <h2 className="text-xl font-bold mb-4">Table for Two Reservation</h2>
        <p>Requested Holders' Name: {reservation.reservant_name}</p>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleRequest}
            disabled={requested}
          >
            Request
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {requested && (
          <p className="mt-4 text-green-500 font-semibold">
            Request sent successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default TableForTwoPopup;
