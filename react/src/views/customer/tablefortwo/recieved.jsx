import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import Sidebar from "../../../components/Sidebar.jsx";
import TFTCards from "../../../components/tablefortwo/recievedCard.jsx";

export default function Recieved(){
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

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
	
	  const filteredUsers = users.filter(user =>
		user.name.toLowerCase().includes(searchTerm.toLowerCase())
	  );
	
	  // Assuming loggedInUserId contains the ID of the logged-in user
	  const loggedInUserId = 24; // Replace with your actual logged-in user's ID
	
	  // Filter out the logged-in user's card
	  const visibleUsers = filteredUsers.filter(user => user.id !== loggedInUserId).slice(12, 15);
	
	return (
		<div>
		  <div className="users-container">
			<Sidebar />
			<div className="content-container">
					<p className="text-zinc-900 text-3xl font-semibold leading-normal">Requests</p>
					<p className="text-gray-500 text-base font-normal leading-normal">Discover people to share your dining table with</p>
					<div className="grid grid-cols-3 gap-4">
            {visibleUsers.map((user) => (
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
