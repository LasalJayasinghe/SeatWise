import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import Header from "../components/Header.jsx";


export default function Users(){
	const [user, setUser] = useState(null); // Initialize user state
	const[loading,setLoading] = useState(false);

	useEffect(() => {
		getLoggedInUser();
	  }, []);
	
	  const getLoggedInUser = () => {
		axiosClient
		  .get("/user") // Replace with your API endpoint
		  .then(({ data }) => {
			setUser(data);
		  })
		  .catch(() => {
			setUser(null);
		  });
	  };


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