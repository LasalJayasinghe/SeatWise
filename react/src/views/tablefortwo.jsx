import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function Users(){
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


	return(
	<div>
		<Header/>
		<Sidebar/>
	</div>
	)
}