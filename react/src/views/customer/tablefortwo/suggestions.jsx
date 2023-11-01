import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar.jsx";
import axiosClient from "../../../axios-client.js";
import TFTCards from "../../../components/tablefortwo/peopleCard.jsx";

export default function Suggestions(){
	const [users, setUsers] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = 6;
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	const currentCards = users.slice(indexOfFirstCard, indexOfLastCard);

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
					{currentCards.map((user) => (
						<div key={user.id}>
						<TFTCards user={user} />
						</div>
					))}
				</div>
				<div class="flex items-center justify-center"> {/* Center-align buttons */}
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
