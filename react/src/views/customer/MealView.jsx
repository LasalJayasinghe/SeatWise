import React from 'react'
import CounterInput from '../../components/CounterInput'

export default function MealView() {
  return (
    <div>
     
<section class="text-gray-700 body-font overflow-hidden bg-white">
  
  <div class="container px-5 py-8 mx-auto">
  <button class="flex items-center text-gray-500 hover:text-gray-700 mb-5">
  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
      <path d="M15 19l-7-7 7-7"></path>
    </svg>
  </div>
 
</button>


    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="meal image" class="lg:w-1/2 w-full object-cover object-center rounded-xl border border-gray-200" src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"/>
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">Pizza</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">Spinach Delight</h1>
        <div class="flex mb-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span class="text-gray-600 ml-3">4 Reviews</span>
          </span>

        </div>
        <p class="leading-relaxed">Introducing our mouthwatering Spinach Delight Pizza! This delectable creation combines the savory goodness of pizza with the wholesome flavors of fresh spinach.
         Our handcrafted pizza crust is generously topped with a luscious blend of creamy ricotta and mozzarella cheeses, creating a rich and creamy base. But the star of the show is the vibrant, 
         tender spinach leaves, lightly sautéed to perfection and scattered generously across the pizza.</p>
        <div class="flex mt-6 items-center pb-5  mb-5">
         
          <div class="flex">


<CounterInput/>


          </div>
          <div class="flex ml-6 items-center">
            <span class="mr-3">Size</span>
            <div class="relative">
              <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-green-500 text-base pl-3 pr-10">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                
              </select>
              <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
          
        </div>
        <p className='font-semibold'>Special instructons</p>
        <textarea class="resize-y rounded-md w-full mt-4 mb-10 focus:border-green-500 " placeholder="Add note"></textarea>
        <div class="flex items-center border-t border-gray-300 pt-4">
          <span class="title-font font-medium text-4xl text-gray-900"> LKR 3200.00</span>
          
          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 flex ml-auto items-center justify-center text-gray-500 ml-4">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
      <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
          </button>
          <label className='items-center justify-center ml-2'>Add this</label>
          <button class="flex ml-auto font-semibold text-white bg-green-500 border-0 py-3 px-4 focus:outline-none hover:bg-green-600 rounded-lg">Conform order</button>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
