import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Users(){
	const [users,setUsers] = useState([]);
	const[loading,setLoading] = useState(false);

	useEffect(() => {
		getUsers()
	},[])

	const getUsers = () => {
		setLoading(true)
		axiosClient.get('/users')
		  .then(({ data }) => {
			setLoading(false)
			setUsers(data.data)
		  })
		  .catch(() => {
			setLoading(false)
		  })
	}


	return(
	<div>
		Users
	</div>
	)
}