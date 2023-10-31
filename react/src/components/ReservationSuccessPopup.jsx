import React from 'react';

const ReservationSuccessPopup = ({ onClose, onHomeClick, onActivitiesClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8 relative">
        <div className="flex items-center justify-center mb-10">
          <div className="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="ml-1 font-semibold text-xl text-gray-700">Reservation Successful!</span>
        </div>

        <p>Check your mailbox for payment.</p>

        <div className="mt-4 flex flex-col">
          <button
            className="bg-green-500 font-semibold text-white py-3 px-4 rounded-md mb-2 w-full"
            onClick={onHomeClick}
          >
            Home
          </button>
          <button
            className="bg-green-500 font-semibold text-white py-3 px-4 rounded-md mb-2 w-full"
            onClick={onActivitiesClick}
          >
            Activities
          </button>
          <button
            className="bg-red-50 text-red-500 py-3 px-4 rounded-md w-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationSuccessPopup;
