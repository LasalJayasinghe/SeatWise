import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import Header from "../../components/Header.jsx";
import { BsFillPersonFill } from 'react-icons/bs';
// import { MdRestaurant } from 'react-icons/md';



export default function SystemDashboard(){
    const [usercount, setUsercount] = useState([]);
    const [restaurantcount, setRestaurantcount] = useState([]);

    useEffect(() => {
		axiosClient.get('/systemDashboard/getUserCount')
		.then((response) => {
            console.log(response.data)
			setUsercount(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);

    useEffect(() => {
		axiosClient.get('/systemDashboard/getRestaurantCount')
		.then((response) => {
            console.log(response.data)
			setRestaurantcount(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);



    return(
        <div class="overflow-x-hidden">
            <Header/>
            <hr class="border-t border-gray-300 my-4" />
            {/*<div>{usercount.user_count}</div>
            <div>{restaurantcount.restaurant_count}</div>*/}

            <div class="container mx-auto flex justify-center mt-20">
                <div class="w-1/5  p-2 h-24 mr-12 flex flex-row border-r border-gray-400">

                    <div class=" w-1/3 flex items-center justify-center">
                        <div class="p-2 rounded-full bg-green-100">
                            <BsFillPersonFill className="text-2xl text-green-500"/>
                        </div>
                    </div>
                    <div class="flex flex-col w-2/3">
                        <div class=" font-inter font-semibold text-2xl p-2 h-2/3">
                            {usercount.user_count}
                        </div>

                        <div class=" h-1/3 font-inter font-light text-base">
                            Customers
                        </div>
                    </div>

                </div>
                <div class="w-1/5 p-2 h-24 mr-12 flex flex-row border-r border-gray-400">

                <div class=" w-1/3 flex items-center justify-center">
                    <div class="p-2 rounded-full bg-green-100">
                            <BsFillPersonFill className="text-2xl text-green-500"/>
                        </div>
                    </div>
                    <div class="flex flex-col w-2/3">
                        <div class=" font-inter font-semibold text-2xl p-2 h-2/3">
                            {restaurantcount.restaurant_count}
                        </div>

                        <div class=" h-1/3 font-inter font-light text-base">
                            Restaurants
                        </div>
                    </div>
                </div>

                <div class="w-1/5  p-2 h-24 mr-12 flex flex-row">

                <div class=" w-1/3 flex items-center justify-center">
                <div class="p-2 rounded-full bg-green-100">
                            <BsFillPersonFill className="text-2xl text-green-500"/>
                        </div>
                    </div>
                    <div class="flex flex-col w-2/3">
                        <div class=" font-inter font-semibold text-2xl p-2 h-2/3">
                            top
                        </div>

                        <div class="h-1/3 font-inter font-light text-base">
                            bottom
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}