import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import ReservationPopup from '../../../components/ReservationPopup';
import restaurantImage from '../../../assets/restaurant3.jpg';
import hallImage from '../../../assets/restaurant1.jpg';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useStateContext } from '../../../context/ContextProvider';




const RestaurantDetail = () => {
  const { user } = useStateContext();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [tables, setTables] = useState([]);
  const [toggle, setToggle] = useState('tables');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numParticipants, setNumParticipants] = useState(1);
  const [hoveredTable, setHoveredTable] = useState(null);
  const [halls, setHalls] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showTableForTwoPopup, setShowTableForTwoPopup] = useState(false);
  const [selectedTableForTwo, setSelectedTableForTwo] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
const [formSubmissionData, setFormSubmissionData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    numParticipants: 1,
  });

  const [selectedTableStructureId, setSelectedTableStructureId] = useState(null);


  useEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await axiosClient.get(`/restaurantss/${id}`);
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
        const response = await axiosClient.get(`/restaurantss/${id}/table-structures`);
        setTables(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    if (toggle === 'tables') {
      fetchTableStructures(); // Pass the restaurant ID here
    }
  }, [id, toggle]);
  

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axiosClient.get(`/restaurantss/${id}/halls`);
        setHalls(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (toggle === 'halls') {
      fetchHalls();
    }
  }, [id, toggle]);

  const handleToggle = () => {
    setToggle(toggle === 'tables' ? 'halls' : 'tables');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get(`/restaurantss/${id}/available-tables`, {
        params: {
          restaurant_id: id,
          date,
          start_time: startTime,
          end_time: endTime,
          number_of_participants: numParticipants,
        },
      });

      const availableTables = response.data;
      setTables(availableTables);
      setSelectedTables([]); // Clear selected tables after reservation
          // Store the form submission data in state
    setFormSubmissionData({
      date,
      startTime,
      endTime,
      numParticipants,
    });
    } catch (error) {
      console.error(error);
    }
  };
  
  // Function to handle clicking the Reserve button
const handleReserveClick = () => {
  if (selectedTables.some(table => table.isAvailable)) {
    setShowPopup(true);
  }
};
  

  const handleTableClick = (table) => {
    // Check if any green table is already selected
    const greenTableSelected = selectedTables.some(selectedTable => selectedTable.isAvailable);
  
    // Prevent clicking on yellow tables if a green table is selected
    if (greenTableSelected && !table.isAvailable) {
      return;
    }
  
    if (table.isTableForTwo) {
      setSelectedTableForTwo(table);
      setShowTableForTwoPopup(true);
    }

    // Toggle the selected status of the table
    const updatedSelectedTables = selectedTables.includes(table)
      ? selectedTables.filter(selectedTable => selectedTable !== table)
      : [...selectedTables, table];
      
    setSelectedTableStructureId(table.id);

    setSelectedTables(updatedSelectedTables);

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
    <div className="relative mb-4">
    <div className="relative w-full h-60 overflow-hidden">
      <img src={restaurantImage} alt="Restaurant" className="w-full h-auto" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-2 text-white">{restaurant.restaurantname}</h1>
        <p className="text-gray-100">{restaurant.description}</p>
        <Link to={`/restaurantss/${id}/meals`}>
      <button className="border border-green-500 bg-white text-green-500 px-4 py-2 rounded-lg mb-6 mt-8">
  View Menu
</button>
</Link>
      </div>
    </div>

   <div className="flex flex-col items-center">
      {/* <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <p className="text-gray-600 mb-6">{restaurant.description}</p> */}
      
      <div className="flex items-center justify-center mb-6 mt-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            toggle === 'tables' ? 'bg-green-500 text-white' : 'bg-white text-green-500'
          }`}
          onClick={handleToggle}
        >
          Tables
        </button>
        <button
          className={`py-2 px-4 rounded-lg ml-4 ${
            toggle === 'halls' ? 'bg-green-500 text-white' : 'bg-white text-green-500'
          }`}
          onClick={handleToggle}
        >
          Halls
        </button>
      </div>

      {/* Form to input date, start time, end time, and number of participants */}
      {toggle === 'tables' && ( // Conditionally render input fields when toggle is 'tables'
        <form onSubmit={handleSubmit} className="mt-6 flex gap-4" style={{ fontSize: '12px' }}>
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
                className=" w-16 mr-5 p-2 border rounded-lg"
                min="1"
              />
            </label>

            <button type="submit" className="mr-4 bg-green-500 text-white py-2 px-4 rounded-lg">
              Search
            </button>
          </div>
        </form>
      )}

      {/* Display toggle for table for two */}
      {/* <div className="mt-4">  
<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-500 dark:peer-focus:ring-green-600 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
  <span class="ml-3 text-sm font-small text-gray-500 dark:text-gray-800">Table for two</span>
</label>
      </div> */}


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
                    selectedTables.includes(table) ? 'bg-black text-white' :
                    table.isAvailable
                      ? 'bg-green-500 cursor-pointer' // Add 'cursor-pointer' class for the hand cursor
                      : table.isTableForTwo
                      ? 'bg-yellow-300 cursor-pointer' // Add 'cursor-pointer' class for the hand cursor
                      : 'bg-gray-500 cursor-not-allowed' // Add 'cursor-not-allowed' class for the not-allowed cursor
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
                  onClick={() => handleTableClick(table)} // Add the click handler
                >
                  <h5 className="font-bold" style={{ fontSize: '9px', color: 'white' }}>
                    {table.table_number}
                  </h5>
                  {/* Pop-up bubble */}
                  {hoveredTable === table && (
                    <div
                      className="absolute top-0 left-0 transform -translate-y-full bg-white p-2 rounded-lg shadow-md"
                      style={{ fontSize: '12px', pointerEvents: 'none' }}
                    >
                      <p>{table.number_of_chairs} chairs</p>
                      <p>{table.view.name}</p>
                      
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

{/* Show selected tables count and Reserve button for available (green) tables */}
{selectedTables.some(table => table.isAvailable) && (
            <div className="mt-6">
              <p>Selected: {selectedTables.filter(table => table.isAvailable).length} Tables</p>
              <button
                className="mt-2 bg-black text-white py-2 px-4 rounded-lg"
                onClick={handleReserveClick} // Call the handleReserveClick function
              >
                Reserve
              </button>
            </div>
          )}

{/* Show the ReservationPopup when showPopup is true */}
          {showPopup && (
            <ReservationPopup onClose={() => setShowPopup(false)} 
            selectedTables={selectedTables}
            formSubmissionData={formSubmissionData} // Pass the form submission data
            user={user}
            restaurantId={restaurant.id}
            selectedTableStructureId={selectedTableStructureId}
            />
          )}
        </div>
      )}

{/* Table for Two Pop-up */}
{showTableForTwoPopup && selectedTableForTwo && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white rounded-lg p-8">

    <p className="text-center font-bold text-lg">Table for Two</p>
    <p>John Doe - 2 chairs available</p>
          {/* Buttons and content */}
          <button
            className="block mx-auto bg-green-500 text-white py-1 px-4 rounded-md mt-4"
            onClick={() => {
              // Add your logic here for the "Request" button
            }}
          >
            Request
          </button>
          <button
            className="block mx-auto bg-gray-500 text-white py-1 px-4 rounded-md mt-2"
            onClick={() => setShowTableForTwoPopup(false)}
          >
            Close
          </button>
        </div>
        </div>
      )}


      {/* Display other relevant restaurant details here */}
      {toggle === 'halls' && (
  <div className="mt-6 grid gap-4">
    {halls.map((hall) => (
      <Link to={`/halls/${hall.id}`} key={hall.id}>
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">{hall.name}</h3>
          <img
            src={hallImage} // Replace with the actual path to the image in your assets folder
            alt={`Image of ${hall.name}`}
            className="w-72 h-auto rounded-lg mt-2"
          />
          <p className="text-gray-600">{hall.description}</p>
        </div>
      </Link>
    ))}
  </div>
)}


      
    </div>
  </div>
  );
};

export default RestaurantDetail;