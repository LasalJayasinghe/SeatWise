import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Cards from '../components/Cards';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.png';
import slide4 from '../assets/slide4.png';
import axiosClient from '../axios-client';

export default function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosClient.get('/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
     
      <div className='bg-white'>
        <Header />

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

        <div className="flex flex-wrap justify-center items-center mt-10 ">
        <input type="text" className="w-full md:w-auto mb-2 md:mb-0 md:mr-5 p-2 rounded-lg focus:border-gray-400" placeholder="Input 1" />
        <input type="date" className="w-full md:w-auto mb-2 md:mb-0 md:mr-5 p-2 rounded-lg focus:border-gray-400" placeholder="Input 2" />
        <input type="text" className="w-full md:w-auto mb-2 md:mb-0 md:mr-5 p-2 rounded-lg focus:border-gray-400" placeholder="Input 3" />
        <input type="text" className="w-full md:w-auto mb-2 md:mb-0 md:mr-5 p-2 rounded-lg focus:border-gray-400" placeholder="Input 4" />
        <button type="submit" className="w-full md:w-auto p-3 bg-zinc-900 rounded-lg shadow justify-center items-center gap-2 flex text-white">Search</button>
      </div>

        <div className='m-6'>
          <Cards />
          <Cards />
        </div>

        <div className="restaurant-cards">
          {restaurants.map((restaurant) => (
            // Add a unique key prop to the mapped elements
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <div className="restaurant-card">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


