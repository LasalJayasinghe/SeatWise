import profilepic from '../../assets/defaultProfile.png';
import axiosClient from "../../axios-client.js";
import React, { useState , useEffect } from "react";

export default function Cards({ user }) {
  const [data , setInviteData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profilePic, setProfilePic] = useState(profilepic);
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
  
  useEffect(() => {
      const profilePicFilename = `../../assets/profile_${user.reservation.reservant_ID}.jpg`;

      // Dynamically import the image
      import(profilePicFilename)
          .then(imageModule => {
              setProfilePic(imageModule.default); // Use the imported image
          })
          .catch(() => {
              setProfilePic(profilepic); // Fall back to default image if profile image not found
          });
  }, [user.reservation.reservant_ID]);

  const handleImageError = () => {
      setProfilePic(profilepic); // Fall back to default image if profile image not found
  };

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
  return (
          
    <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                     <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-3xl bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                     <img
                        src={profilePic}
                        alt="Profile"
                        onError={handleImageError}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />       
                                </div>
              <div className='text-center'>
                <h3 className="mt-4 text-lg font-bold text-gray-700">{data.firstname}</h3>
                  <div className="flex items-center gap-2 mt-2 ml-20 text-sm text-gray-700">
                      <h3 className="text-center text-gray-700">{user.reservation.reservation_date}</h3>

                  </div>
                  
                
                {/* Buttons */}
                  <div className="mt-4">
                      <button onClick ={() => setShowModal(true)} className="block w-full py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-900">Request</button>
                      <button className="block w-full py-2 mt-2 bg-white text-black border border-gray-300 rounded-md shadow-md hover:bg-gray-100">Remove</button>
                  </div>
              </div>
        </div>    
      
      {/* Modal View */}
      {showModal ? (
                  <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="py-8 px-16 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex flex-col md:flex-row">
                  <img src={profilepic} className="mt-5 h-24 w-24 rounded-lg"/>
                  <div className="mx-10 w-full md:w-2/3 p-4">
                    <div className="items-center md:text-left">
                      <div className='gap-px'>
                        <div className="text-neutral-950 text-lg font-semibold mb-1">{data.firstname} {data.lastname}</div>
                      </div>
                      <h3 className="text-sm text-gray-700">{resData.restaurantname}</h3>
                    </div>
                    <h3 className="text-sm text-gray-700"> {formatDate(user.reservation.reservation_date)} </h3>
                    <h3 className="text-sm text-gray-700"> {formatTime(user.reservation.start_time)} -{' '} {formatTime(user.reservation.end_time)}</h3>
                  </div>
                </div>
                <div className="flex items-center justify-end px-6 pt-6 pb-2 border-t border-solid border-slate-200 rounded-b">
                  <div className="w-full py-2 bg-neutral-950 rounded-md shadow-md text-center text-white text-base font-semibold">
                    Request
                  </div>
                </div>
                <div className="flex items-center justify-end px-6 pb-12 rounded-b">
                    <button onClick={() => setShowModal(false)} className="w-full py-2 bg-zinc-100 bg-opacity-75 rounded-md shadow-md text-center text-neutral-600 text-base font-semibold">
                      Cancel
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}        
    </div>
  )
  }