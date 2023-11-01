import '../../util/system-chart.css';
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import Header from "../../components/SystemHeader.jsx";
import { BsFillPersonFill } from 'react-icons/bs';
import { Line } from 'react-chartjs-2';
import {Chart as chartjs} from 'chart.js/auto'


// import { MdRestaurant } from 'react-icons/md';



export default function SystemDashboard(){
    const [usercount, setUsercount] = useState([]);
    const [restaurantcount, setRestaurantcount] = useState([]);
    const [ratecount, setRatecount] = useState([]);
    const [averagestarcount, setAveragestarcount] = useState([]);
    const [weeklyProfitData,setWeeklyProfitData] = useState([]);

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


    // useEffect(() => {
	// 	axiosClient.get('/systemDashboard/getWeeklyProfit')
	// 	.then((response) => {
    //         console.log(response.data)
			
	// 	})
	// 	.catch((error) => {
	// 		console.error('Error fetching data:', error);
	// 	});
	// }, []);





    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Profit',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true
          },
        ],
      });


      useEffect(() => {
        // Check if weeklyProfitData has data
        if (weeklyProfitData && weeklyProfitData.length > 0) {
            // Extract labels (week numbers) and profits
            const labels = weeklyProfitData.map((weekProfit) => `Week ${weekProfit.week}`);
            const profits = weeklyProfitData.map((weekProfit) => weekProfit.total_profit);
    
            // Update the chartData state with the new data
            setChartData({
                labels: labels,
                datasets: [
                    {
                        ...chartData.datasets[0], // Keep other dataset properties
                        data: profits,
                    },
                ],
            });
        }
    }, [weeklyProfitData]);





      
      const[chartOptions,setChartOptions] = useState({

        

        elements: {
            line: {
              cubicInterpolationMode: 'monotone', // 'default', 'monotone'
            },
          },


        scales: {

         x: {

            ticks: {
                color: 'black', // Set the color of the tick labels to black
              },

         },
         
         y: {
            beginAtZero: true,

            ticks: {
                color: 'black', // Set the color of the tick labels to black
              },
          },

        },

        
      });
      



    return(
        <div>
        <div className="overflow-x-hidden" style={{ overflowY: 'auto' }}>
            <Header/>
            <hr className="border-t border-gray-300 my-4" />
            {/*<div>{usercount.user_count}</div>
            <div>{restaurantcount.restaurant_count}</div>*/}

            <div className="container mx-auto flex justify-center mt-20">
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

            <div className="container mr-3 flex justify-center mt-20 ">

               <div className=" bg-white h-[300px] w-[600px] mr-3 p-5 flex justify-center items-center border border-solid border-gray-500 transition-transform transform hover:scale-105"> 
                    
                    <Line data={chartData} options={chartOptions} />
                    
                </div>

                <div className="h-[300px] w-[600px]  p-5 flex items-center ml-4"> 
                     map
                </div>
                
            </div>


        </div>
        </div>
    )
}