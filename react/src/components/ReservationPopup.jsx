import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ReservationPopup = ({ onClose, selectedTables }) => {
  const { id } = useParams(); // Get the restaurantId from the URL
  const navigate = useNavigate();

  const handleContinueClick = async () => {
    // Close the popup
    onClose();

    // Prepare the reservation data
    const reservationData = {
      restaurant_id: id,
      reservation_date: '2023-09-20', // Replace with the selected date
      start_time: '09:00:00', // Replace with the selected start time
      end_time: '10:00:00', // Replace with the selected end time
      reservant_ID: 1, // Replace with the logged user's ID
      number_of_participants: 2, // Replace with the selected number of participants
      table_structure_id: 1, // Replace with the selected table structure ID
      tablefortwo: 1, // Replace with 1 for now
      floor: 1, // Replace with the selected floor
      status: 2, // Replace with the desired status
    };

    try {
      const response = await fetch('/api/reserve-table', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        // Reservation successful
        // You can handle success here, e.g., show a success message
        navigate(`/activities`);
      } else {
        // Handle errors here, e.g., show an error message
        console.error('Reservation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const renderSelectedTables = () => {
    return selectedTables.map((table) => (
      <div key={table.id}>
        <p>
          Tables: No.{table.table_number} - {table.view.name}
        </p>
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <span className="popup-close" onClick={onClose}>
          &#10005;
        </span>
        <h2 className="text-xl font-bold mb-4">Your Tables Reserved!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for reserving your tables with us.
        </p>
        <div className="mb-4">
          <h3>Selected Tables:</h3>
          {renderSelectedTables()}
        </div>
        <div className="flex gap-4">
          <Link
            to={`/restaurants/${id}/meals`} // Use the available restaurantId from the URL
            className="border border-green-500 text-green-500 px-4 py-2 rounded-lg"
          >
            Order Meal
          </Link>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleContinueClick}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationPopup;
