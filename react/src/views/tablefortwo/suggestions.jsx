import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import axiosClient from "../../axios-client.js";
import TFTCards from "../../components/tablefortwo/peopleCard.jsx";

export default function Suggestions(){
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filterHometown, setFilterHometown] = useState(""); // State to hold the filter value

	useEffect(() => {
		getUsers();
	  }, []);

	const getUsers = () => {
		setLoading(true);
		axiosClient.get('/users')
		  .then(({ data }) => {
			setLoading(false);
			setUsers(data.data);
		  })
		  .catch(() => {	
			setLoading(false);
		  });
	  };

	  const filteredUsers = users.filter(user => {
		if (!filterHometown) {
			return true; // If no filter is applied, show all users
		}
		return user.hometown.toLowerCase() === filterHometown.toLowerCase();
	});
	return (
		<div>
		  <div className="users-container">
			<Sidebar />
			<div className="content-container">
					<p class="text-zinc-900 text-3xl font-semibold leading-normal">People</p>
					<p class="text-gray-500 text-base font-normal leading-normal">Discover the perfect dining companions based on your interests, preferences, and personality.</p>

{/* Filter input */}
<div className="mb-4">
						<input
							type="text"
							className="block w-full h-12 py-1 pl-3 pr-4 text-gray-900 placeholder-gray-400 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
							placeholder="Filter by Hometown"
							value={filterHometown}
							onChange={(e) => setFilterHometown(e.target.value)}
						/>
					</div>
          {/* Dynamically generated user cards */}
		  <div className="grid grid-cols-3 gap-4">
		  {filteredUsers.map((user) => (
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
