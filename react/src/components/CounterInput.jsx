import React, { useState } from 'react';
import '../styles/counterInput.css';

export default function CounterInput() {
  const [count, setCount] = useState(1);

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div className="w-32 h-10 custom-number-input">
        <div className="relative flex flex-row w-full h-10 mt-1 bg-transparent rounded-lg">
          <button
            data-action="decrement"
            className="w-20 h-full text-gray-600 bg-gray-100 rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-200"
            onClick={decrement}
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <input
            type="number"
            className="w-20 h-full text-gray-600 bg-gray-100 border-white rounded-l cursor-pointer hover:text-gray-700 hover-bg-gray-200 md:text-base cursor-default"
            name="custom-input-number"
            value={count}
          ></input>
          <button
            data-action="increment"
            className="w-20 h-full text-gray-600 bg-gray-100 rounded-r cursor-pointer hover:text-gray-700 hover-bg-gray-200"
            onClick={increment}
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}
