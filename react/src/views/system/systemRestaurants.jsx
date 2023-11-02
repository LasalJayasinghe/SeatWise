import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import Header from "../../components/SystemHeader.jsx";





export default function SystemRestaurants(){

    const [restaurantdetails, setrestaurantdetails] = useState([]);





    useEffect(() => {
		axiosClient.get('/systemDashboard/getAllRestaurants')
		.then((response) => {
            console.log(response.data)
			setrestaurantdetails(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);








    return(
        <div className="overflow-x-hidden" style={{ overflowY: 'auto' }}>
            <Header/>
        <hr className="border-t border-gray-300 my-4" />

            
            <div className="container mx-auto flex justify-center mt-20">

                <div>

                <table className="table-auto border-collapse w-full">
                    <thead>
                        <tr>
                          <th className="border px-4 py-2">Restaurant Name</th>
                          <th className="border px-4 py-2">BRN</th>
                          <th className="border px-4 py-2">Name</th>
                          <th className="border px-4 py-2">Email</th>
                          <th className="border px-4 py-2">Phone</th>
                          <th className="border px-4 py-2">Email Verified</th>
                        </tr>
                     </thead>
                    <tbody>
                            {restaurantdetails.map((restaurant) => (
                        <tr
                              key={restaurant.id}
                                  className={`${
                                      restaurant.email_verified_at ? 'bg-green-100' : 'bg-red-100'
                                  }`}
          >
                                <td className="border px-4 py-2">{restaurant.restaurantname}</td>
                                 <td className="border px-4 py-2">{restaurant.brn}</td>
                                 <td className="border px-4 py-2">{restaurant.name}</td>
                                 <td className="border px-4 py-2">{restaurant.email}</td>
                               <td className="border px-4 py-2">{restaurant.phone}</td>
                                <td className="border px-4 py-2">
                                    {restaurant.email_verified_at || 'Not Verified'}
                               </td>
                             </tr>
                              ))}
                    </tbody>
                </table>


                </div>


            </div>

        </div>
    )
}