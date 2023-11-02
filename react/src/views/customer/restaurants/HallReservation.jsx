import React, { useState } from 'react';
import axiosClient from '../../../axios-client';
import { useLocation, useNavigate } from 'react-router-dom';
// import backBtn from '../../../assets/back-button.png';
import ReservationSuccessPopup from '../../../components/ReservationSuccessPopup';

const HallReservation = () => {

  const navigate = useNavigate();
  const location = useLocation(); // Use the useLocation hook to access state
  const { selectedDate, selectedSlot } = location.state;
  console.log (selectedDate);

  const [formData, setFormData] = useState({
    reservantName: '',
    emailAddress: '',
    contactNumber: '',
    occasionType: '',
    description: '',
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/hall-reservation', formData);
      setSuccessMessage('Reservation successful!'); // Customize success message
      setErrorMessage('');
      // You can redirect the user or perform other actions upon successful reservation
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Reservation failed. Please try again.'); // Customize error message
    }
  };

  
  const handleClose = () => {
    navigate(-1); // go back to the previous page
  };

  return (
    <div className='px-10 sm:px-20 md:px-40 lg:px-80' >
      <div className=' flex mb-4 text-3xl font-bold'>
      <button 
              type="button"
              onClick={handleClose} 
              
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
     </button>
     
      <h1 className='ml-5' >Hall Reservation</h1>

      </div>
      
      {/* <div className='flex justify-end'>
          <button 
            type="button"
            onClick={handleClose} 
            className="border-transparent border-radius-50% ">
            <img src={backBtn} className='w-10' onClick={handleClose} alt="Back Button" />
          </button>
        </div> */}

{/* <p>Selected Slot ID: {selectedSlot.id}</p>
  <p>Selected Slot's Hall ID: {selectedSlot.hall_id}</p> */}
  <div className='ml-10 mb-10  font-semibold text-gray-600 '>
      <p className='mb-4'>Date: &nbsp;&nbsp;&nbsp;&nbsp;{selectedDate.toLocaleDateString()}</p>
      <p>From: &nbsp;&nbsp;&nbsp;{selectedSlot.start_time}</p>
      <p>To: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{selectedSlot.end_time}</p>
  </div>

  

      <form onSubmit={handleSubmit} className='text-gray-500 '>
        <div className="mb-4">
          <label htmlFor="reservantName">Reservant Name</label>
          <input
            type="text"
            id="reservantName"
            name="reservantName"
            value={formData.reservantName}
            onChange={handleChange}
            required
            className='rounded-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            required
            className='rounded-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6'
          />
        </div>
        <div className="mb-4 ">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className='rounded-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="occasionType">Occasion Type</label>
          <input
            type="text"
            id="occasionType"
            name="occasionType"
            value={formData.occasionType}
            onChange={handleChange}
            required
            className='rounded-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6'
          />
        </div>
        <div className="mb-4 flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className='h-24 w-full rounded-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6'
          />
        </div>
        <div className=' flex justify-end'>
        <button 
              type="button"
              onClick={handleClose} 
              className="px-4 py-2  mr-4 border border-gray-500 rounded"
            >
              Cancel
            </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded"
        >
          Reserve Hall
        </button>
        </div>
        
        
      </form>
      {successMessage && showSuccessPopup && (
        <ReservationSuccessPopup
          message={successMessage}
          onClose={handleClosePopup} // Pass the close function
          onHomeClick={() => {
            navigate('/dashboard');
          }}
          onActivitiesClick={() => {
            navigate('/activities');
          }}
        />
      )}     {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default HallReservation;
