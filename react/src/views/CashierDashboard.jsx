// import React from 'react';
import { useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { AiFillCalendar } from 'react-icons/ai';
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import ChartBox from "../components/chartBox";
import BarChartBox from "../components/BarChartBoxCashier";
import BigChartBox from "../components/BigChartBox";
import PieChartBox from "../components/PieChartBox";
//import ChartBox from "../components/chartBox";





export default function CashierDashboard() {

	const [CheckInCount, setCheckInCount] = useState([]);
  const [CheckOutCount, setCheckOutCount] = useState([]);
  const [TotalReservationCount,setTotalReservationCount ] = useState([]);
  const [RecentBookings,setRecentBookings] = useState([]);
	const {user, setUser} = useStateContext();
	//const [statuses, setStatuses] = useState({});
	//const [clickedButtonIdOne, setClickedButtonIdOne] = useState(null);
	//const [clickedButtonIdTwo, setClickedButtonIdTwo] = useState(null);
   
	
useEffect(() => {
  axiosClient.get('/user')
  .then(({ data }) => {
    setUser(data);
  });
}, []);

  
  useEffect(() => {
  if (user && user.id) {
  axiosClient.get(`/getCheckInCount/${user.restaurant_id}`)
    .then(({ data }) => {
      setCheckInCount(data);
    })
    .catch((error) => {
    console.error(error);
    });
  }
}, [user]);


useEffect(() => {
  if (user && user.id) {
  axiosClient.get(`/getCheckOutCount/${user.restaurant_id}`)
    .then(({ data }) => {
      setCheckOutCount(data);
    })
    .catch((error) => {
    console.error(error);
    });
  }
}, [user]);


useEffect(() => {
  if (user && user.id) {
  axiosClient.get(`/getReservationCount/${user.restaurant_id}`)
    .then(({ data }) => {
      setTotalReservationCount(data);
    })
    .catch((error) => {
    console.error(error);
    });
  }
}, [user]);



useEffect(() => {
  if (user && user.id) {
  axiosClient.get(`/getRecentBookings/${user.restaurant_id}`)
    .then(({ data }) => {
      setRecentBookings(data);
      console.log("Fetched booking Data:", data);
    })
    .catch((error) => {
    console.error(error);
    });
  }
}, [user]);

return (
  <>
  <header className="bg-white shadow">
  <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8" >
    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
    <div className="loading-container">
      {/* {loading && <p className="loading-text">Loading...</p>} */}
    </div>
  </div>
  </header>

    <div className="mx-auto max-w-7xl py-3 sm:px-6 lg:px-8">
<div className="mx-auto max-w-7xl py-3 sm:px-6 lg:px-8"style={{ display: 'flex', justifyContent: 'space-between' ,marginTop: '30px'}}>

<div className="mx-auto max-w-2xl py-3 sm:px-6 lg:px-8 shadow-md bg-white rounded-lg" style={{ height: '200px',marginLeft: '-40px' }}>
      <table className="table-fixed" >
        
		<tr className="border-none"> 
            <th className="border-none border-none px-6 py-5 text-left" colSpan="3" style={{ color: 'gray',fontSize:'1.4rem'}}> <span style={{ display: 'flex', alignItems: 'center',fontWeight:'400' }}>< AiFillCalendar style={{ marginRight: '8px' }} />Total Reservations</span></th>
 
          </tr>
       
        <tbody>

		<tr><td className="border-none border-none px-6 py-0 text-center" colSpan="3" style={{ color: 'gray',fontSize:'4.0rem',fontWeight:'650'}}> {TotalReservationCount}</td></tr>
       
        </tbody>
      </table>
    </div>

	
	<div className="mx-auto max-w-2xl py-3 sm:px-6 lg:px-8 shadow-md bg-white rounded-lg" style={{ height: '200px',marginLeft: '8px' }}>
  <table className="table-fixed" >
        
        <tr className="border-none"> 
                <th className="border-none border-none px-6 py-5 text-left" colSpan="3" style={{ color: 'gray',fontSize:'1.4rem'}}> <span style={{ display: 'flex', alignItems: 'center' ,fontWeight:'400'}}>< FiLogIn  style={{ marginRight: '8px' }}/>Check Ins Today</span></th>
     
              </tr>
           
            <tbody>
    
        <tr><td className="border-none border-none px-6 py-0 text-center" colSpan="3" style={{ color: 'gray',fontSize:'4.0rem',fontWeight:'650'}}> {CheckInCount}</td></tr>
           
            </tbody>
          </table>
    </div>


	<div className="mx-auto max-w-5xl py-3 sm:px-6 lg:px-8 shadow-md bg-white rounded-lg" style={{ height: '200px', marginLeft: '8px',marginRight: '-40px'  }}>
  <table className="table-fixed" >
        
        <tr className="border-none"> 
                <th className="border-none border-none px-6 py-5 text-left" colSpan="3" style={{ color: 'gray',fontSize:'1.4rem'}}> <span style={{ display: 'flex', alignItems: 'center',fontWeight:'400'  }}>< FiLogOut/>Check Outs Today</span></th>
     
              </tr>
           
            <tbody>
    
        <tr><td className="border-none border-none px-6 py-0 text-center" colSpan="3" style={{ color: 'gray',fontSize:'4.0rem',fontWeight:'650'}}>{CheckOutCount} </td></tr>
           
            </tbody>
          </table>
    </div>


</div>

<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>

<div className="mx-auto max-w-3xl py-4 sm:px-6 lg:px-8 shadow-md bg-white rounded-lg" >
    <table className="table-fixed border-collapse border-none">
     
      <tr className="border-none">
        <th className="border-none px-6 py-5 text-left" colSpan="3" style={{ color: 'gray', fontSize: '1.5rem' ,fontWeight:'400'}}>Today Bookings</th>
      </tr>
      <tbody>
      {RecentBookings.map((RecentBooking) => (
        <tr className="border-none" key={RecentBooking.id}>
          <td className="border-none px-6 py-2" style={{ fontWeight: 600, color: 'gray' }}>{RecentBooking[0].reservant_name}</td>
          <td className="border-none px-6 py-2" style={{ fontWeight: 600, color: 'gray' }}>{RecentBooking[0].start_time}</td>
          <td className="border-none px-6 py-2" style={{ fontWeight: 600, color: 'gray' }}>{RecentBooking[0].table_structure_id}</td>
        </tr>
      ))}



</tbody>
    </table>
  </div>

  <div className="mx-auto max-w-5xl py-4 sm:px-6 lg:px-8 shadow-md bg-white rounded-lg" style={{ width: '50%',marginLeft:'10px' }}>
    <table className="table-fixed border-collapse border-none">
      <tr className="border-none">
        <th className="border-none px-6 py-8 text-left" colSpan="3" style={{ color: 'gray', fontSize: '1.5rem', height: '43%',fontWeight:'400' }}>Monthly reservations</th>
      </tr>
     
      <tr className="border-none">
        <th className="border-none px-6 py-2 text-left" colSpan="3" style={{ color: 'gray', fontSize: '1.5rem', height: '43%',fontWeight:'400' }}></th>
      </tr>
            
    
      <tbody>
        {/* Add your content here */}
      </tbody>
    </table>
    
    <BarChartBox />
  </div>
</div>


	</div>
  </>
  );
}
