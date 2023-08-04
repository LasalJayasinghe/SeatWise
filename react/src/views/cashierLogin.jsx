import { useRef, useState } from "react";
import Logo from "../assets/logo.svg";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function CashierLogin() {

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
		axiosClient.post('/cashierlogin', payload)
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


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
		<div className="sm:mx-auto sm:w-full sm:max-w-sm">
		<img
			className="mx-auto h-auto w-15"
			src={Logo}
			alt="Your Company"
		/>
		<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Log In As a Cashier
		</h2>
		<p className="mt-2 text-center text-sm text-gray-600 max-w">
			Welcome back! Please login to your account.
		</p>
		</div>

		<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form onSubmit={onSubmit} className="space-y-6" action="{{ route('cashier.login') }}" method="POST">
			<div>
                {errors && <div className="alert">
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
				<button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					Sign in
				</button>
			</div>
		</form>

		<br/>

		
		</div>
	</div>
  )
}
