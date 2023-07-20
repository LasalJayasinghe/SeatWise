import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const HallDetail = () => {
  const { hallId } = useParams();
  const [hall, setHall] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeAvailabilities, setTimeAvailabilities] = useState([]);

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

  // If the data is not yet fetched, display a loading message or spinner
  if (!hall) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{hall.name}</h1>
      <p className="text-gray-600 mb-6">{hall.description}</p>

      <div>
        <h2>Pick a date to view applicable slots</h2>
        <Calendar />
      </div>
    </div>
    
  );
};

export default HallDetail;
