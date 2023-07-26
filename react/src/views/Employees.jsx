
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
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);


   useEffect(() => {
    if (user && user.id) {
      axiosClient.get(`/getCashiers/${user.id}`)
        .then(({ data }) => {
          setCashiers(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);
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


  {cashiers.map((cashiers) => (
            <tr className="hover:shadow-md" key={cashiers.id}>
              <td className="px-6 py-8">{cashiers.cashier_name}</td>
              <td className="px-6 py-8">{cashiers.cashier_email}</td>
              <td className="px-6 py-8">{cashiers.cashier_phone_number}</td>
            </tr>
          ))}
  </tbody>
</table>
</div>
  )
}
