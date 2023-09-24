import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from "../axios-client";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../util/custom-calendar.css'
import { Carousel } from 'react-responsive-carousel';

import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.png';
import slide4 from '../assets/slide4.png';


const HallDetail = () => {
  const { hallId } = useParams();
  const [hall, setHall] = useState(null);
  const [timeAvailabilities, setTimeAvailabilities] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false); // New state for showing the pop-up
  const [selectedSlot, setSelectedSlot] = useState(null); // New state for storing the selected time slot

  useEffect(() => {
    const fetchHallDetail = async () => {
      try {
        const response = await axiosClient.get(`/halls/${hallId}`);
        setHall(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHallDetail();
  }, [hallId]);

  const fetchTimeAvailabilities = async (date) => {
    try {
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate() + 1;
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const response = await axiosClient.get(`/halls/${hallId}/time-availabilities/${formattedDate}`);
      setTimeAvailabilities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTimeAvailabilities(selectedDate);
    }
  }, [selectedDate]);

  const navigate = useNavigate();

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedSlot(null);
  };

  const handleJoinWaitlist = () => {
    setShowPopup(false);
    setSelectedSlot(null);
    navigate('/waitlist', { state: { selectedDate, selectedSlot } });
  };
  
  

  if (!hall) {
    return <div>Loading...</div>;
  }

  return (
    <div>


{/* <CustomCalendar/> */}



      
      {/* Hall Name and Description */}
      <div>
        <h1 className="mb-4 text-3xl font-bold">{hall.name}</h1>
        <p className="mb-6 text-gray-600">{hall.description}</p>
      </div>

     

      {/* Calendar and Time Availabilities */}
      <div className="flex justify-center mt-20">
        {/* Left Column - Calendar */}
        <div className="mr-8 ">
          {/* <p className="mb-2 font-semibold text-gray-500 text-md ">Pick a date to view applicable slots</p> */}
          <div className="p-2 ">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="p-2 border-transparent "
              tileClassName={({ date, view }) =>
                view === 'month' && date.toDateString() === new Date().toDateString()
                  ? 'text-green-500' // Apply black font color to today's date
                  : 'react-calendar__tile--custom'
              }
            />
          </div>
        </div>

        {/* Right Column - Time Availabilities */}
        <div className='mt-6'>
          {selectedDate && (
            <>
              <h3 className='text-xl font-bold text-gray-800'>{selectedDate.toDateString()}</h3>
              <p className='font-semibold text-gray-400'>Pick your time slot</p>
              {timeAvailabilities  ? (
                <ul className='mt-6'>
                  {timeAvailabilities.map((availability) => (
                    <li
                      key={availability.id}
                      style={{ color: 'white', cursor: 'pointer' }}
                      onClick={() => handleSlotClick(availability)}
                    >
                      <button
                        className={`p-4 m-2 rounded-lg ${
                          availability.availability
                            ? 'bg-green-500 bg-opacity-10 text-green-500 font-semibold hover:bg-green-500 hover:text-white'
                            : 'bg-yellow-500 bg-opacity-10 text-yellow-500 font-semibold  hover:bg-yellow-500 hover:text-white'
                        }`}
                      >
                        {availability.start_time} - {availability.end_time}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No time availabilities for selected date.</p>
              )}
            </>
          )}
          {!selectedDate && <p>Select a date to view applicable slots.</p>}
        </div>
      </div>

      {/* Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="p-6 bg-white rounded-md shadow-lg">
            {selectedSlot && (
              <>
                <h4 className="text-lg font-bold">
                {selectedSlot.availability ? 'Slot is available' : 'Slot is unavailable'}
                </h4>
                <p className='mb-6 text-gray-500'>
                  {selectedSlot.availability ? 'Do you want to reserve the hall?' : 'Do you want to join the waitlist?'}
                  </p>
                <div className="flex justify-end mb-4 ">
                <button
                      className="px-4 py-2 mr-3 border border-gray-300 rounded"
                      onClick={handlePopupClose}
                    >
                      Close
                    </button>
                  {selectedSlot.availability ? (
                    <button className="px-4 py-2 mr-2 text-white bg-green-500 rounded">
                      Reserve
                    </button>
                  ) : (
                    <button className="px-4 py-2 mr-2 text-white bg-yellow-500 rounded" onClick={handleJoinWaitlist}>
                      Join
                    </button>
                  )}
                  
                </div>
              </>
            )}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default HallDetail;