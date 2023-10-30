import React, { useState } from 'react';
import axiosClient from '../../../axios-client';
import { useLocation, useNavigate } from 'react-router-dom';
import backBtn from '../../../assets/back-button.png';


const HallReservation = () => {
  const [formData, setFormData] = useState({
    reservantName: '',
    emailAddress: '',
    contactNumber: '',
    occasionType: '',
    description: '',
  });
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    <div>
      <h1 className="mb-4 text-3xl font-bold">Hall Reservation</h1>
      <div className='flex justify-end'>
          <button 
            type="button"
            onClick={handleClose} 
            className="border-transparent border-radius-50% ">
            <img src={backBtn} className='w-10' onClick={handleClose} alt="Back Button" />
          </button>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="reservantName">Reservant Name</label>
          <input
            type="text"
            id="reservantName"
            name="reservantName"
            value={formData.reservantName}
            onChange={handleChange}
            required
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Reserve Hall
        </button>
      </form>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default HallReservation;
