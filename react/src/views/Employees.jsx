
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

export default function Employees() {


  
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedCashierId, setSelectedCashierId] = useState(null);

  const navigate = useNavigate();
  const [cashiers, setCashiers] = useState([]);
  const {user, setUser} = useStateContext();
 
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

const handleClick = () =>{

navigate("/addCashier");

}


const handleUpdate = (cashierId) => {
  // Navigate to the updateEmployee page with the cashierId as a route parameter
  navigate(`/updateEmployee/${cashierId}`);
}


const handleRemove = (cashierId) => {

  setSelectedCashierId(cashierId);
    setShowConfirmationModal(true);
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
    setSelectedCashierId(null);
  };
  const confirmDelete = () => {
    setShowConfirmationModal(false);
  //const shouldDelete = window.confirm("Are you sure you want to delete this cashier?");
  
  
    // User confirmed deletion, send a DELETE request to the deleteEmployee API endpoint
    axiosClient.post(`/deleteEmployee/${selectedCashierId}`)
      .then(response => {
        // Handle success (e.g., show a success message)
        console.log(response.data.message); // Display success message from the server
        
        // Fetch updated cashier data
        if (user && user.id) {
          axiosClient.get(`/getCashiers/${user.id}`)
            .then(({ data }) => {
              setCashiers(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        // Handle error (e.g., show an error message)
        console.error('Error deleting cashier:', error);
      });
  
};


  return (
  <>
    <header className="bg-white shadow">
    <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Employees</h1>
      <div className="loading-container">
        {/* {loading && <p className="loading-text">Loading...</p>} */}
      </div>
    </div>
    </header>
    <div>
    <button onClick={handleClick} style={{ marginLeft: '73rem',
     marginTop: '4rem',
     fontSize: '1.3rem', // Increase font size
     padding: '1rem 1rem', // Increase padding vertically and horizontally
     borderRadius: '0.6rem',
     
     }}className="bg-white text-green-500 font-bold py-2 px-4 rounded">
 + Add Cashier
</button>

<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <table className="table-fixed w-81 my-20 bg-white shadow-lg rounded-lg" style={{ marginTop: '2rem' }}>
  <thead>
    <tr className="hover:shadow-md"> 
      <th className="bg-gray-900 text-white font-bold px-6 py-3">Cashier Name</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3"> Email</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Phone Number</th>
      <th className="bg-gray-900  text-white font-bold px-6 py-3">Action</th>
    </tr>
  </thead>
  <tbody>


  {cashiers.map((cashiers) => (
            <tr className="hover:shadow-md" key={cashiers.id}>
              <td className="px-6 py-8">{cashiers.cashier_name}</td>
              <td className="px-6 py-8">{cashiers.email}</td>
              <td className="px-6 py-8">{cashiers.cashier_phone_number}</td>
            <td>     <button
                onClick={() => handleUpdate(cashiers.id)} 
                style={{ marginLeft: '0rem' }}
                className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
 <button  onClick={() => handleRemove(cashiers.id)}  style={{ marginLeft: '1rem'}}className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
Remove
</button></td>
            </tr>
          ))}
  </tbody>
</table>
</div>
</div>

<DeleteConfirmationModal
        isOpen={showConfirmationModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
</>
  )


}
