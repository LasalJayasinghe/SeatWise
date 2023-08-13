import React from 'react';
import { useRef, useState } from "react";
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

	const [Reservation, setReservation] = useState([]);
	const {user, token, setUser, setToken} = useStateContext();
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


    <div className="mx-auto max-w-7xl py-3 sm:px-6 lg:px-8">
<div className="mx-auto max-w-7xl py-3 sm:px-6 lg:px-8"style={{ display: 'flex', justifyContent: 'space-between' ,marginTop: '30px'}}>

<div className="mx-auto max-w-2xl py-3 sm:px-6 lg:px-8 shadow-md bg-white rounded-lg" style={{ height: '200px',marginLeft: '-40px' }}>
      <table className="table-fixed" >
        
		<tr className="border-none"> 
            <th className="border-none border-none px-6 py-5 text-left" colSpan="3" style={{ color: 'gray',fontSize:'1.4rem'}}> <span style={{ display: 'flex', alignItems: 'center',fontWeight:'400' }}>< AiFillCalendar style={{ marginRight: '8px' }} />Total Reservations</span></th>
 
          </tr>
       
        <tbody>

		<tr><td className="border-none border-none px-6 py-0 text-center" colSpan="3" style={{ color: 'gray',fontSize:'4.0rem',fontWeight:'650'}}> 34</td></tr>
       
        </tbody>
      </table>
    </div>

	
	<div className="mx-auto max-w-2xl py-3 sm:px-6 lg:px-8 shadow-md bg-white rounded-lg" style={{ height: '200px',marginLeft: '8px' }}>
  <table className="table-fixed" >
        
        <tr className="border-none"> 
                <th className="border-none border-none px-6 py-5 text-left" colSpan="3" style={{ color: 'gray',fontSize:'1.4rem'}}> <span style={{ display: 'flex', alignItems: 'center' ,fontWeight:'400'}}>< FiLogIn  style={{ marginRight: '8px' }}/>Check Ins Today</span></th>
     
              </tr>
           
            <tbody>
    
        <tr><td className="border-none border-none px-6 py-0 text-center" colSpan="3" style={{ color: 'gray',fontSize:'4.0rem',fontWeight:'650'}}> 18</td></tr>
           
            </tbody>
          </table>
    </div>


	<div className="mx-auto max-w-5xl py-3 sm:px-6 lg:px-8 shadow-md bg-white rounded-lg" style={{ height: '200px', marginLeft: '8px',marginRight: '-40px'  }}>
  <table className="table-fixed" >
        
        <tr className="border-none"> 
                <th className="border-none border-none px-6 py-5 text-left" colSpan="3" style={{ color: 'gray',fontSize:'1.4rem'}}> <span style={{ display: 'flex', alignItems: 'center',fontWeight:'400'  }}>< FiLogOut/>Check Outs Today</span></th>
     
              </tr>
           
            <tbody>
    
        <tr><td className="border-none border-none px-6 py-0 text-center" colSpan="3" style={{ color: 'gray',fontSize:'4.0rem',fontWeight:'650'}}> 16</td></tr>
           
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
      <tr className="border-none">
        <td className="border-none px-6 py-2"><img
          className="h-14 w-15 rounded-full"
          src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?size=626&ext=jpg"
          alt="profile"
        /> </td>
        <td className="border-none px-6 py-2" style={{ fontWeight: 600, color: 'gray' }}>Ashanya semindi</td>
        <td className="border-none px-3 py-2" style={{ fontWeight: 600, color: 'gray' }}>Table Number 2</td>
      </tr>

	  <tr className="border-none">
        <td className="border-none px-6 py-2"><img
          className="h-14 w-15 rounded-full"
          src="https://t3.ftcdn.net/jpg/01/86/34/08/240_F_186340800_qlgVLkKLVy19r6SEL7RnniP1Yz6dmq8T.jpg"
          alt="profile"
        /> </td>
        <td className="border-none px-6 py-2" style={{ fontWeight: 600, color: 'gray' }}>Eshan Fernando</td>
        <td className="border-none px-3 py-2" style={{ fontWeight: 600, color: 'gray' }}>Table Number 2</td>
      </tr>

	  <tr className="border-none">
        <td className="border-none px-6 py-2"><img
          className="h-14 w-15 rounded-full"
          src="https://as1.ftcdn.net/v2/jpg/06/20/73/04/1000_F_620730420_v9RnvoxaA7IH1271Dssk6kixwZs6wTJk.jpg"
          alt="profile"
        /> </td>
        <td className="border-none px-6 py-2" style={{ fontWeight: 600, color: 'gray' }}>Shenaya Awanthi</td>
        <td className="border-none px-3 py-2" style={{ fontWeight: 600, color: 'gray' }}>Table Number 9</td>
      </tr>
      <tbody>
        {/* Add your content here */}
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
  );
}
