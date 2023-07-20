// import { useEffect } from "react";
// import { useState } from "react";
// import axiosClient from "../axios-client";


export default function RestaurantDashboard() {

  // const [user, setUser] = useState([]);
  //   getUsers();
  // useEffect( () => {

  // }, [])

  // const getUsers = () => {
  //   axiosClient.get('/restaurantDashboard')
  //     .then(({data}) => {
  //       console.log(data);
  //     })
  //     .catch(() => {
      
  //     })
  // }






  return (
    <>
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <p>Restaurant List</p>
          </div>
        </main>
    </>
  )
}

