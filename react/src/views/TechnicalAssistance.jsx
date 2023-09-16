
import { useRef, useState } from "react";
import Logo from "../assets/logo.svg";
import axiosClient from "../axios-client";
import SideBar from "../components/SideBar";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import SettingsBar from "../components/SettingsBar";
// import { Navigate } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';

export default function TechnicalAssistance() {
 
  const [errors, setErrors] = useState(null);
  const {user,token,setUser, setToken} = useStateContext();
  const [message, setMessage] = useState('');
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);


  
    const [selectedPriority, setSelectedPriority] = useState('low'); // Default priority is 'low'
    // ... other state and ref declarations ...
  
    // Function to handle radio button click and update the selected priority
    const handlePriorityChange = (event) => {
      setSelectedPriority(event.target.value);
    };
  
    const restaurantnameRef = useRef()
    const brnRef = useRef()
    const emailRef = useRef()
    const nameRef = useRef()
    const phoneRef = useRef()
     const issueRef = useRef();
    // const navigate = useNavigate();
    // const history = useHistory();

    
    const onSubmit = (ev) => {
      ev.preventDefault()
       
     

      const payLoad = {
        id: user.id,
          restaurantname: restaurantnameRef.current.value,
          brn: brnRef.current.value,
          email: emailRef.current.value,
          name: nameRef.current.value,
          phone: phoneRef.current.value,
          issue: issueRef.current.value,
          priority: selectedPriority, 

      }
      axiosClient.post('/addTechincalAssistanceRequest', payLoad)
          .then(({data}) => {
              //setUser(data.user);
              //setToken(data.token);
              setMessage(data.message); 

              // <Navigate to="/restaurant" />
              // history.push('/restaurant');
          })
          .catch(err => {
              const response = err.response;
              if(response && response.status == 422) {
                  setErrors(response.data.errors);
              }
          })
  } 

    return (
      <div className="flex">
      {/* Sidebar */}
      <div className="menuContainer" style={{ position: 'fixed', top:"62px",left: '0', width: '235px', height: '100%' }}>
        <SettingsBar />
      </div>
      <div className="flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h1 className="mt-10 text-center text-4xl font-bold leading-12 tracking-tight text-gray-900">
           Request Assistance 
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
           Request Technical Assistance for your restaurant.
          </p>
        </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={onSubmit}
          className="space-y-1"
          action="#"
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
        <div className="grid grid-cols-2 gap-2">

          <div>
            <label
              htmlFor="restaurantname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Restaurant Name
            </label>
            <div className="mt-1">
              <input
                ref={restaurantnameRef}
                id="restaurantname"
                name="restaurantname"
                type="text"
                required
                defaultValue={user.restaurantname}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="brn"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Business Registration No
            </label>
            <div className="mt-1">
              <input
                ref={brnRef}
                id="brn"
                name="brn"
                type="text"
                defaultValue={user.brn}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          </div>

          <div className="my-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>




          <div className="grid grid-cols-2 gap-2">

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Contact Person Name
            </label>
            <div className="mt-1">
              <input
                ref={nameRef}
                id="name"
                name="name"
                type="text"
                defaultValue={user.name}
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
            <div className="mt-1">
              <input
                ref={phoneRef}
                id="phone"
                name="phone"
                type="text"
                defaultValue={user.phone}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

        
        

      

          </div>
          <div>
  <label
    htmlFor="priority"
    className="block text-sm font-medium leading-6 text-gray-900"
  >
    Priority
  </label>
  <div className="mt-2 flex items-center space-x-4">
  <label className="inline-flex items-center">
            <input
              type="radio"
              id="lowPriority"
              name="priority"
              value="low"
              checked={selectedPriority === 'low'} // Check if 'low' is selected
              onChange={handlePriorityChange} // Call the function when a radio button is clicked
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">Low</span>
          </label>
          <label className="inline-flex items-center">
    <input
      type="radio"
      id="mediumPriority"
      name="priority"
      value="medium"
      checked={selectedPriority === 'medium'}
      onChange={handlePriorityChange}
      className="form-radio h-4 w-4 text-indigo-600"
    />
    <span className="ml-2">Medium</span>
  </label>
  <label className="inline-flex items-center">
    <input
      type="radio"
      id="highPriority"
      name="priority"
      value="high"
      checked={selectedPriority === 'high'}
      onChange={handlePriorityChange}
      className="form-radio h-4 w-4 text-indigo-600"
    />
    <span className="ml-2">High</span>
  </label>
  <label className="inline-flex items-center">
    <input
      type="radio"
      id="criticalPriority"
      name="priority"
      value="critical"
      checked={selectedPriority === 'critical'}
      onChange={handlePriorityChange}
      className="form-radio h-4 w-4 text-indigo-600"
    />
    <span className="ml-2">Critical</span>
  </label>
  </div>
</div>
          <div className="my-4">
            <label
              htmlFor="issue"
              className="block text-sm font-medium leading-6 text-gray-900"
            >Describe your issue 
            </label>
            <div className="mt-1">
            <textarea
      ref={issueRef}
      id="issue"
      name="issue"
      rows="2" // You can adjust the number of rows as needed
      required
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    ></textarea>
            </div>
          </div>
          <br></br>     
         
<br></br>



      <br/>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            > Request
            </button>
          </div>
        </form>

        <br /> 


      </div>
    </div>
    </div>
    </div>
    );
}