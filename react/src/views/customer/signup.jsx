import {Link} from "react-router-dom";
import {createRef, useState, useEffect, map} from "react";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Logo from "../../assets/logo.svg";

export default function Signup() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    // Fetch categories data when the component mounts
    axiosClient.get("/getAllCategories").then(({ data }) => {
      if (Array.isArray(data)) {
        // Set the categories in the state
        setCategories(data);
      }
    });
  }, []);
  
  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      // If it's selected, remove it
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
      ref.current.classList.remove("bg-green-100", "border-green-300");
    } else {
      // If it's not selected, add it
      setSelectedOptions([...selectedOptions, option]);
      ref.current.classList.add("bg-green-100", "border-green-300");
    }
  };
  


  const firstnameRef = createRef()
  const dessertRef = createRef();
  const bakeryRef = createRef();
  const snackRef = createRef();
  const mealPreferences = createRef();
  // Add more refs for other meal preferences as needed
  
  const lastnameRef = createRef()
  const hometownRef = createRef()
  const dobRef = createRef()
  // const genderRef = useRef()
  const photoRef = createRef()
  const aboutRef = createRef()
  const mealRef = createRef()
  const cuisineRef = createRef()
  const beverageRef = createRef()
  const restaurantRef = createRef()
  const whoareyouRef = createRef()
  const personalityRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      mealPreferences: selectedOptions,  
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      hometown: hometownRef.current.value,
      dob: dobRef.current.value,
      about: aboutRef.current.value,
      // photo: photoRef.current.value,
      // gender: genderRef.current.value, 
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
    
  }

  return (
    <div className="p-12 mx-20 ">
      <form onSubmit={onSubmit}>
      {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }

      <div className="mb-20 sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="h-auto mx-auto w-15"
          src={Logo}
          alt="Your Company"
        />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
          Sign up to Seatwise
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600 max-w">
          Hello there! Enter details to get started.
        </p>
      </div>

      <div className="space-y-12">
   

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 ">Personal </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  ref={firstnameRef}
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  ref={lastnameRef}
                  type="text"
                  name="lastname"
                  id="lastname"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="hometown" className="block text-sm font-medium leading-6 text-gray-900">
                Hometown
              </label>
              <div className="mt-2">
                <input
                  ref={hometownRef}
                  type="text"
                  name="hometown"
                  id="hometown"
                  autoComplete="hometown"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            <div className="sm:col-span-3">
              <label htmlFor="birth-date" className="block text-sm font-medium leading-6 text-gray-900">
                Birth date
              </label>
              <div className="mt-2">
                <input
                  ref={dobRef}
                  type="date"
                  name="birth-date"
                  id="birth-date"
                  autoComplete="birth-date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            <div className="col-span-full">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender
              </label>


              <div className="flex mt-2 gap-x-6">
                <div className="flex items-center gap-x-3">
                  <input
                  // ref={genderRef}
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    value="M"
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Male
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                  // ref={genderRef}
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    value="F"
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Female
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                  // ref={genderRef}
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    value="O"
                    className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    Other
                  </label>
                </div>
              </div>

            </div>


            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="flex items-center mt-2 gap-x-3">
                <UserCircleIcon className="w-12 h-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                ref={aboutRef}
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

          </div>
        </div>

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 ">Preferences</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what else you want to hear about.
          </p>


          {/* Meal Preferences */}
          <div className="mt-5 col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Meal preferences
            </label>
          </div>   
          <div>
            <div className="flex">
              {categories.map((data) => (
                <div key={data.id} className="mr-2">
                  <button
                    className={`p-2 px-5 rounded-full ${
                      selectedOptions.includes(data.category)
                        ? "bg-green-100 border-green-300"
                        : "bg-gray-100 border-gray-300"
                    }`}
                    onClick={() => handleOptionClick(data.category)}
                  >
                    {data.category}
                  </button>
                </div>
              ))}
            </div>
          </div>



      {/* Cuisine Preferences */}
            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Cuisine preferences
              </label>

              <div className="mt-2">
              <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("English") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("English")}
          >
            English
          </button>
          <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Sri Lankan") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Sri Lankan")}
          >
            Sri Lankan
          </button>
          
          <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Indian") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Indian")}
          >
            Indian
          </button>
          <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Italian") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Italian")}
          >
            Italian
          </button>
          <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Chinese") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Chinese")}
          >
            Chinese
          </button>              
        </div>
              
            </div>
            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Beverage Preferences
              </label>

              <div className="mt-2">
              <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Cold") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Cold")}
          >
            Cold
          </button>              
          <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Hot") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Hot")}
          >
            Hot
          </button>
          <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Natural") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Natural")}
          >
            Natural
          </button>            
        </div>  
      </div>

            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Restaurant
              </label>

              <div className="mt-2">
              <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Luxury") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Luxury")}
          >
            Luxury
          </button>              
          <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Casual") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Casual")}
          >
            Casual
          </button>
          <button
            className={`p-2 px-5 mb-2 mr-2 rounded-full ${
              selectedOptions.includes("Fast") ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
            }`}
            onClick={() => handleOptionClick("Fast")}
          >
            Fast
          </button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Cafe</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Family</button>

              </div>
              
            </div>

            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Who are you?
              </label>

              <div className="mt-2">
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Student</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Researcher</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Employer</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Unemployed</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Local</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">Foreigner</button>
              

              </div>
              
            </div>

            <div className="mt-5 col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Personality
              </label>

              <div className="mt-2">
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">SJ</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">SP</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">NF</button>
              <button className="p-2 px-5 mb-2 mr-2 bg-gray-100 border-2 border-gray-300 rounded-full hover:bg-green-100 hover:border-green-300">NT</button>

              </div>  
            </div>
        </div>


        <div className="grid grid-cols-1 pb-12 mt-10 border-b border-gray-900/10 gap-x-6 gap-y-8 sm:grid-cols-6">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 ">Credentials</h2>
      
          <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  ref={passwordConfirmationRef}
                  type="password"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-6 gap-x-6">
        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        <button
          type="submit"
          className="px-3 py-2 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus-visible:outline-green-500"
        >
          Sign up
        </button>
      </div>
    </form>
    </div>
  )
}