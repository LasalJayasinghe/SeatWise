import React , { useState } from 'react';
const generateReservationNumber = () => {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomLowercaseLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = getRandomInt(0, alphabet.length - 1);
    return alphabet[randomIndex];
  };

  const getRandomNumber = () => getRandomInt(0, 9);

  const reservationNumber = [
    getRandomNumber(),
    getRandomNumber(),
    getRandomNumber(),
    getRandomNumber(),
    getRandomLowercaseLetter(),
    getRandomLowercaseLetter(),
  ].join('');

  return reservationNumber;
};
const ReservationPopup = ({ onClose, selectedTables, formSubmissionData, user,restaurantId, selectedTableStructureId, }) => {
const [tablefortwo, settablefortwo] = useState(false);
const reservationNumber = generateReservationNumber();
const handleConfirmReservation = async () => {
  try {
    // Create the reservation object
    const reservationData = {
      reservationNumber: generateReservationNumber(),
      restaurant_id: restaurantId,
      reservation_date: formSubmissionData.date,
      start_time: formSubmissionData.startTime,
      end_time: formSubmissionData.endTime,
      reservant_ID: user.id,
      number_of_participants: formSubmissionData.numParticipants,
      table_structure_id: selectedTableStructureId,
      tablefortwo: tablefortwo ? 1 : 0, // Convert to boolean
      // You may need to include additional fields here based on your API requirements
    };

    // Make the POST request to your API
    const response = await fetch('/make-reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    });

    if (response.ok) {
      // Reservation was successful, you can handle the response as needed
      onClose();
    } else {
      // Reservation failed, handle errors or show a message to the user
      console.error('Reservation failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error making reservation:', error);
    // Handle errors as needed
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-lg font-semibold mb-4">Reservation Details</h2>
        {/* Display the generated reservation number */}
        <p>Reservation Number: {reservationNumber}</p>

        {/* Display the restaurant ID */}
        <p>Restaurant ID: {restaurantId}</p>
        {/* Display the selected table information */}
        
        {selectedTables.map((table) => (
          <div key={table.id} className="mb-2">
           

            <p>Table Number: {table.table_number}</p>
            <p>View: {table.view.name}</p>
          </div>
        ))}

        {/* Display reservation form data */}
        <h3 className="mt-4">Reservation Form Data:</h3>
        <p>Date: {formSubmissionData.date}</p>
        <p>Start Time: {formSubmissionData.startTime}</p>
        <p>End Time: {formSubmissionData.endTime}</p>
        <p>Number of Participants: {formSubmissionData.numParticipants}</p>

        <p>reservant name : {user.name}</p>
            <p>reservant id : {user.id}</p>

        <p>Selected Table Structure ID: {selectedTableStructureId}</p>

        {/* Checkbox for "Enable table for two to sharing" */}
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={tablefortwo}
              onChange={() => settablefortwo(!tablefortwo)}
            />
            <span>Enable table for two to sharing</span>
          </label>
        </div>

        {/* Buttons and content */}
        <div className="mt-4 flex justify-center space-x-4">
        <button
          className="bg-green-500 text-white py-1 px-4 rounded-md"
          onClick={handleConfirmReservation}
        >
          Confirm
        </button>
        <button
          className="bg-red-500 text-white py-1 px-4 rounded-md"
          onClick={onClose}
        >
          Cancel
        </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationPopup;
