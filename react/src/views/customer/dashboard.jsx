import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axiosClient from '../../axios-client';
import StarRatings from 'react-rating-stars-component';

import slide1 from '../../assets/slide1.png';
import slide2 from '../../assets/slide2.png';
import slide3 from '../../assets/slide3.png';
import slide4 from '../../assets/slide4.png';

export default function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchAllMeals = async () => {
      try {
        const allMealsResponse = await axiosClient.get('/all-meals');
        setMeals(allMealsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllMeals();
  }, []);

  function getOpenDays(profile) {
    const days = [];
    if (profile && profile.monday === 1) days.push('Mon');
    if (profile && profile.tuesday === 1) days.push('Tue');
    if (profile && profile.wednesday === 1) days.push('Wed');
    if (profile && profile.thursday === 1) days.push('Thu');
    if (profile && profile.friday === 1) days.push('Fri');
    if (profile && profile.saturday === 1) days.push('Sat');
    if (profile && profile.sunday === 1) days.push('Sun');

    return days.join(', ');
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosClient.get('/restaurantss');
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //Dashboard Recommendation
  const [user, setUserData] = useState(null); // Initialize user state
	useEffect(() => {
		axiosClient.get('tablefortwo/userdata')
		.then((response) => {
			return axiosClient.get('/userRecommendations/' + response.data.id);
		})
		.then((response) => {
			setUserData(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
	}, []);
	
	useEffect(() => {
		console.log("Data:", user);
	}, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (selectedArea === '') {
        // If "All areas" is selected, retrieve all restaurants
        response = await axiosClient.get('/restaurantss');
      } else {
        // Otherwise, retrieve restaurants by selected area
        response = await axiosClient.get(`/restaurantss?area=${selectedArea}`);
      }

      const filteredRestaurants = response.data.filter((restaurant) =>
        restaurant.restaurantname.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredRestaurants); // Store search results
    } catch (error) {
      console.error(error);
    }
  };

  const displayRestaurants = searchResults.length > 0 ? searchResults : restaurants;

  return (
    <div>
      <div className="bg-white">
        <Carousel autoPlay infiniteLoop showThumbs={false} >
          <div>
            <img className="object-contain rounded-lg h-128" src={slide1} alt="Image 1" />
          </div>
          <div>
            <img src={slide2} alt="Image 2" className='rounded-lg' />
          </div>
          <div>
            <img src={slide3} alt="Image 3" className='rounded-lg' />
          </div>
          <div>
            <img src={slide4} alt="Image 4" className='rounded-lg' />
          </div>
        </Carousel>

        <form onSubmit={handleSubmit} className="flex gap-8 mt-4" style={{ fontSize: '12px' }}>
          <label className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search by restaurant name"
              className="w-64 p-2 mr-1 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              style={{ fontSize: '12px' }}
            />
          </label>
          <button type="submit" className="px-4 py-1 mr-4 text-white bg-green-500 rounded-lg">
            Search
          </button>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-8 text-2xl font-semibold">Search Results</div>
        )}

        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Display search results */}
          {displayRestaurants.slice(0, 8).map((restaurant) => (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <div className="restaurant-card">
                <div className="relative flex flex-col w-full max-w-xs overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
                <img
                    className="object-cover"
                    src={restaurant.profile && restaurant.profile.cover ? restaurant.profile.cover : 'https://img.freepik.com/free-photo/restaurant-hall-with-lots-table_140725-6309.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph'}
                    alt="product image"
                    onError={(e) => {
                      console.error('Image load error:', e.target.src);
                      e.target.src = 'https://img.freepik.com/free-photo/restaurant-hall-with-lots-table_140725-6309.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph'; // Set a fallback image URL
                    }}
                  />
                  <span className="absolute top-0 left-0 px-2 m-2 text-sm font-medium text-center text-white bg-red-700 rounded-xl">New</span>
                  <div className="px-5 pb-5 mt-4">
                    <h5 className="text-xl font-bold tracking-tight text-slate-900">{restaurant.restaurantname}</h5>
                    {/* Display opening dates and time */}
                    <div className="mt-2">
                      <p className="text-sm text-slate-700"><b>Open Days: </b>{getOpenDays(restaurant.profile)}</p>
                      <p className="text-sm text-slate-700"><b>Open Time:</b> {restaurant.profile && restaurant.profile.opening} to {restaurant.profile && restaurant.profile.closing}</p>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                      <p>
                        <span className="text-sm text-slate-700">{restaurant.resType}</span>
                      </p>
                      <div className="flex items-center">
                        {restaurant.avgRate ? (
                          <StarRatings
                            rating={restaurant.avgRate}
                            count={restaurant.avgRate}
                            size={24}
                            edit={false}
                            isHalf={true}
                            color="#FFD700"
                          />
                        ) : (
                          <p className='text-gray-400'>No ratings yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Restaurants you may like */}
        {user !== null && (
          <div>
<h2 className="mt-8 text-2xl font-semibold">Restaurants You May Like</h2>

<div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {user.map((restaurant) => (
    <Link to={`/restaurants/${restaurant.resID}`} key={restaurant.resID}>
      <div className="restaurant-card">
        <div className="relative flex flex-col w-full max-w-xs overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
          <img
            className="object-cover"
            src={restaurant.profile && restaurant.profile.cover ? restaurant.profile.cover : 'https://img.freepik.com/free-photo/restaurant-hall-with-lots-table_140725-6309.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph'}
            alt="product image"
            onError={(e) => {
              console.error('Image load error:', e.target.src);
              e.target.src = 'https://img.freepik.com/free-photo/restaurant-hall-with-lots-table_140725-6309.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph'; // Set a fallback image URL
            }}
          />

                  <span className="absolute top-0 left-0 px-2 m-2 text-sm font-medium text-center text-white bg-red-700 rounded-xl">New</span>
                  <div className="px-5 pb-5 mt-4">
                    <h5 className="text-xl font-bold tracking-tight text-slate-900">{restaurant.resName}</h5>
                    <div className="mt-2">
                      <p className="text-sm text-slate-700"><b>Open Days: </b>{getOpenDays(restaurant.profile)}</p>
                      <p className="text-sm text-slate-700"><b>Open Time:</b> {restaurant.profile && restaurant.profile.opening} to {restaurant.profile && restaurant.profile.closing}</p>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                      <p>
                        <span className="text-sm text-slate-700">{restaurant.resType}</span>
                      </p>
                      {/* <div className="flex items-center">
                        {restaurant.avgRate ? (
                          <StarRatings
                            rating={restaurant.avgRate}
                            count={restaurant.avgRate}
                            size={24}
                            edit={false}
                            isHalf={true}
                            color="#FFD700"
                            
                          />
                        ) : (
                          <p className='text-gray-400'>No ratings yet</p>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
    )}
    {/* Newly Added Meals  */}
<h2 className="mt-8 text-2xl font-semibold">Freshly Added Meals</h2>

<div style={{ overflowX: 'auto' }}>
  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ display: 'flex', flexWrap: 'no-wrap' }}>
    {(meals).map((meal) => (
      <div key={meal.id} className="p-0 bg-white rounded-md shadow-md hover:cursor-pointer" style={{ flex: '0 0 25%', minWidth: '25%' }}>
        <Link to={`/meals/${meal.id}`}>
          <img src={meal.photo} alt={meal.name} className="object-cover w-full h-40 mt-2 rounded-md" />
          <h2 className="p-4 text-lg font-semibold">{meal.name}</h2>
          <p className="px-4 text-gray-600">{meal.description}</p>
          <p className="px-4 pb-4 font-medium text-gray-800">Price: LKR {meal.price}</p>
        </Link>
      </div>
    ))}
  </div>
</div>
        {/* Popular Restaurants */}
        <h2 className="mt-8 text-2xl font-semibold">Popular Restaurants</h2>
        <div style={{ overflowX: 'auto' }}>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{ display: 'flex', flexWrap: 'no-wrap' }}>          
          {restaurants.slice(0, 4).map((restaurant) => (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
              <div className="restaurant-card">
                <div className="relative flex flex-col w-full max-w-xs overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
                <img
                    className="object-cover"
                    src={restaurant.profile && restaurant.profile.cover ? restaurant.profile.cover : 'https://img.freepik.com/free-photo/restaurant-hall-with-lots-table_140725-6309.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph'}
                    alt="product image"
                    onError={(e) => {
                      console.error('Image load error:', e.target.src);
                      e.target.src = 'https://img.freepik.com/free-photo/restaurant-hall-with-lots-table_140725-6309.jpg?size=626&ext=jpg&ga=GA1.1.2030009063.1698396006&semt=sph'; // Set a fallback image URL
                    }}
                  />
                <span className="absolute top-0 left-0 px-2 m-2 text-sm font-medium text-center text-white bg-red-700 rounded-xl">New</span>
                  <div className="px-5 pb-5 mt-4">
                    <h5 className="text-xl font-bold tracking-tight text-slate-900">{restaurant.restaurantname}</h5>
                    <div className="mt-2">
                      <p className="text-sm text-slate-700"><b>Open Days: </b>{getOpenDays(restaurant.profile)}</p>
                      <p className="text-sm text-slate-700"><b>Open Time:</b> {restaurant.profile && restaurant.profile.opening} to {restaurant.profile && restaurant.profile.closing}</p>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                      <p>
                        <span className="text-sm text-slate-700">{restaurant.resType}</span>
                      </p>
                      <div className="flex items-center">
                        {restaurant.avgRate ? (
                          <StarRatings
                            rating={restaurant.avgRate}
                            count={restaurant.avgRate}
                            size={24}
                            edit={false}
                            isHalf={true}
                            color="#FFD700"
                          />
                        ) : (
                          <p className='text-gray-400'>No ratings yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
