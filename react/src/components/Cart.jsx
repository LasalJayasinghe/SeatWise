import React, { useState } from 'react';

const Cart = ({ isOpen, closeSlideOver, slideOverClasses }) => {
  return (
    <div className={isOpen ? 'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-96 shadow-xl transform translate-x-0 transition-transform ease-in-out duration-300' : 'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-96 shadow-xl transform translate-x-full transition-transform ease-in-out duration-300'}>
      {/* Cart content */}
      <div className={slideOverClasses}>
                <div className="p-4 border-r border-gray-200">
                <div className="flex justify-between mb-4">
                    <h2 className="text-2xl font-bold">Cart</h2>
                    <button className="text-gray-500" onClick={closeSlideOver}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    </button>
                </div>
                <div className='flex justify-center item-center'>
                    <h5 className='font-semibold text-gray-500'>Flower drums Restaurant</h5>
                </div>
                <div className='flex justify-center px-10 my-2 item-center'>
                    <p className='justify-center text-xs text-center text-gray-400'><span className='text-red-300'>IMPORTANT:</span> You are only allowed to order meals from the chosen restaurant!</p>
                    
                </div>
        <hr />
                <div className="py-4">
        <div className="flex mb-4">
        <div className="w-16 h-16 mr-4 bg-gray-300 rounded-lg">
  <img src="https://img.freepik.com/free-photo/crispy-mixed-pizza-with-olives-sausage_140725-3095.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais" alt="" className="object-cover w-full h-full" />
</div>

            <div className="flex-grow">
            <div className="font-semibold">Chicken Pizza</div> {/* Product name */}
            <div className="text-gray-500">Quantity: 2</div> {/* Product quantity */}
            <div className="font-semibold">LKR 4200.00</div> {/* Product price */}
            </div>
            <button className="ml-2 text-red-500">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <circle cx="12" cy="12" r="10" strokeWidth="0" fill="#FED7D7" /> {/* Change the fill color here */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12H18" />
            </svg>
            </button>
        </div>

        <div className="flex mb-4">
            <div className="w-16 h-16 mr-4 bg-gray-300 rounded-lg">
                <img src="https://img.freepik.com/free-photo/chocolate-lava-cake-white-plate_1150-6317.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=ais" alt="" />
                </div> {/* Product image */}
            <div className="flex-grow">
            <div className="font-semibold">Lava cake</div> {/* Product name */}
            <div className="text-gray-500">Quantity: 1</div> {/* Product quantity */}
            <div className="font-semibold">LKR 490.00</div> {/* Product price */}
            </div>
            <button className="ml-2 text-red-500">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <circle cx="12" cy="12" r="10" strokeWidth="0" fill="#FED7D7" /> {/* Change the fill color here */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12H18" />
            </svg>
            </button>
        </div>

        {/* add more meals */}
        <div  className='flex justify-center py-5 item-center'>
            <button className='flex justify-center px-4 py-2 font-semibold text-green-500 bg-green-100 rounded-3xl item-center hover:bg-green-400 hover:text-white'>Add more meals &nbsp;&nbsp;&nbsp;
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            </button>
        </div><br /><hr /><br /><br />

        {/* Cart total */}
        <div className="text-gray-500 mt-">
            <div className="text-gray-500 mt">
                <div className="flex items-center mb-6">
                <p className="mr-4 text-xs font-thin text-gray-400">
                    <span className="font-medium text-gray-600">Clear cart</span> to restart your entire restaurant experience
                </p>
                <button className='p-1 text-xs text-red-500 bg-red-100 rounded-full '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    </button>
                </div>
            </div>

            <span className="font-bold">Total:</span>
            <span className="ml-auto">LKR 4690.00</span>
            <p><span className="font-bold">Order Fee: LKR 1876.00</span><span className="ml-auto"> (40% off the total)</span></p>
        </div>
        
        </div>


                </div>

                <button className="p-4 text-white bg-green-500 hover:bg-green-600" onClick={closeSlideOver}>
                Conform Order - LKR 1552.00
                </button>
        </div>
    </div>
  );
};

export default Cart;
