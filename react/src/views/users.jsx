import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import Header from "../components/Header.jsx";


export default function Users(){
	const [user, setUser] = useState(null); // Initialize user state
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


	const onLogout = ev => {
		ev.preventDefault()
	  
		axiosClient.post('/logout')
		.then(() => {
			setUser({})
			setToken(null)
		})
	  }
	return(
	<div>
		<a   href="/login"  onClick={onLogout}   >
             Sign out
        </a>		
	</div>
	)
}