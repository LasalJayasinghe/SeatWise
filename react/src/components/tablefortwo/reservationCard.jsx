import React, { useState, useEffect } from 'react';
import profilepic from '../../assets/defaultProfile.png';
import axiosClient from '../../axios-client.js';

export default function Cards({ user , reserveID}) {
  const [showModal, setShowModal] = useState(false);
  const [invitesData, setInviteData] = useState({});
  const [resData, setResData] = useState({});

  useEffect(() => {
    const getUserDetails = axiosClient.get('userDetails/' + user.reservation.reservant_ID);
    const getRestaurantDetails = axiosClient.get('restaurantDetails/' + user.reservation.restaurant_id);

    Promise.all([getUserDetails, getRestaurantDetails])
      .then((responses) => {
        const [userData, restaurantData] = responses;
        console.log('user data', userData.data);
        console.log('restaurant data', restaurantData.data);

        setInviteData(userData.data);
        setResData(restaurantData.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user.reservation.reservant_ID, user.reservation.restaurant_id]);

  // Time formatting function
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    let period = 'AM';

    const hoursNum = parseInt(hours, 10);

    if (hoursNum >= 12) {
      period = 'PM';
    }

    const formattedHours = hoursNum % 12 || 12;

    return `${formattedHours}:${minutes} ${period}`;
  };

  // Date formatting function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCancelReservation = () => {
    // Make an API call to cancel the reservation using user.reservation.reservation_id
    axiosClient
      .put(`/tablefortwo/cancelReservation/${reserveID}`)
      .then((response) => {
        // Handle a successful response from the API
        console.log('Reservation canceled:', response.data);
  
        // Close the modal after successful cancellation
        setShowModal(false);
  
        // You can also update the UI here if needed, e.g., changing the reservation status
        // For example, if user.status is a state variable, you can update it here
        // setUserData((prevUserData) => ({
        //   ...prevUserData,
        //   status: 'canceled',
        // }));
      })
      .catch((error) => {
        // Handle errors from the API request
        console.error('Error canceling reservation:', error);
  
        // You may want to show an error message to the user or handle the error in another way
      });
  };
  

  return (
    <div className="max-w-full px-4 py-4 flex items-center border-b border-gray-200">
      <img
        src={profilepic}
        className="h-12 w-12 object-cover object-center rounded-full mr-4"
        alt="Profile"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-700">
          {invitesData.firstname} {invitesData.lastname}
        </h3>
        <h3 className="text-sm text-gray-700">
          {formatDate(user.reservation.reservation_date)}
        </h3>
        <h3 className="text-sm text-gray-700">
          {formatTime(user.reservation.start_time)} -{' '}
          {formatTime(user.reservation.end_time)}
        </h3>
        <h3 className="text-sm text-gray-700">{resData.restaurantname}</h3>
      </div>

      <div className="ml-4">
        <p
          className={`font-bold text-${
            user.status === 'accepted' ? 'green-500' : 'red-500'
          } mb-2`}
        >
          {user.status === 'accepted' ? 'Accepted' : 'Canceled'}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="block w-24 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          View Details
        </button>
      </div>

      {/* Modal View */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-full mx-auto max-w-md bg-white rounded-lg shadow-lg">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={handleModalClose}
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-lg font-semibold text-center">
                {invitesData.firstname} {invitesData.lastname}
              </div>
              <div className="mt-4">
                <img
                  src={profilepic}
                  alt="Profile"
                  className="mx-auto h-40 w-40 rounded-full object-cover"
                />
              </div>
              <div className="mt-4 text-gray-600 text-sm">
                <div className="mb-2">
                  <div className="font-semibold text-gray-700">Restaurant:</div>
                  {resData.restaurantname}
                </div>
                <div className="mb-2">
                  <div className="font-semibold text-gray-700">Date:</div>
                  {formatDate(user.reservation.reservation_date)}
                </div>
                <div className="mb-2">
                  <div className="font-semibold text-gray-700">Time:</div>
                  {formatTime(user.reservation.start_time)} -{' '}
                  {formatTime(user.reservation.end_time)}
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="bg-red-500 text-white px-16 py-2 rounded-full font-semibold hover:bg-red-600 focus:outline-none"
                  onClick={handleCancelReservation}
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
