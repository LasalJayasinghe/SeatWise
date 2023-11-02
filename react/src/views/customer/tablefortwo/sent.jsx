import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import Sidebar from "../../../components/Sidebar.jsx";
import TFTCards from "../../../components/tablefortwo/sentCard.jsx";

export default function Sent(){
	const [invitesData , setInviteData] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = 4;
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	const currentCards = invitesData.slice(indexOfFirstCard, indexOfLastCard);

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
			{currentCards.map((user) => (
					<div key={user.id}>
					  <TFTCards user={user} />
					</div>
				  ))}
				  <div class="mt-4 flex items-center justify-center"> {/* Center-align buttons */}
					<button
					  onClick={() => {
						if (currentPage > 1) {
						  setCurrentPage(currentPage - 1);
						}
					  }}
					  class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-white bg-green-500 border border-green-500 rounded-lg hover:bg-green-600"
					  disabled={currentPage === 1}
					>
					  <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
					  </svg>
					  Previous
					</button>
					<button
					  onClick={() => {
						if (currentCards.length === cardsPerPage) {
						  setCurrentPage(currentPage + 1);
						}
					  }}
					  class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-white bg-green-500 border border-green-500 rounded-lg hover:bg-green-600"
					  disabled={currentCards.length < cardsPerPage}  // Disable when there are no more pages
					>
					  Next
					  <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
					  </svg>
					</button>
				  </div>
			</div>
	  </div>
	</div>
	);
}
