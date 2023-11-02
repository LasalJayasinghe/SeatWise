import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Cart = ({ isOpen, closeSlideOver, cartItems, removeCartItem, restaurantName, clearCart, selectedRestaurantId, totalAmount }) => {
    const discountRate = 0.4; // 40% discount rate
    const discountedAmount = totalAmount * discountRate;
    if (!cartItems) {
    return (
      <div
        className={
          isOpen
            ? 'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-96 shadow-xl transform translate-x-0 transition-transform ease-in-out duration-300'
            : 'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-96 shadow-xl transform translate-x-full transition-transform ease-in-out duration-300'
        }
      >
        {/* Cart content */}
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
          <div className="flex justify-center item-center">
            <h5 className="font-semibold text-gray-500">{restaurantName}</h5>
          </div>
          
          <hr />
          <div className="py-4">
          <div className='flex justify-center px-10 my-2 item-center'>
                    <p className='justify-center text-xs text-center text-gray-400'><span className='text-red-300'>IMPORTANT:</span> You are only allowed to order meals from the chosen restaurant!</p>
                    
                </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        isOpen
          ? 'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-96 shadow-xl transform translate-x-0 transition-transform ease-in-out duration-300'
          : 'fixed inset-y-0 right-0 z-50 flex flex-col bg-white w-96 shadow-xl transform translate-x-full transition-transform ease-in-out duration-300'
      }
    >
      {/* Cart content */}
      <div className="p-4 border-r border-gray-200">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button className="text-gray-500" onClick={closeSlideOver}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="nonenone"
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
        <div className="flex justify-center item-center">
          <h5 className="font-semibold text-gray-500">{restaurantName}</h5>
        </div>
        <div className='flex justify-center px-10 my-2 item-center'>
                    <p className='justify-center text-xs text-center text-gray-400'><span className='text-red-300'>IMPORTANT:</span> You are only allowed to order meals from the chosen restaurant!</p>
                    
                </div>
        <hr />
        <div className="py-4">
        {cartItems.map((item, index) => (
  <div key={index} className="flex mb-4">
    {/* Product image */}
    <div className="w-16 h-16 mr-4 bg-gray-300 rounded-lg"></div>
    <div className="flex-grow">
      <div className="font-semibold">{item.name}</div> {/* Product name */}
      <div className="text-gray-500">Size: {item.size}</div>
      <div className="text-gray-500">Quantity: {item.count}</div>
        <div className="font-semibold">Price: LKR {item.price}.00</div>
    </div>
    <button className="ml-2 text-red-500" onClick={() => removeCartItem(index)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-5"
        fill="nonenone"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle cx="12" cy="12" r="10" strokeWidth="0" fill="#FED7D7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12H18" />
      </svg>
    </button>
  </div>
))}

        </div>

      <div  className='flex justify-center py-5 item-center'>
      <Link to={`/restaurants/${selectedRestaurantId}/meals`}>
            <button className='flex justify-center px-4 py-2 font-semibold text-green-500 bg-green-100 rounded-3xl item-center hover:bg-green-400 hover:text-white'>Add more meals &nbsp;&nbsp;&nbsp;
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            </button>
            </Link>

        </div><br /><hr />

        <div className="text-gray-500 mt-">
            <div className="text-gray-500 mt">
                <div className="flex items-center mb-6">
                <p className="mr-4 text-xs font-thin text-gray-400">
                    <span className="font-medium text-gray-600">Clear cart</span> to restart your entire restaurant experience
                </p>
                <button className='p-1 text-xs text-red-500 bg-red-100 rounded-full ' onClick={clearCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    </button>
                </div>
            </div>
            </div>
            <p><span className="font-semibold">Total Amount:</span><span className="ml-auto"> LKR {totalAmount}.00</span></p>
            <p><span className="font-semibold">Amount to pay: LKR {discountedAmount.toFixed(2)}</span> <span className="ml-auto"><br/>(40% of the total should be paid to pre order meals)</span></p>
<br />
<button className="p-4 font-semibold text-white bg-green-500 hover:bg-green-600"  onClick={closeSlideOver}>
  Confirm Order - Pay LKR {discountedAmount.toFixed(2)}
</button>

      </div>
    </div>
  );
};

export default Cart;