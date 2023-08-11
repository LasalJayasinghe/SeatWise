
import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddCashier from './addCashier.jsx';

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

export default function ViewReservations() {

  const navigate = useNavigate();
  const [Reservation, setReservation] = useState([]);
  const {user, token, setUser, setToken} = useStateContext();
 
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);


   useEffect(() => {
    if (user && user.id) {
      axiosClient.get(`/getReservations/${user.restaurant_id}`)
        .then(({ data }) => {
          setReservation(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);



  return (
    <div>
  

<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <table className="table-fixed w-81 my-20 bg-white shadow-lg rounded-lg" style={{ marginTop: '2rem' }}>
  <thead>
    <tr className="hover:shadow-md"> 
      <th className="bg-gray-900 text-white font-bold px-6 py-3">Reservation ID</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3"> Start time</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">End time</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Table number</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Reservant name</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Number of participants</th>
    </tr>
  </thead>
  <tbody>


  {cashiers.map((cashiers) => (
            <tr className="hover:shadow-md" key={Reservation.id}>
              <td className="px-6 py-8">{Reservation.start_time}</td>
              <td className="px-6 py-8">{Reservation.end_time}</td>
              <td className="px-6 py-8">{Reservation.table_structure_id}</td>
              <td className="px-6 py-8">{Reservation.reservant_name}</td>
              <td className="px-6 py-8">{Reservation.number_of_participants}</td>
            <td>  <button style={{ marginLeft: '0rem'}}className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
Update
</button>
 <button style={{ marginLeft: '1rem'}}className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
Remove
</button></td>
            </tr>
          ))}
  </tbody>
</table>
</div>
</div>
  )
}
