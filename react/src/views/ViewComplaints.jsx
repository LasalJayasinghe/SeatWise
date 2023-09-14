
import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

// import AddCashier from './addCashier.jsx';

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



// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   // More products...
// ]

export default function ViewComplaints() {


  
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  //const [selectedCashierId, setSelectedCashierId] = useState(null);

  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const {user, setUser} = useStateContext();
 
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);


   useEffect(() => {
    if (user && user.id) {
      axiosClient.get(`/getComplaints/${user.id}`)
        .then(({ data }) => {
            setComplaints(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);











  return (
  <>
    <header className="bg-white shadow">
    <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Complaints</h1>
      <div className="loading-container">
        {/* {loading && <p className="loading-text">Loading...</p>} */}
      </div>
    </div>
    </header>
    <div>
   

<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <table className="table-fixed w-81 my-20 bg-white shadow-lg rounded-lg" style={{ marginTop: '2rem' }}>
  <thead>
    <tr className="hover:shadow-md"> 
      <th className="bg-gray-900 text-white font-bold px-6 py-3">First Name</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3"> Title</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Description</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">User Email</th>
    </tr>
  </thead>
  <tbody>


  {complaints.map((complaints) => (
            <tr className="hover:shadow-md" key={complaints.complaintID}>
                <td className="px-6 py-8">{complaints.user_email}</td>
              <td className="px-6 py-8">{complaints.title}</td>
              <td className="px-6 py-8">{complaints.description}</td>
              <td className="px-6 py-8">{complaints.userID}</td>
    
            </tr>
          ))}
  </tbody>
</table>
</div>
</div>


</>
  )


}
