import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import CounterInput from '../../components/CounterInput';
import Cart from '../../components/Cart';
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '../../components/cartStorage';
import ReservationSuccessPopup from '../../components/ReservationSuccessPopup';


export default function MealView() {
  
  const navigate = useNavigate()
  const [meal, setMeal] = useState(null);
  const { mealId } = useParams();
  const [selectedSize, setSelectedSize] = useState('Small');
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);

  
  const handleClose = () => {
    navigate(-1); 
  };

  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    if (savedCart.length > 0) {
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    const fetchMealDetail = async () => {
      try {
        const response = await axiosClient.get(`/meals/${mealId}`);
        setMeal(response.data);
        setPrice(response.data.price);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMealDetail();
  }, [mealId]);

  useEffect(() => {
    const newTotalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    setTotalAmount(newTotalAmount);
  }, [cartItems]);
  

  const handleSizeChange = (event) => {
  const selected = event.target.value;
  setSelectedSize(selected);

  // Convert meal.price to a floating-point number
  const mealPrice = parseFloat(meal.price);

  // Calculate the new price based on the selected size
  if (selected === 'Medium') {
    setPrice(mealPrice + 500.0); 
  } else if (selected === 'Large') {
    setPrice(mealPrice + 1000.0); 
  } else {
    setPrice(mealPrice); // Default price 
  }
};

const handleCountChange = (newCount) => {
  setCount(newCount);
};

const handleAddToCart = () => {
  const selectedMeal = {
    name: meal.name,
    size: selectedSize,
    price: price,
    count: count,
    instructions: instructions,
  };
  console.log("Selected Meal Data:", selectedMeal);
  setCartItems([...cartItems, selectedMeal]);
  saveCartToLocalStorage([...cartItems, selectedMeal]);

  setIsCartOpen(true);
};

const removeCartItem = (index) => {
  const updatedCart = [...cartItems];
  updatedCart.splice(index, 1);
  setCartItems(updatedCart);
};

const handleInstructionsChange = (event) => {
  setInstructions(event.target.value);
};
const clearCart = () => {
  setCartItems([]);
};
const handleConfirmOrder = () => {
  // handle the confirmation of the order and show the success popup.
  setIsSuccessPopupVisible(true);
};

  if (!meal) {
    return <div>Loading...</div>;
  }
  return (
    <div>

     
<section className="text-gray-700 body-font overflow-hidden bg-white">
  
  <div className="container px-5 py-8 mx-auto">
  <button 
  className="flex items-center text-gray-500 hover:text-gray-700 mb-5"
  onClick={handleClose}>
  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
      <path d="M15 19l-7-7 7-7"></path>
    </svg>
  </div>
 
</button>


    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="meal image" className="lg:w-1/2 w-full object-cover object-center rounded-xl border border-gray-200" src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{meal.category.category}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{meal.name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>

        </div>
        <p className="leading-relaxed">{meal.description}</p>
        <div className="flex mt-6 items-center pb-5  mb-5">
         
          <div className="flex">


          <div className="flex">
        <CounterInput count={count} onCountChange={handleCountChange} />
      </div>

          </div>
          <div class="flex ml-6 items-center">
        <span className="mr-3">Size</span>
        <div className="relative">
          <select
            className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-green-500 text-base pl-3 pr-10"
            value={selectedSize}
            onChange={handleSizeChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </div>
      </div>
          
        </div>
        <p className='font-semibold'>Special instructons</p>
        <textarea
  className="resize-y rounded-md w-full mt-4 mb-10 focus:border-green-500"
  placeholder="Add note"
  value={instructions}
  onChange={handleInstructionsChange}
/>
        <div className="flex items-center border-t border-gray-300 pt-4">
        <span className="title-font font-medium text-4xl text-gray-900"> LKR {price}.00</span>
          
        <button
  className="flex ml-auto font-semibold text-white bg-green-500 border-0 py-3 px-4 focus:outline-none hover:bg-green-600 rounded-lg"
  onClick={handleAddToCart} 
>
  Add meal &nbsp;&nbsp;&nbsp;
  <svg
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    className="w-5 h-5"
    viewBox="0 0 24 24"
  >
    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
  </svg>
</button>

        </div>
      </div>
    </div>
  </div>
</section>
   {/* Render the Cart component */}
   <Cart
        isOpen={isCartOpen}
        closeSlideOver={() => setIsCartOpen(false)}
        cartItems={cartItems}
        slideOverClasses="/*  */"
        removeCartItem={removeCartItem}
        restaurantName={meal.restaurant.restaurantname}
        selectedRestaurantId={meal.restaurant.id}
        clearCart={clearCart}
        totalAmount={totalAmount}
        onConfirmOrder={handleConfirmOrder}

      />
    {isSuccessPopupVisible && (
        <ReservationSuccessPopup
          onClose={() => setIsSuccessPopupVisible(false)}
          onHomeClick={() => {
            navigate('/dashboard'); 
            setIsSuccessPopupVisible(false);
          }}
          onActivitiesClick={() => {
            navigate('/activities');
            setIsSuccessPopupVisible(false);
          }}
        />
      )}
    </div>
  );
}