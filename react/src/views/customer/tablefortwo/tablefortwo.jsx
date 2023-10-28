import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client.js";
import Sidebar from "../../../components/Sidebar.jsx";
import TFTcard from "../../../components/tablefortwo/reservationCard.jsx";

export default function TableForTwo() {
  const [userData, setUserData] = useState([]);
  const [invitesData , setInviteData] = useState([]);

	useEffect(() => {
		axiosClient.get('tablefortwo/userdata')
		.then((response) => {
			return axiosClient.get('tablefortwo/accepted/' + response.data.id);
		})
		.then((response) => {
			setInviteData(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);

  useEffect(() => {
		axiosClient.get('tablefortwo/userdata')
		.then((response) => {
			return axiosClient.get('tablefortwo/todayAccepted/' + response.data.id);
		})
		.then((response) => {
			setUserData(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);
  return (
<div className="users-container">
  <Sidebar />
  {userData.length > 0 ? (
  <div className="content-container">
    <p className="text-zinc-900 text-3xl font-semibold leading-normal">You have a Reservation Today!!</p>
    <p className="text-gray-500 text-base font-normal leading-normal">Enjoy your meal.</p>
    {userData.map((user) => (
      <div key={user.id}>
        <TFTcard user={user} reserveID={user.reservationNumber} />
      </div>
    ))}
    <div className="mt-10">
      <p className="text-zinc-900 text-3xl font-semibold leading-normal">Upcoming Reservations</p>
      <p className="text-gray-500 text-base font-normal leading-normal">Embark on a Flavorful Journey Together</p>
      {invitesData.map((user) => (
        <div key={user.id}>
          <TFTcard user={user} reserveID={user.reservationNumber} />
        </div>
      ))}
    </div>
    </div>
) : (
  invitesData.length > 0 ? (
    <div className="content-container">
      <p className="text-zinc-900 text-3xl font-semibold leading-normal">Upcoming Reservations</p>
      <p className="text-gray-500 text-base font-normal leading-normal">Embark on a Flavorful Journey Together</p>
      {invitesData.map((user) => (
        <div key={user.id}>
          <TFTcard user={user} reserveID={user.reservationNumber} />
        </div>
      ))}
    </div>
  ) : (
    <div className="content-container mx-auto text-center md:w-1/2 lg:w-1/3">
      <p className="text-zinc-900 text-4xl font-semibold leading-normal mb-4">No Upcoming Reservations Yet?</p>
      <p className="text-gray-500 text-lg font-normal leading-normal mb-4">Why not make a reservation and savor a delightful meal?</p>
      <Link to="/restaurants">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mb-4 w-full">
          Make Reservation
        </button>
      </Link>
      <p className="text-gray-500 text-lg font-normal leading-normal mb-4">Or, join someone for a memorable dining experience.</p>
      <Link to="/tablefortwo/suggestions">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full w-full">
          Join a Table
        </button>
      </Link>
    </div>
  )
)}
</div>
  );
      }  