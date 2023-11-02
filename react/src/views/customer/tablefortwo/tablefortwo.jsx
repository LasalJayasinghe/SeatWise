import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client.js";
import Sidebar from "../../../components/Sidebar.jsx";
import TFTcard from "../../../components/tablefortwo/reservationCard.jsx";

export default function TableForTwo() {
  const [userData, setUserData] = useState([]);
  const [invitesData , setInviteData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
	const cardsPerPage = 3;
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	const currentCards = invitesData.slice(indexOfFirstCard, indexOfLastCard);

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
    <p className="text-3xl font-semibold leading-normal text-zinc-900">You have a Reservation Today!!</p>
    <p className="text-base font-normal leading-normal text-gray-500">Enjoy your meal.</p>
    {userData.map((user) => (
      <div key={user.id}>
        <TFTcard user={user} reserveID={user.reservationNumber} />
      </div>
    ))}
    <div className="mt-10">
      <p className="text-3xl font-semibold leading-normal text-zinc-900">Upcoming Reservations</p>
      <p className="text-base font-normal leading-normal text-gray-500">Embark on a Flavorful Journey Together</p>
        {currentCards.map((user) => (
            <div key={user.id}>
              <TFTcard user={user} reserveID={user.reservationNumber} />
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
) : (
  invitesData.length > 0 ? (
    <div className="content-container">
      <p className="text-3xl font-semibold leading-normal text-zinc-900">Upcoming Reservations</p>
      <p className="text-base font-normal leading-normal text-gray-500">Embark on a Flavorful Journey Together</p>
      {currentCards.map((user) => (
					<div key={user.id}>
            <TFTcard user={user} reserveID={user.reservationNumber} />
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
  ) : (
    // <div className="mx-auto text-center content-container md:w-1/2 lg:w-1/3">
    //   <p className="mb-4 text-4xl font-semibold leading-normal text-zinc-900">No Upcoming Reservations Yet?</p>
    //   <p className="mb-4 text-lg font-normal leading-normal text-gray-500">Why not make a reservation and savor a delightful meal?</p>
    //   <Link to="/restaurants">
    //     <button className="w-full px-4 py-2 mb-4 font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">
    //       Make Reservation
    //     </button>
    //   </Link>
    //   <p className="mb-4 text-lg font-normal leading-normal text-gray-500">Or, join someone for a memorable dining experience.</p>
    //   <Link to="/tablefortwo/suggestions">
    //     <button className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-full hover:bg-green-600">
    //       Join a Table
    //     </button>
    //   </Link>
    // </div>

<div className="mx-auto text-left content-container md:w-1/2 lg:w-1/3">
  <p className="mb-4 text-4xl font-semibold leading-normal text-zinc-500">No Upcoming Reservations Yet?</p>
  <div className="flex flex-col md:flex-row">
    <div className="w-full pr-2 md:w-2/5">
      <Link to="/restaurants">
        <button className="w-full h-48 px-8 py-2 mx-auto mb-2 font-bold text-left text-green-600 bg-green-200 md:px-10 md:mb-0 rounded-xl hover:bg-green-300 hover:text-white">
          <p className="mb-2 font-normal leading-normal text-green-600 text-md md:text-lg">Why not make a reservation and savor a delightful meal?</p>
          <span className="text-3xl md:text-4xl">Make Reservation</span>
        </button>
      </Link>
    </div>
    
    {/* <div className="flex items-center justify-center w-full md:w-1/16">
      <p className="text-xl text-gray-300">or</p>
    </div> */}

    <div className="w-full pl-2 md:w-2/5">
      <Link to="/tablefortwo/suggestions">
        <button className="w-full h-48 px-8 py-2 mx-auto mb-2 font-bold text-left text-yellow-600 bg-yellow-200 md:px-10 md:mb-0 rounded-xl hover:bg-yellow-300 hover:text-white">
          <p className="mb-2 font-normal leading-normal text-yellow-600 text-md md:text-lg">Join someone for a memorable dining experience.</p>
          <span className="text-3xl md:text-4xl">Join a table</span>
        </button>
      </Link>
    </div>
  </div>
</div>








  )
)}
</div>
  );
      }  