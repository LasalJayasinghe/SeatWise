import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import ConfirmationPopup from './ConfirmationPopup'; // Import the new component

const ReservationPopup = ({ onClose , selectedTables}) => {
    const [showConfirmation, setShowConfirmation] = useState(false); // Add state
  
    const handleContinueClick = () => {
        setShowConfirmation(true); // Show the confirmation popup
      };
      
  
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-9 ">
      <span className="popup-close" onClick={onClose}>
          &#10005; {/* Use the 'times' character for the cross */}
        </span>
        <h2 className="text-xl font-bold mb-4"> Table Reserved for the customer!</h2>
        <p className="text-gray-600 mb-4">
        
        </p>
        <div className="flex gap-4">
       
        
        {/* Show the ConfirmationPopup when showConfirmation is true */}
        {showConfirmation && (
          <ConfirmationPopup
            onClose={() => setShowConfirmation(false)}
            // userName={user.name}
            selectedTables={selectedTables}
          />
        )}
      </div>
      </div>
    </div>
  );
};

export default ReservationPopup;