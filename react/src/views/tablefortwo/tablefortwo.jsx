import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import TFTCards from "../../components/tablefortwo/peopleCard.jsx";

export default function TableForTwo(){
	// const [users,setUsers] = useState([]);
	// const[loading,setLoading] = useState(false);

	// useEffect(() => {
	// 	getUsers()
	// },[])

	// const getUsers = () => {
	// 	setLoading(true)
	// 	axiosClient.get('/users')
	// 	  .then(({ data }) => {
	// 		setLoading(false)
	// 		setUsers(data.data)
	// 	  })
	// 	  .catch(() => {
	// 		setLoading(false)
	// 	  })
	// }


	return (
		<div>
		  <div className="users-container">
			<Sidebar />
			<div className="content-container">
					<p class="text-zinc-900 text-3xl font-semibold leading-normal">People</p>
					<p class="text-gray-500 text-base font-normal leading-normal">Discover people to share your dining table with</p>

				<div className="grid grid-cols-3 gap-4">
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
					<div>
					<TFTCards />
					</div>
				</div>
			</div>
		  </div>
		</div>
	  );
}
