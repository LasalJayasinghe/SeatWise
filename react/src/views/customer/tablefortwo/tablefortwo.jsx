import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import Sidebar from "../../../components/Sidebar.jsx";
import TFTcard from "../../../components/tablefortwo/peopleCard.jsx";

export default function TableForTwo() {
  const [userData, setUserData] = useState([]);
  const [invitesData , setInviteData] = useState([]);

  // useEffect(() => {
  //   // Replace 'apiEndpoint' with the actual URL where your Laravel backend is hosted
  //   axiosClient.get('tablefortwo/userdata')
  //     .then((response) => {
  //       // After setting userID, make the second GET request
  //       return axiosClient.get('tablefortwo/requests/' + response.data.id);
  //     })
  //     .then((response) => {
  //       // Handle the response data from the getRequest here
  //       console.log('Response from getRequest:', response.data);
  //       setUserData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   // Replace 'apiEndpoint' with the actual URL where your Laravel backend is hosted
  //   axiosClient.get('tablefortwo/userdata')
  //     .then((response) => {
  //       // After setting userID, make the second GET request
  //       return axiosClient.get('tablefortwo/invitations/' + response.data.id);
  //     })
  //     .then((response) => {
  //       // Handle the response data from the getRequest here
  //       console.log('Response from getRequest:', response.data);
  //       setInviteData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   // Replace 'apiEndpoint' with the actual URL where your Laravel backend is hosted
  //   axiosClient.get('tablefortwo/userdata')
  //     .then((response) => {
  //       // After setting userID, make the second GET request
  //       return axiosClient.get('tablefortwo/acceptedInvites/' + response.data.id);
  //     })
  //     .then((response) => {
  //       // Handle the response data from the getRequest here
  //       console.log('Response from getRequest:', response.data);
  //       setInviteData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    // Replace 'apiEndpoint' with the actual URL where your Laravel backend is hosted
    axiosClient.get('tablefortwo/userdata')
      .then((response) => {
        // After setting userID, make the second GET request
        return axiosClient.get('tablefortwo/getHistory/' + response.data.id);
      })
      .then((response) => {
        // Handle the response data from the getRequest here
        // console.log('Response from getRequest:', response.data);
        setInviteData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div>
      <div className="users-container">
        <Sidebar />
        <div className="content-container">
          <p className="text-zinc-900 text-3xl font-semibold leading-normal">People</p>
          <p className="text-gray-500 text-base font-normal leading-normal">Discover people to share your dining table with</p>

{/* 
<p> all requests</p>
          <div className="grid grid-cols-3 gap-4">
          {userData.map((user) => (
              <div key={user.id}>
                <TFTcard user={user} />
              </div>
            ))}
            </div> */}

            <p> Invitaions </p>

            
          <div className="grid grid-cols-3 gap-4">
          {invitesData.map((user) => (
              <div key={user.id}>
                <TFTcard user={user} />
              </div>
            ))}
            </div> 
      </div>
    </div>
  </div>
  );
}
