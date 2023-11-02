import { useRef, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect} from "react";
import Logo from "../../assets/logo.svg";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import SettingsBar from "../../components/restaurant/SettingsBar";
// import React, { useEffect } from 'react';

// import { Navigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';

export default function AddOffer() {
  const navigate = useNavigate(); // Get the navigate function

  const [message, setMessage] = useState('');
  const [menu, setMenu] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('');

 /* const handleAddCashier = async () => {
    try {
      const response = await fetch('/addCashier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers (e.g., authentication token)
        },
        body: JSON.stringify({
          // Add your cashier data here
        }),
      });

      const data = await response.json();
      setMessage(data.message); // Set the message from the response

      // Perform any additional actions based on the response, e.g., redirect or show a success message.
    } catch (error) {
      console.error('Error adding cashier:', error);
    }
  };
  //const [users,setUsers] = useState([]);
	//const[loading,setLoading] = useState(false);
/*
	useEffect(() => {
		getUsers()
	},[])

	const getUsers = () => {
		setLoading(true)
		axiosClient.get('/users')
		  .then(({ data }) => {
			setLoading(false)
			setUsers(data.data)
		  })
		  .catch(() => {
			setLoading(false)
		  })
	}*/


	const MealRef =useRef();
    const OfferTypeRef = useRef()
    //const nameRef = useRef()
    const OfferTitleRef = useRef()
    const OfferPercentageRef = useRef()
    const OfferDescriptionRef = useRef()
    const StartDateRef = useRef()
    const EndDateRef = useRef()
    const DaysRef = useRef()
    const MinAmountRef = useRef()
    const [errors, setErrors] = useState(null);
   // const {setUser, setToken} = useStateContext();
    // const navigate = useNavigate();
    // const history = useHistory();

     const [successMessage, setSuccessMessage] = useState('');

    const {user} = useStateContext();
    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
   
    

    useEffect(() => {
      //setLoading(true);
      if (user && user.id) {
        axiosClient.get(`/getMenu/${user.id}`)
          .then(({ data }) => {
            setMenu(data);
            ///setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }
  }, [user]);
    const onSubmit = (ev) => {
      ev.preventDefault()

      const payLoad = {
        restaurant_id: user.id,
        meal: MealRef.current.value,
        offer_type: OfferTypeRef.current.value,
        offer_title  : OfferTitleRef.current.value, 
        offer_percentage:OfferPercentageRef.current.value, 
        offer_description :OfferDescriptionRef.current.value, 
        start_date,
        end_date,
        days_of_week:DaysRef.current.value,
        minimum_purchase_amount:MinAmountRef.current.value, 
         
      }

      axiosClient.post('/addOffer', payLoad)
          .then(({data}) => {
            //console.log(data);
           setMessage(data.message)
           console.log(data.message); 
            // Set the message from the response 
            //history.push('/Employees'); // 
            //navigate('/Employees'); 
            setTimeout(() => {
              navigate('/Employees');
            }, 2000);

             
          })
          .catch(err => {
              const response = err.response;
              if(response && response.status == 422) {
                  setErrors(response.data.errors);
              }
          }) 
  } 

    return (
      
<<<<<<< HEAD
        <>
        <div className="ordercontainer">
<div className="menuContainer">
    <SettingsBar />
</div>
<div className="contentContainer">
    <div>
        <header className="bg-white shadow">
            <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Offers</h1>
                <div className="loading-container">
                    {/* {loading && <p className="loading-text">Loading...</p>} */}
                </div>
            </div>
        </header>
    </div>
    <div className="flex mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div className="flex-1 flex-col justify-center px-6 py-12 lg:px-8">
       
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-1 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
=======
        <div className="flex">
        {/* Sidebar */}
        <div className="menuContainer" style={{ position: 'fixed', top:"62px",left: '0', width: '235px', height: '100%' }}>
          <SettingsBar />
        </div>
        <div className="flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
>>>>>>> parent of 5203f37 (Merge branch 'systemadmin')
           Add Offers
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Please add offers given for meals
          </p>
        </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={onSubmit}
          className="space-y-1"
          action='#'
          method="POST"
        >
{message && (
  <div className={`p-2 ${message.includes('Successfully') ? 'bg-green-500 text-white-300' : 'bg-red-200 text-white-800'}`}>
    {message}
  </div>
)}


            {errors && (
              <div className="alert">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
       

          <div>
            <label
              htmlFor="meal"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Meal selection
            </label>
            <div className="mt-1">
            <select
          ref={MealRef}
          id="meal"
          name="meal"
          autoComplete="meal"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={selectedMeal}
          onChange={(e) => setSelectedMeal(e.target.value)}
        >
          <option value="">Select a meal</option>
          {menu.map((mealOption) => (
            <option key={mealOption.id} value={mealOption.name}>
              {mealOption.name}
            </option>
          ))}
        </select>
            </div>
          </div>

        

          <div className="my-4">
            <label
              htmlFor="OfferType"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Offer type
            </label>
            <div className="mt-2">
              <select
                ref={OfferTypeRef}
                id="OfferType"
                name="OfferType"
                type="text"
                  required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                
                  <option value="">Select offer type</option>
                  <option value="Discount">Discount</option>
                  <option value="BOGO">Buy One Get One</option>
                  <option value="Combo Deal">Combo Deal</option>
                  <option value="Fixed Price">Fixed Price</option>
                  <option value="First-Time Customer Discount">First-Time Customer Discount</option>
                  <option value="Event Special">Event Special</option>
                  <option value="Birthday Special">Birthday Special</option>
                  <option value="Anniversary Special">Anniversary Special</option>
                </select>
            </div>
          </div>

     
          <div>
            <label
              htmlFor="OfferTitle"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Offer title
            </label>
            <div className="mt-2">
              <input
                ref={OfferTitleRef}
                id="OfferTitle"
                name="OfferTitle"
                type="text"
                
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

         
     
    <div>
		<label htmlFor='OfferPercentage' className="block text-sm font-medium leading-6 text-gray-900">
				Offer percentage
        </label>
				<div className="mt-2">
                 <input
                ref={OfferPercentageRef}
                id="OfferPercentage"
                name="OfferPercentage"
                type="OfferPercentage"
                  required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
	


	</div>
  
  
  <div className="grid grid-cols-2 gap-2">

    <div>
		<label htmlFor='StartDate' className="block text-sm font-medium leading-6 text-gray-900">
				Start Date
        </label>
				<div className="mt-1">
        <DatePicker
      ref={StartDateRef}
      id="start_date"
      name="start_date"
     
      required
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      selected={start_date} // Pass the selected date here
      onChange={start_date=> setStartDate(start_date)} // Handle date selection
    />
            </div>
		


	</div>


  <div>
		<label htmlFor='EndDate' className="block text-sm font-medium leading-6 text-gray-900">
				End Date
        </label>
				<div className="mt-1">
        <DatePicker
      ref={EndDateRef}
      id="end_date"
      name="end_date"
      
      required
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      selected={end_date} // Pass the selected date here
      onChange={end_date=> setEndDate(end_date)} // Handle date selection
    />
            </div>
			


	</div>
</div>
    <div>
		<label htmlFor='Days' className="block text-sm font-medium leading-6 text-gray-900">
				Days of the week
        </label>
				<div className="mt-2">
                 <select
                ref={DaysRef}
                id="Days"
                name="Days"
                type="text"
               
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select Days of week</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Weekends">Weekends</option>
                <option value="Everyday">veryday</option>
                </select>
            </div>
		


	</div>

    <div>
		<label htmlFor='MinAmount' className="block text-sm font-medium leading-6 text-gray-900">
				Minimum purchase amount
        </label>
				<div className="mt-2">
                 <input
                ref={MinAmountRef}
                id="MinAmount"
                name="MinAmount"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
			


	</div>

  <div>
		<label htmlFor='OfferDescription' className="block text-sm font-medium leading-6 text-gray-900">
				Offer description
        </label>
				<div className="mt-2">
                 <textarea
                ref={OfferDescriptionRef}
                id="OfferDescription"
                name="OfferDescription"
                type="text"
                rows="2"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
		


	</div>
  <br></br>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            > Add offer
            </button>
          </div>
        </form>

        <br />

        </div>
    </div> 
      </div>
      

    </div>

    
    
</div>


        </>
    );
}
