import React from 'react'
import '../styles/counterInput.css'
export default function CounterInput() {

    function decrement(e) {
        const btn = e.target.parentNode.parentElement.querySelector(
          'button[data-action="decrement"]'
        );
        const target = btn.nextElementSibling;
        let value = Number(target.value);
        value--;
        target.value = value;
      }
    
      function increment(e) {
        const btn = e.target.parentNode.parentElement.querySelector(
          'button[data-action="decrement"]'
        );
        const target = btn.nextElementSibling;
        let value = Number(target.value);
        value++;
        target.value = value;
      }
    
      const decrementButtons = document.querySelectorAll(
        `button[data-action="decrement"]`
      );
    
      const incrementButtons = document.querySelectorAll(
        `button[data-action="increment"]`
      );
    
      decrementButtons.forEach(btn => {
        btn.addEventListener("click", decrement);
      });
    
      incrementButtons.forEach(btn => {
        btn.addEventListener("click", increment);
      });
  return (
    <div>
      <div className="w-32 h-10 custom-number-input">
  
  <div className="relative flex flex-row w-full h-10 mt-1 bg-transparent rounded-lg">
    <button data-action="decrement" className="w-20 h-full text-gray-600 bg-gray-100 rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-200">
      <span className="m-auto text-2xl font-thin">−</span>
    </button>
    <input type="number" className="w-20 h-full text-gray-600 bg-gray-100 border-white rounded-l cursor-pointer hover:text-gray-700 hover:bg-gray-200 md:text-basecursor-default" name="custom-input-number" value="0"></input>
  <button data-action="increment" className="w-20 h-full text-gray-600 bg-gray-100 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-200">
    <span className="m-auto text-2xl font-thin">+</span>
  </button>
</div>
    </div>
    </div>
  )
}
