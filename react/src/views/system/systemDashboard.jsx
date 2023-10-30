import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import Header from "../../components/Header.jsx";



export default function SystemDashboard(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
		axiosClient.get('/systemDashboard/getUserCount')
		.then((response) => {
            console.log(response.data)
			setUsers(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);



    return(
        <div>
            <Header/>
            <div>{users.usercount}</div>
        </div>
    )
}