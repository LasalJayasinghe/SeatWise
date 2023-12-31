import React , { useState, useEffect } from 'react'
import Sidebar2 from '../../../components/sidebar2'
import AddComplaint from '../../../components/AddComplaint'

export default function Complaints() {

  const [complaints, setComplaints] = useState([]);
  const [isAddComplaintVisible, setAddComplaintVisible] = useState(false);

    const toggleAddComplaint = () => {
      setAddComplaintVisible(!isAddComplaintVisible);
    };

    useEffect(() => {
      // Fetch complaints data from your API when the component mounts
      fetch('/api/complaints') // Replace with your actual API endpoint
        .then((response) => response.json())
        .then((data) => setComplaints(data))
        .catch((error) => console.error('Error fetching complaints:', error));
    }, []);

  return (
    <div>
      
      {/* {isAddComplaintVisible && (
        <AddComplaint open={isAddComplaintVisible} setOpen={setAddComplaintVisible} />
      )} */}
            {isAddComplaintVisible && (
        <AddComplaint open={isAddComplaintVisible} setOpen={setAddComplaintVisible} />
      )}
      {/* <AddComplaint/> */}
		  <div className="users-container">
        <Sidebar2 />
        <div className="content-container">
              <h1 className='text-2xl font-bold '>Complaints</h1>
              <p className='text-gray-500'>Description goed here</p>
              <div className="flex items-center my-5 space-x-2">
                <button
                  onClick={toggleAddComplaint}
                  className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-200 rounded-lg hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <span className="text-3xl">+</span>
                </button>
                <span className="font-bold text-gray-700">Add complaint</span>
              </div>

              <div>
                    
              <div
                class=" m-10 block rounded-2xl bg-[#F8F8F8] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                <h5
                    class="mb-2 text-xl font-bold leading-tight text-gray-700  ">
                    Unsatisfactory Table Reservation
                </h5>
                <p class="mb-4 text-base text-neutral-600 ">
                I am disappointed with the table booking system. Despite confirming my reservation, 
                my table was not available upon arrival, causing inconvenience. 
                Improve reliability and communication.
                </p>
                {/* <img
                    className="object-cover w-full h-full"
                    src={avatarImage}
                    alt="Avatar"
                /> */}
                <p className='font-bold text-blue-500'>Working on it</p>
              </div>


              <div
                class=" m-10 block rounded-2xl bg-[#F8F8F8] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                <h5
                    class="mb-2 text-xl font-bold leading-tight text-gray-700  ">
                    Unsatisfactory Table Reservation
                </h5>
                <p class="mb-4 text-base text-neutral-600 ">
                I am disappointed with the table booking system. Despite confirming my reservation, 
                my table was not available upon arrival, causing inconvenience. 
                Improve reliability and communication.
                </p>
                {/* <img
                    className="object-cover w-full h-full"
                    src={avatarImage}
                    alt="Avatar"
                /> */}
                <p className='font-bold text-green-500'>Resolved</p>
              </div>


              <div class=" m-10 block rounded-2xl bg-[#F8F8F8] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                <h5
                    class="mb-2 text-xl font-bold leading-tight text-gray-700  ">
                    Unsatisfactory Table Reservation
                </h5>
                <p class="mb-4 text-base text-neutral-600 ">
                I am disappointed with the table booking system. Despite confirming my reservation, 
                my table was not available upon arrival, causing inconvenience. 
                Improve reliability and communication.
                </p>
                {/* <img
                    className="object-cover w-full h-full"
                    src={avatarImage}
                    alt="Avatar"
                /> */}
                <p className='font-bold text-yellow-500'>Pending...</p>
            </div>
          </div>
			  </div>
		  </div>
		</div>
  )







  // return (
  //   <div>
  //     {isAddComplaintVisible && (
  //       <AddComplaint open={isAddComplaintVisible} setOpen={setAddComplaintVisible} />
  //     )}
  //     <div className="users-container">
  //       <Sidebar2 />
  //       <div className="content-container">
  //         <h1 className='text-2xl font-bold '>Complaints</h1>
  //         <p className='text-gray-500'>Description goes here</p>
  //         <div className="flex items-center my-5 space-x-2">
  //           <button
  //             onClick={toggleAddComplaint}
  //             className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-200 rounded-lg hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
  //           >
  //             <span className="text-3xl">+</span>
  //           </button>
  //           <span className="font-bold text-gray-700">Add complaint</span>
  //         </div>

  //         <div>
  //           {complaints.map((complaint) => (
  //             <div key={complaint.id} className="m-10 block rounded-2xl bg-[#F8F8F8] p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
  //               <h5 className="mb-2 text-xl font-bold leading-tight text-gray-700">
  //                 {complaint.title}
  //               </h5>
  //               <p className="mb-4 text-base text-neutral-600">
  //                 {complaint.description}
  //               </p>
  //               {/* <p className={`font-bold text-${complaint.status === 'Resolved' ? 'green' : complaint.status === 'Pending' ? 'yellow' : 'blue'}-500`}>
  //                 {complaint.status}
  //               </p> */}
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
