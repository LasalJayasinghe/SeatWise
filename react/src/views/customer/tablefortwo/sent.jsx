import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import Sidebar from "../../../components/Sidebar.jsx";
import TFTCards from "../../../components/tablefortwo/sentCard.jsx";

export default function Sent(){
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
	  const loggedInUserId = 24; // Replace with your actual logged-in user's ID
	  const visibleUsers = filteredUsers.filter(user => user.id !== loggedInUserId).slice(6, 12);


	return (
		<div>
		  <div className="users-container">
			<Sidebar />
			<div className="content-container">
					<p class="text-zinc-900 text-3xl font-semibold leading-normal">Requests</p>
					<p class="text-gray-500 text-base font-normal leading-normal">Discover people to share your dining table with</p>

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
