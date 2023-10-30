import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const HallDetail = () => {
  const { hallId } = useParams();
  const [hall, setHall] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

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

  useEffect(() => {
    const adjustedDate = new Date(selectedDate);
  adjustedDate.setDate(adjustedDate.getDate()); 

  const formattedDate = adjustedDate.toISOString().split('T')[0];
    const fetchTimeSlots = async () => {
      try {
        const response = await axiosClient.get(`/halls/${hallId}/time-slots/${formattedDate}`);
        setTimeSlots(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedDate) {
      fetchTimeSlots();
    }
  }, [hallId, selectedDate]);

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

  const handleHallReservation = () => {

    navigate('/hallreservation', {
      state: {
        selectedDate,
        selectedSlot,
      },
    });
  };

  if (!hall) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hall Name and Description */}
      <h1 className="mb-4 text-3xl font-bold">{hall.name}</h1>
      <p className="mb-6 text-gray-600">{hall.description}</p>

      {/* Calendar and Time Availabilities */}
      <div className="flex justify-center mt-20">
        {/* Left Column - Calendar */}
        <div className="mr-8">
          <div className="p-2">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="p-2 border-transparent"
            />
          </div>
        </div>

        {/* Right Column - Time Availabilities */}
        <div className="mt-6">
          {selectedDate && (
            <>
              <h3 className="text-xl font-bold text-gray-800">{selectedDate.toDateString()}</h3>
              <p className="font-semibold text-gray-400">Pick your time slot</p>
              {timeSlots.length > 0 ? (
                <ul className="mt-6">
                  {timeSlots.map((slot) => (
                    <li key={slot.id}>
                      <button
                        onClick={() => handleSlotClick(slot)}
                        className={`p-4 m-2 rounded-lg ${
                          slot.availability
                            ? 'bg-green-500 bg-opacity-10 text-green-500 font-semibold hover:bg-green-500 hover:text-white'
                            : 'bg-yellow-500 bg-opacity-10 text-yellow-500 font-semibold hover:bg-yellow-500 hover:text-white'
                        }`}
                      >
                        {slot.start_time} - {slot.end_time}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No time availabilities for the selected date.</p>
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
                <p className="mb-6 text-gray-500">
                  {selectedSlot.availability
                    ? 'Do you want to reserve the hall?'
                    : 'Do you want to join the waitlist?'}
                </p>
                <div className="flex justify-end mb-4">
                  <button className="px-4 py-2 mr-3 border border-gray-300 rounded" onClick={handlePopupClose}>
                    Close
                  </button>
                  {selectedSlot.availability ? (
                    <button
                    className="px-4 py-2 mr-2 text-white bg-green-500 rounded"
                    onClick={handleHallReservation} // Use the new function here
                  >
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
