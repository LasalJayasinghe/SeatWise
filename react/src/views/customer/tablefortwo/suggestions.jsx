import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar.jsx";
import axiosClient from "../../../axios-client.js";
import TFTCards from "../../../components/tablefortwo/peopleCard.jsx";

export default function Suggestions(){
	const [users, setUsers] = useState([]);
	useEffect(() => {
		axiosClient.get('/tablefortwo/suggestions/getPendingInvites')
		.then((response) => {
			setUsers(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);

	return (
		<div>
		  <div className="users-container">
			<Sidebar />
			<div className="content-container">
				<p className="text-zinc-900 text-3xl font-semibold leading-normal">Table Reservation Requests</p>
				<p className="text-gray-500 text-base font-normal leading-normal">Explore and respond to table reservation requests from other users who are looking to share a dining experience with you.</p>

		  <div className="grid grid-cols-3 gap-4">
			{users.map((user) => (
				<div key={user.id}>
					<TFTCards user={user} />
				</div>
				))}
				</div>
			</div>
		  </div>
		</div>
	  );
}
