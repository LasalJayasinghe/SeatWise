import React from 'react';

function CancelConfirmationModal({ onCancel, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full mx-auto max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4">
          <div className="text-lg font-semibold text-center">
            Confirm Cancellation
          </div>
          <div className="mt-4 text-gray-600 text-sm">
            Are you sure you want to cancel this reservation?
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 focus:outline-none mr-4"
              onClick={onCancel}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-400 focus:outline-none"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelConfirmationModal;
