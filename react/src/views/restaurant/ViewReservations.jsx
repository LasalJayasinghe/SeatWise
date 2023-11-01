
import { useRef, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddCashier from './addCashier.jsx';
import Reservations from "./Reservations";


/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/



const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]


const filterOptions = [
  { value: "all", label: "All" },
  { value: "checkedIn", label: "Checked In" },
  { value: "checkedOut", label: "Checked Out" },
  { value: "pending", label: "Pending" },
];
export default function ViewReservations() {

  const navigate = useNavigate();
  const [Reservation, setReservation] = useState([]);
  const {user, token, setUser, setToken} = useStateContext();
  const [statuses, setStatuses] = useState({});
  const [clickedButtonIdOne, setClickedButtonIdOne] = useState(null);
  const [clickedButtonIdTwo, setClickedButtonIdTwo] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [input, setInput] = useState(0);
  const [inputDate, setInputDate] = useState("");
  const [date, setDate] = useState('');
 
  
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);


   useEffect(() => {
    if (user && user.id) {
      axiosClient.get(`/getReservations/${user.restaurant_id}/${selectedFilter}/${input}`)
      
        .then(({ data }) => {
          setReservation(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user,selectedFilter,input,inputDate]);


 

  function handleCheckOut(reservationId) {
    // Make API call to update the check-out value in the database
    axiosClient.post(`/handleCheckOut/${reservationId}`)
      .then(response => {

       
        setClickedButtonIdTwo(reservationId); 
            
        if (user && user.id) {
          //axiosClient.get(`/getReservations/${user.restaurant_id}`)
          axiosClient.get(`/getReservations/${user.restaurant_id}/${selectedFilter}/${input}`)
            .then(({ data }) => {
             
              setReservation(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        console.error(error);
        
      });


 
    

              /*useEffect(() => {
                if (user && user.id) {
                  axiosClient.get(`/getStatus/${reservationId}`)
                    .then(({ data }) => {
                      setReservation(data);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }
              }, [statuses]);*/
          
  }

  function handleCheckIn(reservationId) {
    // Make API call to update the check-out value in the database
    axiosClient.post(`/handleCheckIn/${reservationId}`)
      .then(response => {
        setClickedButtonIdOne(reservationId); 
        if (user && user.id) {
         // axiosClient.get(`/getReservations/${user.restaurant_id}`)
         axiosClient.get(`/getReservations/${user.restaurant_id}/${selectedFilter}/${input}`)
            .then(({ data }) => {
              setReservation(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
            
    
      })
      .catch(error => {
        console.error(error);
        
      });
          
  }

  return (
   <>
    <header className="bg-white shadow" >
    <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">View Reservations</h1>
      <div className="loading-container">
        {/* {loading && <p className="loading-text">Loading...</p>} */}
      </div>
    </div>
    </header>
    <div>
  
  <div className="mx-auto max-w-10xl py-6 sm:px-6 lg:px-8">

  <div className="my-4 mx-auto max-w-2xl flex items-center">
  <select
    value={selectedFilter}
    onChange={(e) => {
      setSelectedFilter(e.target.value);
      setInput(0); // Clear the input when the filter selection changes
    }}
    className="bg-green-500 border rounded text-white font-bold w-1/2 mr-4 mt -1 py-4" // Reduce the padding here
  >
    {filterOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    required
    className="p-2 border rounded-lg px -5 mr-4" // Remove the margin class
  />
  <input
    type="text"
    placeholder="Search by Reservation ID"
    className="border rounded w-full p-2"
    value={input}
    onChange={(e) => setInput(e.target.value)}
  />

 
</div>



  <table className="table-fixed w-full my-20 bg-white shadow-lg rounded-lg">
    <thead>
          <tr className="hover:shadow-md"> 
      <th className="bg-gray-900 text-white font-bold px-6 py-3">Reservation ID</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3"> Start time</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">End time</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Table number</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Floor</th>
      <th className="bg-gray-900  text-white font-bold px-2 py-3">Reservant ID</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Number of participants</th>
      <th className="bg-gray-900  text-white font-bold px-1 py-3">Table for two</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Status</th>
      
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Action</th>
    
    </tr>
    </thead>
    <tbody>
      {Reservation.map((Reservation) => (
        <tr className="hover:shadow-md" key={Reservation.id}>
          <td className="px-6 py-4">{Reservation.reservationNumber}</td>
          <td className="px-6 py-4">{Reservation.start_time}</td>
          <td className="px-6 py-4">{Reservation.end_time}</td>
          <td className="px-6 py-4">{Reservation.table_number}</td>
          <td className="px-6 py-4">{Reservation.floor}</td>
          <td className="px-6 py-4">{Reservation.	reservant_ID}</td>
         <td className="px-6 py-4">{Reservation.number_of_participants}</td>
         <td className="px-6 py-4"  >
  {Reservation.tablefortwo === 0 ? "Disabled" : "Enabled"}
</td>

          <td
  className={`px-0 py-5 ${
    Reservation.status === 1
      ? "text-green-500"
      : Reservation.status === 0
      ? "text-red-500"
      : "text-gray-900"
  }`}
>
  {Reservation.status === 1
    ? "Checked In"
    : Reservation.status === 0
    ? "CheckedOut"
    : "Pending"}
</td>

             <td>  <button
  style={{ marginLeft: '-4rem' }}
  onClick={() => handleCheckIn(Reservation.id)} // Pass a function reference
  className={`hover:bg-green-500 border border-green-500 text-black font-bold py-2 px-3 rounded`}
>
  Check In
</button>
<button
  style={{ marginLeft: '1rem',marginRight: '0.5rem' }}
  onClick={() => handleCheckOut(Reservation.id)} // Pass a function reference
   className={` hover:bg-green-500 border border-green-500 text-black font-bold py-2 px-3 rounded`}
>
  Check Out
</button>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>
</>
  )
}
