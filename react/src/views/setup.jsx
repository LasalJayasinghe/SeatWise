import { useEffect, useRef, useState} from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

export default function Setup() {

  const {user, setUser } = useStateContext();
  const [profile, setProfile] = useState({});

  const [isModalOpen, setModalOpen] = useState(false);
  // const [isOpeningModalOpen, setOpeningModalOpen] = useState(false);
  // const [selectedView, setSelectedView] = useState(null);

  const [errors, setErrors] = useState(null);
  const [otherData, setOtherData] = useState([]);

  const locationRef = useRef();   
  const addressRef = useRef();  
  const typeHallRef = useRef();   
  const typeTableRef = useRef();  
  const typeBothRef = useRef();
  const floorsRef = useRef();
  const openingRef = useRef();
  const closingRef = useRef();

  function handleAddReservationModalOpen() {
    setModalOpen(true);
  }

  function handleAddReservationModalClose() {
    setModalOpen(false);
  }

  // function handleAddOpeningModalOpen() {
  //   setOpeningModalOpen(true);
  // }

  // function handleAddOpeningModalClose() {
  //   setOpeningModalOpen(false);
  // }
  

    useEffect(() => {
      axiosClient.get('/user')
      .then(({data}) => {
          setUser(data)
          getProfile(data.id);
          fetchOtherData(data.id);
      })
      }, [])
  
      const getProfile = (restaurant_id) => {
          if (!restaurant_id) {
          console.error("Restaurant ID not available.");
          return;
          }
    
          const payload = {
          restaurant_id: restaurant_id,
          };
          
          axiosClient
          .get('/profile', { params: payload })
          .then(({ data }) => {
            setProfile(data);
            console.log("data:", data);
          })
          .catch((error) => {
              console.error("Error fetching views:", error);
          });
      };

      const fetchOtherData = (restaurant_id) => {
        axiosClient
        .get("/getsetupdata", { params: { restaurant_id } })
        .then(({ data }) => {
            // console.log("Fetched table data:", data);
            setOtherData(data);
        })
        .catch((error) => {
            console.error("Error fetching tables:", error);
        });
    };



      const onSubmitRservation= (ev) => {
        ev.preventDefault();

        const selectedType = document.querySelector('input[type="radio"]:checked')?.value || '';

        const payload = {
          restaurant_id: user.id,
          location: locationRef.current.value,
          address: addressRef.current.value,
          type: selectedType,
          floors: floorsRef.current.value,
          opening: openingRef.current.value,
          closing: closingRef.current.value,
        }
        // console.log(payload);
        setErrors(null)
        axiosClient.post('/setupprofile', payload)
        .then((response) => {
          console.log('API response:', response.data);
          handleAddReservationModalClose();
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            if(response.data.errors)
            {
              setErrors(response.data.errors)
            }else{
              setErrors({
                email: [response.data.message]
              })
            }
          }
          })
      }













  return (
    <>
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Restaurant profile</h1>
      </div>
    </header>
    <main>
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <div className="px-4 sm:px-0 flex">
      <h3 className="text-base font-semibold leading-7 text-gray-900 mr-12">Shows all the details of your restaurant</h3>
      <button onClick={() => handleAddReservationModalOpen()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Setup profile
        </button>
      {/* {otherData ? (
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Edit data
        </button>
      ) : (
        <button onClick={() => handleAddReservationModalOpen()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Setup profile
        </button>
      )} */}
    </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Restaurant name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile[0]?.restaurantname}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Business Adminstration no</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile[0]?.brn}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Business Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile[0]?.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Contact person's name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile[0]?.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone no</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profile[0]?.phone}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Add description</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Location</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{otherData[0]?.location}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{otherData[0]?.address}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Reservation details</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-300">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <div className="ml-0 flex flex-col gap-2">
                      <div className="ml-4 flex min-w-0 flex-1">
                        <span className="truncate font-medium mr-10 pr-20">Reservation type</span>
                        <div onClick={() => handleAddReservationModalOpen()} className="font-medium text-indigo-600 hover:text-indigo-500">
                          set
                        </div>
                      </div>
                      
                      <ul className="flex-shrink-0 text-gray-400 ml-4 pl-4">
                      {otherData[0]?.type === "Both" ? (
                        <ul>
                          <li>Hall</li>
                          <li>Table</li>
                        </ul>
                      ) : (
                        <ul>
                          <li>{otherData[0]?.type}</li>
                        </ul>
                      )}
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">No of floors allowing for reservation</span>
                      <ul className="flex-shrink-0 text-gray-400 ml-4 pl-4">
                          <li>{otherData[0]?.floors}</li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Restaurant openning</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-300">
                {/* <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"> */}
                  {/* <div className="flex w-0 flex-1 items-center"> */}
                    {/* <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> */}
                    {/* <div className="ml-0 flex flex-col gap-2">
                      <div className="ml-4 flex min-w-0 flex-1">
                        <span className="truncate font-medium mr-10 pr-20">Opening days</span>
                        <a className="font-medium text-indigo-600 hover:text-indigo-500">
                          set
                        </a>
                      </div>
                      
                      <ul className="flex-shrink-0 text-gray-400 ml-4 pl-4">
                        <li>Monday</li>
                        <li>Tuesday</li>
                        <li>Wednesday</li>
                        <li>Thursday</li>
                        <li>Friday</li>
                      </ul>
                    </div> */}
                  {/* </div> */}
                  {/* <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      set
                    </a>
                  </div> */}
                {/* </li> */}
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> */}
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Opening hours</span>
                      <span className="flex-shrink-0 text-gray-400">{otherData[0]?.opening} - {otherData[0]?.closing}</span>
                    </div>
                  </div>
                  {/* <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div> */}
                </li>
              </ul>
            </dd>
          </div>

        </dl>
      </div>
    </div>


              {/* Add view modal */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                      <h2>Popup Content for Add Resersation details</h2>
                      <h2 className="text-2xl font-bold">Reservation Details</h2>
                      <form onSubmit={onSubmitRservation} className="space-y-4" method="post">
                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Location</label>
                        <input ref={locationRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />

                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Address</label>
                        <input ref={addressRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />

                        <label className="block text-sm font-medium leading-6 text-gray-900 mt-0">Allowing Reservtaion:</label> 
                          <div className="flex items-center mb-4">
                            <input ref={typeHallRef} value="Hall" type="radio" className="h-4 w-4 mb-0 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                            <label htmlFor="html-radio" className="text-sm font-medium text-gray-900 ml-2 block mr-4">Hall</label>
                            <input ref={typeTableRef} value="Table" type="radio" className="h-4 w-4 mb-0 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                            <label htmlFor="html-radio" className="text-sm font-medium text-gray-900 ml-2 block mr-4">Table</label>
                            <input ref={typeBothRef} value="Both" type="radio" className="h-4 w-4 mb-0 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                            <label htmlFor="html-radio" className="text-sm font-medium text-gray-900 ml-2 block">Both</label>
                          </div>
      
                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">No of floors allowing for reservation(including ground floor)</label>
                        <input ref={floorsRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />
   
                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Opening hours</label>
                        <div className="px-4 sm:px-0 flex">
                          <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0 mr-[150px]">From</label><br />
                          <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">To</label>
                        </div>
                        <div className="px-4 sm:px-0 flex mt-2">
                        <input ref={openingRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-3" type="time" />
                        <input ref={closingRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="time" />
                        </div>

                        {/* Add more input fields as needed for other table data */}
                        <div className="flex space-x-4">
                        <button onClick={handleAddReservationModalClose} className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm">Cancel</button>
                          <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add details</button>
                        </div>
                      </form>
                      
                    </div>
                </div>
              )}

              
              
    </main>
    </>
  )
}
