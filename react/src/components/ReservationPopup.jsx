import React , { useState } from 'react';
import axiosClient from '../axios-client';



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
const ReservationPopup = ({ onClose, selectedTables, formSubmissionData, user,restaurantId, selectedTableStructureId }) => {
const [tablefortwo, settablefortwo] = useState(false);
const reservationNumber = generateReservationNumber();
const tableNumbers = selectedTables.map((table) => table.table_number);

const handleConfirmReservation = async () => {
  try {
    // Create the reservation object
    const reservationData = {
      reservationNumber: generateReservationNumber(),
      table_number: selectedTables.map((table) => table.table_number).join(','), // Convert to a comma-separated string
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

    // Make the POST request to your API using Axios
    const response = await axiosClient.post('/make-reservation', reservationData);

    if (response.status === 201) {
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
      <div className="bg-white rounded-lg p-8 relative">
       
      <div class="flex items-center justify-center mb-10">
        
        <div class="text-green-500">
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
        </div>

        <span class="ml-1 font-semibold text-xl text-gray-700">Table Reserved!</span>
      </div>

        
        {/* Display the generated reservation number */}
        <p>Reservation Number: {reservationNumber}</p>

        {/* Display the restaurant ID */}
        {/* <p>Restaurant ID: {restaurantId}</p> */}
        {/* Display the selected table information */}
        
        {selectedTables.map((table) => (
          <div key={table.id} className="mb-2">
           

            <p>Table Number: {table.table_number}</p>
            <p>View: {table.view.name}</p>
          </div>
        ))}

        {/* Display reservation form data */}
        {/* <h3 className="mt-4">Reservation Form Data:</h3> */}
        <p>Date: {formSubmissionData.date}</p>
        <p className='mb-3'><span className='mr-4'>From: {formSubmissionData.startTime}</span><span>To: {formSubmissionData.endTime}</span></p>

        <p>Number of Participants: {formSubmissionData.numParticipants}</p>

        {/* <p>reservant name : {user.name}</p>
            <p>reservant id : {user.id}</p> */}

        {/* <p>Selected Table Structure ID: {selectedTableStructureId}</p> */}

        {/* Checkbox for "Enable table for two to sharing" */}
<div className="my-10  flex items-center">
  {/* <label className="flex items-center">
    <input
      type="checkbox"
      checked={tablefortwo}
      onChange={() => settablefortwo(!tablefortwo)}
      className="sr-only"
    />
    <div className={`w-10 h-4 bg-green-200 rounded-full p-1 transition duration-300 ease-in-out ${tablefortwo ? 'bg-green-500' : ''}`}>
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform ${tablefortwo ? 'translate-x-6' : 'translate-x-0'} translate-y-0 transition duration-300 ease-in-out`}></div>
    </div>
    <span className="ml-2">Enable table for two to sharing.</span>
  </label> */}
  
<label className="relative inline-flex items-center cursor-pointer">
  <input 
  type="checkbox"
  checked={tablefortwo}
  onChange={() => settablefortwo(!tablefortwo)}
  className="sr-only peer"/>
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-500"></div>
  
  <span className="ml-3 text-sm font-medium text-gray-500 ">Enable table for two to share your table with others</span>
</label>

</div>




        {/* Buttons and content */}
        <div className="mt-4 flex flex-col">
          <button
            className="bg-green-500 font-semibold text-white py-3 px-4 rounded-md mb-2 w-full"
            onClick={handleConfirmReservation}
          >
            Confirm
          </button>
          
          <button
            className="bg-green-50 border font-semibold border-green-300 text-green-500 py-3 px-4 rounded-md mb-2 w-full"
            
          >
            Order meal
          </button>
          <p className='text-xs font-thin text-gray-500'>(You can order your meal to be prepared when you arrive the restaurant)</p><br />
          <button
            className="bg-red-50 text-red-500 py-3 px-4 rounded-md w-full"
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
