import { useRef, useState } from "react";
import Logo from "../assets/logo.svg";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
// import React, { useEffect } from 'react';

// import { Navigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';

export default function AddCashier() {
  const navigate = useNavigate(); // Get the navigate function

  const [message, setMessage] = useState('');

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

	const cashiernameRef =useRef();
    const emailRef = useRef()
    //const nameRef = useRef()
    const phoneRef = useRef()
    const passwordRef = useRef()
    const [errors, setErrors] = useState(null);
   // const {setUser, setToken} = useStateContext();
    // const navigate = useNavigate();
    // const history = useHistory();

     const [successMessage, setSuccessMessage] = useState('');

    const {user} = useStateContext();


    const onSubmit = (ev) => {
      ev.preventDefault()

      const payLoad = {
        restaurant_id: user.id,
        cashiername: cashiernameRef.current.value,
        email: emailRef.current.value,
        //name: nameRef.current.value,
        phone: phoneRef.current.value,
        password: passwordRef.current.value,
         
      }
      axiosClient.post('/addCashier', payLoad)
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-auto w-15" src={Logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Cashier Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Please add details of your cashier person
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
              htmlFor="cashiername"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Cashier Name
            </label>
            <div className="mt-1">
              <input
                ref={cashiernameRef}
                id="cashiername"
                name="cashiername"
                type="text"
                autoComplete="cashiername"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        

          <div className="my-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Email address
            </label>
            <div className="mt-2">
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

     
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Phone Number
            </label>
            <div className="mt-2">
              <input
                ref={phoneRef}
                id="phone"
                name="phone"
                type="text"
                autoComplete="phone"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

         
          <div>
		<label htmlFor='password' className="block text-sm font-medium leading-6 text-gray-900">
				Password 
				<div className="mt-2">
                 <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
			</label>


	</div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            > Add Cashier
            </button>
          </div>
        </form>

        <br />

      
      </div>
    </div>
    );
}
