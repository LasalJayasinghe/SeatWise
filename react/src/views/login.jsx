import {Link} from "react-router-dom";
import Logo from "../assets/logo.svg";
import {useState, useRef} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Login(){

	const emailRef = useRef();
	const passwordRef = useRef();
	const {setUser, setToken} = useStateContext()
	const [errors, setErrors] = useState(null)

	const onSubmit = (ev) => {
		ev.preventDefault()
		const payload = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		  }
		  setErrors(null)
		  axiosClient.post('/login', payload)
			.then(({data}) => {
			  setUser(data.user)
			  setToken(data.token);
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

	return(
	<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
	<div className="sm:mx-auto sm:w-full sm:max-w-sm">
	  <img
		className="mx-auto h-15 w-auto"
		src={Logo}
		alt="Your Company"
	  />
	  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
		Sign in to your account
	  </h2>
	  <p className="mt-2 text-center text-sm text-gray-600 max-w">
		Welcome back! Please login to your account.
	  </p>
	</div>

	<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
	  <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
		<div>
						  {errors &&
		<div className="alert">
		  {Object.keys(errors).map(key => (
			<p key={key}>{errors[key][0]}</p>
		  ))}
		</div>
	  }
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
			  required
			  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		  </div>
		</div>

		<div>
		  <div className="flex items-center justify-between">
			<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
			  Password
			</label>
			<div className="text-sm">
			  <a href="#" className="font-semibold text-green-600 hover:text-indigo-500">
				Forgot password?
			  </a>
			</div>
		  </div>
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
		</div>

		<div>
		  <button
			type="submit"
			className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		  >
			Sign in
		  </button>
		</div>
	  </form>
	<button type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
		<svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
		Sign in with Google
	</button>

	  <p className="mt-10 text-center text-sm text-gray-500">
		Don't have an account?{' '}
		<a href="/signup" className="font-semibold leading-6 text-green-600 hover:text-indigo-500">
		  Sign Up
		</a>
	  </p>
	</div>
  </div>

)
}