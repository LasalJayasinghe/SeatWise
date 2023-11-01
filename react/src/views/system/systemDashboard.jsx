import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import Header from "../../components/Header.jsx";
import { BsFillPersonFill } from 'react-icons/bs';
import { Line } from 'react-chartjs-2';
import {Chart as chartjs} from 'chart.js/auto'

// import { MdRestaurant } from 'react-icons/md';



export default function SystemDashboard(){
    const [usercount, setUsercount] = useState([]);
    const [restaurantcount, setRestaurantcount] = useState([]);
    const [ratecount, setRatecount] = useState([]);
    const [averagestarcount, setAveragestarcount] = useState([]);

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


    
    useEffect(() => {
		axiosClient.get('/systemDashboard/getRateCount')
		.then((response) => {
            console.log(response.data)
			setRatecount(response.data);
            setAveragestarcount(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);


    const [chartData, setChartData] = useState({
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Profit',
            data: [1000, 1500, 1200, 2000],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      });
      
      const[chartOptions,setChartOptions] = useState({
        scales: {
          y: {
            beginAtZero: true,
          },
        },

        
      });
      



    return(
        <div class="overflow-x-hidden" style={{ overflowY: 'auto' }}>
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
                            {usercount.user_count}+
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
                            {restaurantcount.restaurant_count}+
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
                            {averagestarcount.avg_starCount}+
                        </div>

                        <div class="h-1/3 font-inter font-light text-base">
                            Ratings {ratecount.rate_count}
                        </div>
                    </div>
                </div>

            </div>

            <div class="bg-red-600  container mr-3/4 flex justify-center mt-20 ">

               <div class="bg-white h-[400px] w-[700px] mr-4 p-5 flex items-center"> 
                    <Line data={chartData} options={chartOptions} />
                </div>

                <div class="bg-green-500 h-[300px] w-1/4 p-5 flex items-center ml-4"> 
                    hello
                </div>
                
            </div>


        </div>
    )
}