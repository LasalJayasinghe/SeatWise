import { useEffect, useRef, useState} from 'react';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function Setup() {

  const {user, setUser } = useStateContext();
  const [profile, setProfile] = useState({});

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const [isOpeningModalOpen, setOpeningModalOpen] = useState(false);
  // const [selectedView, setSelectedView] = useState(null);

  const [errors, setErrors] = useState(null);
  const [otherData, setOtherData] = useState([]);

  const [loading, setLoading] = useState(false);

  


  const cityRef = useRef(); 
  const stateRef = useRef();  
  const zipRef = useRef();  
  const descriptionRef = useRef();
  const coverRef = useRef();  
  const typeHallRef = useRef();   
  const typeTableRef = useRef();  
  const typeBothRef = useRef();
  const floorsRef = useRef();
  const mondayRef = useRef();
  const tuesdayRef = useRef();
  const wednesdayRef = useRef();
  const thursdayRef = useRef();
  const fridayRef = useRef();
  const saturdayRef = useRef();
  const sundayRef = useRef();
  const openingRef = useRef();
  const closingRef = useRef();

  const restaurantnameRef = useRef();  
  const brnRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();

  function handleAddReservationModalOpen() {
    setModalOpen(true);
  }

  function handleAddReservationModalClose() {
    setModalOpen(false);
  }

  function handleEditModalOpen() {
    setEditModalOpen(true);
  }

  function handleEditModalClose() {
    setEditModalOpen(false);
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
          // onSubmitEdit(data.id);
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
          
          setLoading(true)
          axiosClient
          .get('/profile', { params: payload })
          .then(({ data }) => {
            setProfile(data);
            console.log("data:", data);
            setLoading(false)
          })
          .catch((error) => {
              console.error("Error fetching views:", error);
          });
      };

      const fetchOtherData = (restaurant_id) => {
        setLoading(true)
        axiosClient
        .get("/getsetupdata", { params: { restaurant_id } })
        .then(({ data }) => {
            // console.log("Fetched table data:", data);
            setOtherData(data);
            console.log("other data:", otherData);
            setLoading(false)
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
          city: cityRef.current.value,
          state: stateRef.current.value,
          zip: zipRef.current.value,
          description: descriptionRef.current.value,
          cover: coverRef.current.value,
          type: selectedType,
          floors: floorsRef.current.value,
          monday: mondayRef.current.checked,
          tuesday: tuesdayRef.current.checked,
          wednesday: wednesdayRef.current.checked,
          thursday: thursdayRef.current.checked,
          friday: fridayRef.current.checked,
          saturday: saturdayRef.current.checked,
          sunday: sundayRef.current.checked,
          opening: openingRef.current.value,
          closing: closingRef.current.value,
        }
        // console.log(payload);
        setErrors(null)
        setLoading(true)
        axiosClient.post('/setupprofile', payload)
        .then((response) => {
          console.log('API response:', response.data);
          handleAddReservationModalClose();
          setLoading(false);
          getProfile();
          fetchOtherData();
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


      // const [selectedType, setSelectedType] = useState(otherData[0]?.type || newType);
      
      const onSubmitEdit = (ev) => {
        ev.preventDefault();
        console.log("extract", user.id);
        const selectedType = document.querySelector('input[type="radio"]:checked')?.value || '';

        const payload = {
          restaurant_id: user.id,
          restaurantname: restaurantnameRef.current.value,
          brn: brnRef.current.value,
          email: emailRef.current.value,
          name: nameRef.current.value,
          phone: phoneRef.current.value,
          city: cityRef.current.value,
          state: stateRef.current.value,
          zip: zipRef.current.value,
          description: descriptionRef.current.value,
          cover: coverRef.current.value,
          type: selectedType,
          floors: floorsRef.current.value,
          opening: openingRef.current.value,
          closing: closingRef.current.value,
        }
        // console.log(payload);
        setErrors(null)
        axiosClient.post('/updateprofile', payload)
        .then((response) => {
          console.log('API response:', response.data);
          handleEditModalClose();
          window.location.reload();
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
      {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Restaurant profile</h1>
        {loading &&
            <p>Loading...</p>    
        }
      </div> */}
        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Restaurant profile</h1>
          <div className="loading-container">
            {loading && <p className="loading-text">Loading...</p>}
          </div>
        </div>
    </header>

    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 rounded-lg" >
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-0 py-0 sm:px-6 lg:px-8 mt-0">
          <img src="/src/assets/slide2.png" alt="" />
        </div>
      </div>
    </div>
    {/* <div className="flex justify-center mt-100">
      <img
        src="/src/assets/slide2.png"
        alt=""
        className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
        style={{ marginTop: "400px" }}
      />
    </div> */}

    


    <main>
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    <div className="px-4 sm:px-0 flex">
      <h3 className="text-base font-semibold leading-7 text-gray-900 mr-12">Shows all the details of your restaurant</h3>
      {/* <button onClick={() => handleAddReservationModalOpen()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Setup profile
        </button> */}
      {otherData.length > 0  ? (
        <button onClick={() => handleEditModalOpen()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Edit data
        </button>
      ) : (
        <button onClick={() => handleAddReservationModalOpen()} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Setup profile
        </button>
      )}
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
            
            {otherData.length > 0
              ? <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{otherData[0]?.description}</dd>
              : <dd className="mt-1 text-sm leading-6 text-red-500 sm:col-span-2 sm:mt-0">Set up the profile first</dd>
            }
  
          </div>
          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            {otherData.length > 0
              ? <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{otherData[0]?.location}</dd>
              : <dd className="mt-1 text-sm leading-6 text-red-500 sm:col-span-2 sm:mt-0">Set up the profile first</dd>
            }

          </div> */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            {otherData.length > 0
              ? <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{otherData[0]?.city}, {otherData[0]?.state}, {otherData[0]?.zip}</dd>
              : <dd className="mt-1 text-sm leading-6 text-red-500 sm:col-span-2 sm:mt-0">Set up the profile first</dd>
            } 
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
                        {/* <div onClick={() => handleAddReservationModalOpen()} className="font-medium text-indigo-600 hover:text-indigo-500">
                          set
                        </div> */}
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
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> */}
                    <div className="ml-0 flex flex-col gap-2">
                      <div className="ml-4 flex min-w-0 flex-1">
                        <span className="truncate font-medium mr-10 pr-20">Opening days</span>
                        {/* <a className="font-medium text-indigo-600 hover:text-indigo-500">
                          set
                        </a> */}
                      </div>
                      
                      <ul className="flex-shrink-0 text-gray-400 ml-4 pl-4">
                        <li>{otherData[0]?.monday == 1 ? "Monday" : null}</li>
                        <li>{otherData[0]?.tuesday == 1 ? "Thuesday" : null}</li>
                        <li>{otherData[0]?.wednesday == 1 ? "Wednesday" : null}</li>
                        <li>{otherData[0]?.thursday == 1 ? "Thursday" : null}</li>
                        <li>{otherData[0]?.friday == 1 ? "Friday" : null}</li>
                        <li>{otherData[0]?.saturday == 1 ? "Saturday" : null}</li>
                        <li>{otherData[0]?.sunday == 1 ? "Sunday" : null}</li>
                      </ul>
                    </div>
                  </div>
                  {/* <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      set
                    </a>
                  </div> */}
                </li>
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
                    <div className="bg-white p-8 z-10 mt-6 mb-5 sm:mx-auto sm:w-full sm:max-w-2xl rounded-lg" style={{ height: "700px" }}>
                      <h2>Popup Content for Add Resersation details</h2>
                      <h2 className="text-2xl font-bold">Reservation Details</h2>

                      {/* Scrollable Content */}
                      <div className="flex flex-col overflow-y-auto" style={{ maxHeight: "90%" }}>
                        <form onSubmit={onSubmitRservation} method="post">

                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                              </p>

                              <br />

                              <div className="border-b border-gray-900/10 pb-12">

                              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Add address</label>
                              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              
                              <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Street no, name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={cityRef}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                              <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  City
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={stateRef}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                              <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  State
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={zipRef}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                              </div>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  
                                <div className="col-span-full">
                                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                  </label>
                                  <div className="mt-2">
                                    <textarea
                                      id="about"
                                      name="about"
                                      ref={descriptionRef}
                                      rows={3}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      defaultValue={''}
                                    />
                                  </div>
                                  <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                </div>
                  
                                <div className="col-span-full">
                                  <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Photo
                                  </label>
                                  <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <button
                                      type="button"
                                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                      Change
                                    </button>
                                  </div>
                                </div>
                  
                                <div className="col-span-full">
                                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cover photo
                                  </label>
                                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                          htmlFor="file-upload"
                                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                          <span>Upload a file</span>
                                          <input ref={coverRef} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                      </div>
                                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br />

                            <fieldset>

                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              
                              <div className="sm:col-span-3">
                              <legend className="text-sm font-semibold leading-6 text-gray-900">Reservations allowing for</legend>
                              {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                              <div className="mt-6 flex items-center gap-x-6">
                                <div className="flex items-center gap-x-5">
                                  <input
                                    ref={typeHallRef} 
                                    value="Hall"
                                    id="push-everything"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"

                                  />
                                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                    Hall
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                  <input
                                    ref={typeTableRef} 
                                    value="Table"
                                    id="push-email"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"
                                  />
                                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Table
                                  </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                  <input
                                    ref={typeBothRef} 
                                    value="Both"
                                    id="push-nothing"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"
                                  />
                                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                    Both
                                  </label>
                                </div>
                              </div>
                              </div>
                              
                                <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    No of floors allowing for reservation(including ground floor)
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="first-name"
                                      id="first-name"
                                      ref={floorsRef} 
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                            </fieldset>

                            <br />

                           

                            <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Opening days</h2>
                            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Opening time
                                  </label>
                                  <div className="flex mt-2">
                                    <div className="relative flex gap-x-3">
                                      <div className="flex h-6 items-center">
                                        <input
                                          name="monday"
                                          type="checkbox"
                                          ref={mondayRef}
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-4"
                                          defaultChecked={false}
                                        />
                                      </div>
                                      <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900 mt-0 mr-5">
                                          Monday
                                        </label>
                                      </div>
                                    </div>

                                    <div className="relative flex gap-x-3">
                                      <div className="flex h-6 items-center">
                                        <input
                                          name="tuesday"
                                          type="checkbox"
                                          ref={tuesdayRef} 
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-4"
                                          defaultChecked={false}
                                        />
                                      </div>
                                      <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900 mt-0 mr-5">
                                          Tuesday
                                        </label>
                                      </div>
                                    </div>

                                    <div className="relative flex gap-x-3">
                                      <div className="flex h-6 items-center">
                                        <input
                                          name="wednesday"
                                          type="checkbox"
                                          ref={wednesdayRef} 
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-4"
                                          defaultChecked={false}
                                        />
                                      </div>
                                      <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900 mt-0 mr-5">
                                          Wednesday
                                        </label>
                                      </div>
                                    </div>

                                    <div className="relative flex gap-x-3">
                                      <div className="flex h-6 items-center">
                                        <input
                                          name="thursday"
                                          type="checkbox"
                                          ref={thursdayRef} 
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-4"
                                          defaultChecked={false}
                                        />
                                      </div>
                                      <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900 mt-0 mr-5">
                                          Thursday
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex mt-2">
                                    <div className="relative flex gap-x-3">
                                      <div className="flex h-6 items-center">
                                        <input
                                          name="friday"
                                          type="checkbox"
                                          ref={fridayRef}
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-4"
                                          defaultChecked={false}
                                        />
                                      </div>
                                      <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900 mt-0 mr-8">
                                          Friday
                                        </label>
                                      </div>
                                    </div>

                                    <div className="relative flex gap-x-3">
                                      <div className="flex h-6 items-center">
                                        <input
                                          name="saturday"
                                          type="checkbox"
                                          ref={saturdayRef} 
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-4"
                                          defaultChecked={false}
                                        />
                                      </div>
                                      <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900 mt-0 mr-4">
                                          Saturday
                                        </label>
                                      </div>
                                    </div>

                                    <div className="relative flex gap-x-3">
                                      <div className="flex h-6 items-center">
                                        <input
                                          name="sunday"
                                          type="checkbox"
                                          ref={sundayRef} 
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-4"
                                          defaultChecked={false}
                                        />
                                      </div>
                                      <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900 mt-0 mr-5">
                                          Sunday
                                        </label>
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                              <br />
                              <h2 className="text-base font-semibold leading-7 text-gray-900">Opening hours</h2>
                  
                              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Opening time
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="time"
                                      name="first-name"
                                      id="first-name"
                                      ref={openingRef} 
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Closing time
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="time"
                                      name="first-name"
                                      id="first-name"
                                      ref={closingRef}
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                              </div>

                              <div className="mt-6 sm:col-span-6 flex items-center justify-end gap-x-6">
                                <button onClick={handleAddReservationModalClose} className="rounded-md px-3 py-1.5 bg-white rounded-lg shadow border border border-gray-300 text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                <button type="submit" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add details</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                          
                        
                      </form>
                    </div>
                  </div>
                </div>




                // <div className="fixed inset-0 flex items-center justify-center z-50">
                //   <div className="absolute inset-0 bg-black opacity-50"></div>
                //     <div className="bg-white p-4 z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                //       <h2>Popup Content for Add Resersation details</h2>
                //       <h2 className="text-2xl font-bold">Reservation Details</h2>
                //       <form onSubmit={onSubmitRservation} className="space-y-4" method="post">
                //         <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Location</label>
                //         <input ref={locationRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />

                //         <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Address</label>
                //         <input ref={addressRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />

                //         <label className="block text-sm font-medium leading-6 text-gray-900 mt-0">Allowing Reservtaion:</label> 
                //           <div className="flex items-center mb-4">
                //             <input ref={typeHallRef} value="Hall" type="radio" className="h-4 w-4 mb-0 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                //             <label htmlFor="html-radio" className="text-sm font-medium text-gray-900 ml-2 block mr-4">Hall</label>
                //             <input ref={typeTableRef} value="Table" type="radio" className="h-4 w-4 mb-0 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                //             <label htmlFor="html-radio" className="text-sm font-medium text-gray-900 ml-2 block mr-4">Table</label>
                //             <input ref={typeBothRef} value="Both" type="radio" className="h-4 w-4 mb-0 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                //             <label htmlFor="html-radio" className="text-sm font-medium text-gray-900 ml-2 block">Both</label>
                //           </div>
      
                //         <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">No of floors allowing for reservation(including ground floor)</label>
                //         <input ref={floorsRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />
   
                //         <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Opening hours</label>
                //         <div className="px-4 sm:px-0 flex">
                //           <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0 mr-[150px]">From</label><br />
                //           <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">To</label>
                //         </div>
                //         <div className="px-4 sm:px-0 flex mt-2">
                //         <input ref={openingRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-3" type="time" />
                //         <input ref={closingRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="time" />
                //         </div>

                //         {/* Add more input fields as needed for other table data */}
                //         <div className="flex space-x-4">
                //         <button onClick={handleAddReservationModalClose} className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm">Cancel</button>
                //           <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add details</button>
                //         </div>
                //       </form>
                      
                //     </div>
                // </div>
              )}



              {isEditModalOpen && (
                
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 z-10 mt-6 mb-5 sm:mx-auto sm:w-full sm:max-w-2xl rounded-lg" style={{ height: "700px" }}>
                      <h2>Popup Content for Edit Restaurant details</h2>
                      <h2 className="text-2xl font-bold">Restaurant Details</h2>

                      {/* Scrollable Content */}
                      <div className="flex flex-col overflow-y-auto" style={{ maxHeight: "90%" }}>
                      <form onSubmit={onSubmitEdit} method="post">
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              This information will be displayed publicly so be careful what you share.
                            </p>

                            <br />

                            <div className="border-b border-gray-900/10 pb-12">
                            {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}
                  
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Restaurant name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={restaurantnameRef}
                                    defaultValue={user.restaurantname}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                  
                              <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Business Registration No 
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={brnRef}
                                    defaultValue={user.brn}
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                  
                              <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                  Business Email address
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="email"
                                    ref={emailRef}
                                    defaultValue={user.email}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Contact Person's name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={nameRef}
                                    defaultValue={user.name}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                  
                              <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Contact No 
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={phoneRef}
                                    defaultValue={user.phone}
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                  
                              {/* <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                  Country
                                </label>
                                <div className="mt-2">
                                  <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                  >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                  </select>
                                </div>
                              </div> */}

                              
                  
                              {/* <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                  Street address
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    defaultValue={otherData[0]?.address}
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div> */}
                  
                              {/* <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                  City
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div> */}
                  
                              {/* <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                  State / Province
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="region"
                                    id="region"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div> */}
                  
                              {/* <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                  ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    autoComplete="postal-code"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div> */}
                            </div>
                          </div>
                  
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              {/* <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                  Username
                                </label>
                                <div className="mt-2">
                                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                                    <input
                                      type="text"
                                      name="username"
                                      id="username"
                                      autoComplete="username"
                                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      placeholder="janesmith"
                                    />
                                  </div>
                                </div>
                              </div> */}

                                <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Street no, name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={cityRef}
                                    defaultValue={otherData[0]?.city}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                              <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  City
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={stateRef}
                                    defaultValue={otherData[0]?.state}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                              <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  State
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    ref={zipRef}
                                    defaultValue={otherData[0]?.zip}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                  
                              <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                  Description
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    rows={3}
                                    ref={descriptionRef}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={otherData[0]?.description}
                                  />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                              </div>
                  
                              <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                  Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                  <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                  <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                  >
                                    Change
                                  </button>
                                </div>
                              </div>
                  
                              <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                  Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                  <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                      <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                      >
                                        <span>Upload a file</span>
                                        <input ref={coverRef} type="file" className="sr-only" />
                                      </label>
                                      <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                          <fieldset>

                          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                              <legend className="text-sm font-semibold leading-6 text-gray-900">Reservations allowing for</legend>
                                {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                <div className="mt-6 flex items-center gap-x-6">
                                  <div className="flex items-center gap-x-5">
                                    <input
                                      type="radio"
                                      ref={typeHallRef}
                                      value="Hall"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"
                                      checked={otherData[0]?.type === "Hall"}
                                      // checked={selectedType === "Hall"}
                                      // onChange={() => setSelectedType("Hall")}
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                      Hall
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-x-3">
                                    <input
                                      type="radio"
                                      ref={typeTableRef}
                                      value="Table"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"
                                      checked={otherData[0]?.type === "Table"}
                                      // checked={selectedType === "Table"}
                                      // onChange={() => setSelectedType("Table")}
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                      Table
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-x-3">
                                    <input
                                      type="radio"
                                      ref={typeBothRef}
                                      value="Both"
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"
                                      checked={otherData[0]?.type === "Both"} 
                                      // onChange={() => setSelectedType("Both")}
                                    />
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                      Both
                                    </label>
                                  </div>
                                </div>

                              </div>

                              <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    No of floors allowing for reservation(including ground floor)
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      defaultValue={otherData[0]?.floors}
                                      ref={floorsRef} 
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                          </div>


                                
                              </fieldset>
                  
                          
                  
                          <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Opening hours</h2>
                            {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                              We'll always let you know about important changes, but you pick what else you want to hear about.
                            </p> */}


                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Opening time
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="time"
                                    ref={openingRef}
                                    defaultValue={otherData[0]?.opening} 
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                  Closing time
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="time"
                                    ref={closingRef}
                                    defaultValue={otherData[0]?.closing} 
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                              </div>
                            </div>

                            
                  
                            {/* <div className="mt-10 space-y-10">
                              <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                  <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label htmlFor="comments" className="font-medium text-gray-900">
                                        Comments
                                      </label>
                                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                    </div>
                                  </div>
                                  <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        id="candidates"
                                        name="candidates"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label htmlFor="candidates" className="font-medium text-gray-900">
                                        Candidates
                                      </label>
                                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                    </div>
                                  </div>
                                  <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        id="offers"
                                        name="offers"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label htmlFor="offers" className="font-medium text-gray-900">
                                        Offers
                                      </label>
                                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                              
                            </div> */}
                          </div>
                        </div>
                  
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button onClick={handleEditModalClose} type="button" className="rounded-md px-3 py-1.5 bg-white rounded-lg shadow border border border-gray-300 text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save
                          </button>
                        </div>
                      </form>

                      </div>
                      
                      
                    </div>
                </div>



                // <form onSubmit={onSubmitRservation} className="space-y-4" method="post">
                // <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Location</label>
                // <input ref={locationRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />

                // <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Address</label>
                // <input ref={addressRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />

                // <label className="block text-sm font-medium leading-6 text-gray-900 mt-0">Allowing Reservtaion:</label> 
                //   <div className="flex items-center mb-4">
                //     <input ref={typeHallRef} value="Hall" type="radio" className="h-4 w-4 mb-0 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                //     <label htmlFor="html-radio" className="text-sm font-medium text-gray-900 ml-2 block mr-4">Hall</label>
                //     <input ref={typeTableRef} value="Table" type="radio" className="h-4 w-4 mb-0 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                //     <label htmlFor="html-radio" className="text-sm font-medium text-gray-900 ml-2 block mr-4">Table</label>
                //     <input ref={typeBothRef} value="Both" type="radio" className="h-4 w-4 mb-0 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                //     <label htmlFor="html-radio" className="text-sm font-medium text-gray-900 ml-2 block">Both</label>
                //   </div>

                // <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">No of floors allowing for reservation(including ground floor)</label>
                // <input ref={floorsRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />

                // <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Opening hours</label>
                // <div className="px-4 sm:px-0 flex">
                //   <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0 mr-[150px]">From</label><br />
                //   <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">To</label>
                // </div>
                // <div className="px-4 sm:px-0 flex mt-2">
                // <input ref={openingRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-3" type="time" />
                // <input ref={closingRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="time" />
                // </div>

                // {/* Add more input fields as needed for other table data */}
                // <div className="flex space-x-4">
                // <button onClick={handleAddReservationModalClose} className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm">Cancel</button>
                //   <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add details</button>
                // </div>
                // </form>
              )}
           
    </main>
   
    </>
  )
}
