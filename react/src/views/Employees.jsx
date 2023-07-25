
import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";

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

export default function Employees() {
  const [cashiers, setCashiers] = useState([]);
  const {user, token, setUser, setToken} = useStateContext();

  useEffect(() => {

    axiosClient.get('/getCashiers')
      .then(({ data }) => {
        setCashiers(data);
      });
  }, []);
  return (
    <div>
    <button style={{ marginLeft: '83rem', marginTop: '4rem' }}className="bg-gray-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
 Add Cashier
</button>


      <table className="table-fixed w-81 my-20 bg-white shadow-lg rounded-lg">
  <thead>
    <tr className="hover:shadow-md"> 
      <th className="bg-gray-900 text-white font-bold px-6 py-3">Cashier name</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3"> Email</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Phone number</th>
    </tr>
  </thead>
  <tbody>


  
      
    <tr className="hover:shadow-md">
      <td className="px-6 py-8">{user.id} </td>
      <td className="px-6 py-8">{user.email}</td>
      <td className="px-6 py-8">0762711495</td>
    </tr>
    <tr className="hover:shadow-md">
      <td className="px-6 py-7">Sanduni</td>
      <td className="px-6 py-7">Sandu6@gmail.com</td>
      <td className="px-6 py-7">0762811495</td>
    </tr>
    <tr className="hover:shadow-md">
      <td className="px-6 py-7">Kanishka</td>
      <td className="px-6 py-7">Kanish5@gmail.com</td>
      <td className="px-6 py-7">0762711491</td>
    </tr>
  </tbody>
</table>
</div>
  )
}
