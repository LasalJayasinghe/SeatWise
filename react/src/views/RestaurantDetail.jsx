import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [tables, setTables] = useState([]); // State to hold table structures data
  const [toggle, setToggle] = useState('tables'); // 'tables' is the default value

  // New states for the input fields
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numParticipants, setNumParticipants] = useState(1); // Default value is set to 1

  // State to hold the hovered table
  const [hoveredTable, setHoveredTable] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await axiosClient.get(`/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantDetail();
  }, [id]);

  useEffect(() => {
    const fetchTableStructures = async () => {
      try {
        const response = await axiosClient.get(`/restaurants/${id}/table-structures`);
        setTables(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (toggle === 'tables') {
      fetchTableStructures();
    }
  }, [id, toggle]);

  const handleToggle = () => {
    setToggle(toggle === 'tables' ? 'halls' : 'tables');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get(`/restaurants/${id}/table-structures`, {
        params: {
          date,
          startTime,
          endTime,
          numParticipants,
        },
      });

      // Assuming the response data is an array of table structures
      const tableStructures = response.data;
      setTables(tableStructures); // Update the tables state with the fetched data

      // You can also handle other logic based on the fetched data here
      console.log('Fetched Table Structures:', tableStructures);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to organize tables into rows based on posX and posY coordinates
  const organizeTablesIntoRows = (tables) => {
    const rows = [];
    const sortedTables = [...tables].sort((a, b) => a.posY - b.posY || a.posX - b.posX);
    let currentRow = [];
    let prevPosY = -1;

    sortedTables.forEach((table) => {
      if (table.posY !== prevPosY) {
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [table];
      } else {
        currentRow.push(table);
      }
      prevPosY = table.posY;
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  // Function to handle hovering over a table
  const handleTableHover = (table) => {
    setHoveredTable(table);
  };

  // Function to handle mouse leaving a table
  const handleTableLeave = () => {
    setHoveredTable(null);
  };

  // If the data is not yet fetched, display a loading message or spinner
  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <p className="text-gray-600 mb-6">{restaurant.description}</p>
      <div className="flex items-center justify-center mb-6">
        <button
          className={`py-2 px-4 rounded-lg ${
            toggle === 'tables'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500'
          }`}
          onClick={handleToggle}
        >
          Tables
        </button>
        <button
          className={`py-2 px-4 rounded-lg ml-4 ${
            toggle === 'halls'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500'
          }`}
          onClick={handleToggle}
        >
          Halls
        </button>
      </div>

      {/* Form to input date, start time, end time, and number of participants */}
      <form onSubmit={handleSubmit} className="mt-6 flex gap-4" style={{ fontSize: '12px'}}>
        <div className="flex items-center">
          <label className="flex items-center">
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mr-5 p-2 border rounded-lg"
            />
          </label>

          <label className="flex items-center">
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="mr-5 p-2 border rounded-lg"
            />
          </label>

          <label className="flex items-center">
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="mr-5 p-2 border rounded-lg"
            />
          </label>

          <label className="flex items-center">
            Participant count:
            <input
              type="number"
              value={numParticipants}
              onChange={(e) => setNumParticipants(Math.max(1, parseInt(e.target.value)))}
              required
              className="mr-5 p-2 border rounded-lg"
              min="1"
            />
          </label>

          <button type="submit" className="mr-4 bg-green-500 text-white py-2 px-4 rounded-lg">
            Search
          </button>
        </div>
      </form>

      {/* Display table structures */}
      {toggle === 'tables' && (
        <div className="mt-6">
          {/* Organize tables into rows */}
          {organizeTablesIntoRows(tables).map((row, rowIndex) => (
            <div key={rowIndex} className="flex mt-4">
              {row.map((table) => (
                <div
                  key={table.id}
                  className={`relative p-4 border rounded-lg ${
                    table.reservation ? 'bg-gray-400' : 'bg-green-500'
                  }`}
                  style={{
                    width: '2cm',
                    height: '1cm',
                    fontSize: '10px', 
                    textAlign: 'center',
                    marginRight: '4px',
                  }}
                  onMouseEnter={() => handleTableHover(table)}
                  onMouseLeave={handleTableLeave}
                >
                  <h5 className="font-bold" style={{ fontSize: '9px', color: 'white' }}>{table.table_number}</h5>
                  {/* Pop-up bubble */}
                  {hoveredTable === table && (
                    <div
                      className="absolute top-0 left-0 transform -translate-y-full bg-white p-2 rounded-lg shadow-md"
                      style={{ fontSize: '12px', pointerEvents: 'none' }}
                    >
                      <p>{table.view}</p>
                      <p>{table.number_of_chairs} chairs</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Display other relevant restaurant details here */}
      {toggle === 'halls' && (
        <div>
          {halls.map((hall) => (
            <div key={hall.id} className="mb-4">
              <Link to={`/halls/${hall.id}`}>
                <h3 className="text-lg font-semibold">{hall.name}</h3>
              </Link>
              <p className="text-gray-600">{hall.description}</p>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default RestaurantDetail;