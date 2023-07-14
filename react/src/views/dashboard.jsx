import React, { useState } from 'react';
import Header from '../components/Header';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Datepicker from "tailwind-datepicker-react"
import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.png';
import slide4 from '../assets/slide4.png';
import Example from '../components/Header';

export default function Dashboard() {
//   const DemoComponent = () => {
//     const [show, setShow] = useState(false);
//     const handleChange = (selectedDate) => {
//       console.log(selectedDate);
//     };
//     const handleClose = (state) => {
//       setShow(state);
//     };

//     return (
//       <div>
//         <div>
// 			<Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
// 		</div>
//       </div>
//     );
//   };

  return (
    <div className='bg-white'>
      <Example />

      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div>
          <img className="object-contain h-128" src={slide1} alt="Image 1" />
        </div>
        <div>
          <img src={slide2} alt="Image 2" />
        </div>
        <div>
          <img src={slide3} alt="Image 3" />
        </div>
        <div>
          <img src={slide4} alt="Image 4" />
        </div>
      </Carousel>

      <div className="flex flex-wrap justify-center items-center mt-10 mb-10">
        <input type="text" className="w-full md:w-auto mb-2 md:mb-0 md:mr-5 p-2 rounded-lg focus:border-gray-400" placeholder="Input 1" />
        <input type="date" className="w-full md:w-auto mb-2 md:mb-0 md:mr-5 p-2 rounded-lg focus:border-gray-400" placeholder="Input 2" />
        <input type="text" className="w-full md:w-auto mb-2 md:mb-0 md:mr-5 p-2 rounded-lg focus:border-gray-400" placeholder="Input 3" />
        <input type="text" className="w-full md:w-auto mb-2 md:mb-0 md:mr-5 p-2 rounded-lg focus:border-gray-400" placeholder="Input 4" />
        <button type="submit" className="w-full md:w-auto p-3 bg-zinc-900 rounded-lg shadow justify-center items-center gap-2 flex text-white">Search</button>
      </div>

	<div className='m-6 bg-slate-400'>
		Meals you may like
	</div>
	


    </div>
  );
}
