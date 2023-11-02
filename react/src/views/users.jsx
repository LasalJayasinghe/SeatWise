import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import Header from "../components/Header.jsx";


export default function Users(){
	const [user, setUserData] = useState(null); // Initialize user state
	useEffect(() => {
		axiosClient.get('tablefortwo/userdata')
		.then((response) => {
			return axiosClient.get('/userRecommendations/' + response.data.id);
		})
		.then((response) => {
			setUserData(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);
	
	useEffect(() => {
		console.log("Data:", user);
	}, [user]); // This will trigger when 'user' changes
	
	return(
	<div>
				heelow

	</div>
	)
}