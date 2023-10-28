import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import Sidebar from "../../../components/Sidebar.jsx";
import TFTCards from "../../../components/tablefortwo/sentCard.jsx";

export default function Sent(){
	const [invitesData , setInviteData] = useState([]);

	useEffect(() => {
    // Replace 'apiEndpoint' with the actual URL where your Laravel backend is hosted
		axiosClient.get('tablefortwo/userdata')
		.then((response) => {
			// After setting userID, make the second GET request
			return axiosClient.get('tablefortwo/Invitations/getHistory/' + response.data.id);
		})
		.then((response) => {
			// Handle the response data from the getRequest here
			setInviteData(response.data);
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
			<p className="text-zinc-900 text-3xl font-semibold leading-normal">Invitations</p>
			<p className="text-gray-500 text-base font-normal leading-normal">Invitations sent by you for previous reservations.</p>
				{invitesData.map((user) => (
					<div key={user.id}>
						<TFTCards user={user} />
					</div>
					))}
		</div>
	  </div>
	</div>
	);
}
