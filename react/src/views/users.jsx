import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import Header from "../components/Header.jsx";


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
		<Header/>
		<a   href="/login"  onClick={onLogout}   >
             Sign out
        </a>

		

		
	</div>
	)
}