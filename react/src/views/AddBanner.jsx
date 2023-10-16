import React from 'react';





export default function AddBanner() {


    
    
  return (
    <div className='px-32'>
      <h1 className='text-2xl font-bold '>Add banner</h1>
        <p className='text-gray-500'>Description goes here</p>

        <div className="w-full mt-10 ">
            <label
                className="flex justify-center w-full h-48 px-4 transition bg-gray-100 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">
                        Drop image to Attach, or
                        <span className="text-green-500 underline"> browse</span>
                    </span>
                </span>
                <input type="file" name="file_upload" className="hidden"/>
            </label>

            <p className='mt-5 mb-10 ext-gray-500 m'><span className='font-semibold'>Important:</span> Your advertisement banner size should be 1440 x 543 px for a better view</p>
        </div>


        <h1 className='mb-10 text-xl font-bold '>Choose duration</h1>

        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-5 overflow-hidden  rounded-lg group bg-gradient-to-br from-[#49D28B] to-[#3EB075]  group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 ">
        <div class="relative px-10 py-10 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            <div className="text-sm font-medium text-gray-00">1 day</div>
            <div className="text-2xl font-medium text-gray-900">LKR 199/-</div>
        </div>
        </button>


        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-5 overflow-hidden  rounded-lg group bg-gradient-to-br from-[#49D28B] to-[#3EB075]  group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 ">
        <div class="relative px-10 py-10 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            <div className="text-sm font-medium text-gray-00">1 week</div>
            <div className="text-2xl font-medium text-gray-900">LKR 599/-</div>
        </div>
        </button>

        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-5 overflow-hidden  rounded-lg group bg-gradient-to-br from-[#49D28B] to-[#3EB075]  group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 ">
        <div class="relative px-10 py-10 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            <div className="text-sm font-medium text-gray-00">1 month</div>
            <div className="text-2xl font-medium text-gray-900">LKR 1499/-</div>
        </div>
        </button>

        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-5 overflow-hidden  rounded-lg group bg-gradient-to-br from-[#49D28B] to-[#3EB075]  group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 ">
        <div class="relative px-10 py-10 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            <div className="text-sm font-medium text-gray-00">3 months</div>
            <div className="text-2xl font-medium text-gray-900">LKR 2699/-</div>
        </div>
        </button>  



        <div> 
        {/* <h1 className='my-10 text-xl font-bold '>Boost banner <span className="font-medium text-gray-400">(optional)</span></h1>
        <p>How frequent your banner should be displayed</p> */}
        </div>            


    <div className="flex flex-col items-center justify-between mt-20 lg:flex-row">
    <div className="mb-2 text-3xl lg:text-3xl lg:mr-4 lg:mb-0">Total fee: LKR 2100/-</div>
    <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">Publish banner</button>
    </div>


    </div>
  )
}


