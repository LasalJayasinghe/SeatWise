import { useEffect, useRef, useState } from "react";
import SettingsBar from "../../components/restaurant/SettingsBar";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddAdvertisement() {
    const navigate = useNavigate();

    const [selectedPrice, setSelectedPrice] = useState(0);
    const [selectedDuration, setSelectedDuration] = useState('');

    const {user, setUser } = useStateContext();
    const [errors, setErrors] = useState(null);

    const photoRef = useRef();

    const onSubmitAdd = (ev) => {
        ev.preventDefault()
    
        const formData = new FormData();
        formData.append('restaurant_id', user.id);
        formData.append('price', selectedPrice);
        formData.append('photo', photoRef.current.files[0]);
        formData.append('duration', selectedDuration);
        setErrors(null)
        axiosClient.post('/addAdvertisement', formData)
        .then((response) => {
          console.log('API response:', response.data);
          navigate('/adds');
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

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
    })
    }, [])

    




  return (
    <>
    <div className="main">
        

        <div className="ordercontainer">
            <div className="menuContainer">
                <SettingsBar />
            </div>
            <div className="contentContainer">
                <div>
                    <header className="bg-white shadow">
                        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Advertisement</h1>
                            <div className="loading-container">
                                {/* {loading && <p className="loading-text">Loading...</p>} */}
                            </div>
                        </div>
                    </header>
                </div>
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    
                    {/* Advertisement content start */}

                        <div className='px-32'>
                            <h1 className='text-2xl font-bold '>Add banner</h1>
                            <p className='text-gray-500'>Description goes here</p>

                            <form onSubmit={onSubmitAdd} method="post">

                            <div className="w-full mt-10 ">
                                <label
                                    className="flex justify-center w-full h-48 px-4 transition bg-gray-100 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                    <span className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <span className="font-medium text-gray-600">
                                            Drop image to Attach, or
                                            <span className="text-green-500 underline"> browse</span>
                                        </span>
                                    </span>
                                    <input ref={photoRef} type="file" name="file_upload" className="hidden"/>
                                </label>

                                <p className='mt-5 mb-10 ext-gray-500 m'><span className='font-semibold'>Important:</span> Your advertisement banner size should be 1440 x 543 px for a better view</p>
                            </div>


                            <h1 className='mb-10 text-xl font-bold '>Choose duration</h1>

                            <button onClick={() => {
                                        setSelectedPrice(199);
                                        setSelectedDuration('1 day');
                                        }} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-5 overflow-hidden  rounded-lg group bg-gradient-to-br from-[#49D28B] to-[#3EB075]  group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 ">
                            <div className="relative px-10 py-10 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                <div className="text-sm font-medium text-gray-00">1 day</div>
                                <div className="text-2xl font-medium text-gray-900">LKR 199/-</div>
                            </div>
                            </button>


                            <button onClick={() => {
                                        setSelectedPrice(599);
                                        setSelectedDuration('1 week');}} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-5 overflow-hidden  rounded-lg group bg-gradient-to-br from-[#49D28B] to-[#3EB075]  group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 ">
                            <div className="relative px-10 py-10 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                <div className="text-sm font-medium text-gray-00">1 week</div>
                                <div className="text-2xl font-medium text-gray-900">LKR 599/-</div>
                            </div>
                            </button>

                            <button onClick={() => {
                                        setSelectedPrice(1499);
                                        setSelectedDuration('1 month');}} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-5 overflow-hidden  rounded-lg group bg-gradient-to-br from-[#49D28B] to-[#3EB075]  group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 ">
                            <div className="relative px-10 py-10 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                <div className="text-sm font-medium text-gray-00">1 month</div>
                                <div className="text-2xl font-medium text-gray-900">LKR 1499/-</div>
                            </div>
                            </button>

                            <button onClick={() => {
                                        setSelectedPrice(2699);
                                        setSelectedDuration('3 months');}} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-5 overflow-hidden  rounded-lg group bg-gradient-to-br from-[#49D28B] to-[#3EB075]  group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 ">
                            <div className="relative px-10 py-10 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                <div className="text-sm font-medium text-gray-00">3 months</div>
                                <div className="text-2xl font-medium text-gray-900">LKR 2699/-</div>
                            </div>
                            </button>  



                                        


                            <div className="flex flex-col items-center justify-between mt-20 lg:flex-row">
                                <div className="mb-2 text-3xl lg:text-3xl lg:mr-4 lg:mb-0">Total fee: LKR {selectedPrice}/- </div>
                                <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">Publish banner</button>
                            </div>

                        </form>

                        </div>

                        

                    {/* Advertisement content end */}
        
                </div>

                
                
            </div>
        </div>
        {/* <Footer /> */}
    </div>    
    </>
  )
}
