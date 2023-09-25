import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import Sidebar from "../../../components/Sidebar.jsx";
import TFTcard from "../../../components/tablefortwo/peopleCard.jsx";

export default function TableForTwo() {
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
  const visibleUsers = filteredUsers.filter(user => user.id !== loggedInUserId).slice(0, 12);

  return (
    <div>
      <div className="users-container">
        <Sidebar />
        <div className="content-container">
          <p className="text-zinc-900 text-3xl font-semibold leading-normal">People</p>
          <p className="text-gray-500 text-base font-normal leading-normal">Discover people to share your dining table with</p>
          
          <div className="relative flex items-center mb-4 sm:mb-0">
            <input
              type="text"
              className="block w-full h-12 py-1 pl-10 pr-4 mt-3 text-gray-900 placeholder-gray-400 border-gray-300 rounded-md sm:w-64 focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
              placeholder="Search People"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {visibleUsers.map((user) => (
              <div key={user.id}>
                <TFTcard user={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
