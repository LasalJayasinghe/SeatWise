import {useState, useEffect } from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import logo from '../assets/logo.svg';
import pizzahut from '../assets/pizzahut.svg';
import SLC from '../assets/SLC.svg';
import GFH from '../assets/GFH.svg';
import Dots from '../assets/Dots.svg';
import subway from '../assets/subway.svg';
import Fade from 'react-reveal/Fade';
import { TypeAnimation } from 'react-type-animation';
import CountUp, { useCountUp } from 'react-countup';
import {Link} from "react-router-dom";

export default function RestaurantLanding(){

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    // Set preloader until the web page is loaded
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //   window.onload = () => {
    //     setIsLoading(false);
    //   };
    // }, []);

    useCountUp({
        ref: 'counter',
        end: 1234567,
        enableScrollSpy: true,
        scrollSpyDelay: 1000,
      });
    
  let [color] = useState("#3EB075");

  return (
    <div>
    {
    loading ? 
    <div className="flex flex-col items-center justify-center h-screen">
        <div>
            <img src={logo} alt="loading" />
        </div>
        <div>
            <SyncLoader
                color={color}
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    </div>
    :
    <header>
        <div className='container p-20 h-screen'>
        <div class="flex flex-row-reverse ">
            <div>
               <Link to = "/signup" > 
                    <button className="bg-black hover:bg-transparent text-white font-semibold hover:text-black py-2 px-5 border border-black hover:border-black rounded">
                        Sign Up
                    </button>
                </Link>
            </div>
            <div className='pr-5'>
                <Link to = "/login" >
                <button className="bg-transparent hover:bg-black text-black hover:text-white font-semibold py-2 px-5 border border-black rounded">
                    Log In
                </button>
                </Link>
            </div>
        </div>
        <Fade left>
            <img src={logo} alt="loading"  className='mt-24'/>
        </Fade>
        <div className='flex-auto mt-7'>
            <Fade bottom>
                <p className='text-2xl font-semibold w-1/2 font-inter'>
                    Discover seamless dining experience<br></br>
                    with <span className='text-green-500'>Seatwise,</span> <br></br>
                    the ultimate destination for hassle-free <br></br>
                    restaurant table bookings.
                </p>
            </Fade>
        
            <div className='mt-6'>
                <TypeAnimation
                    sequence={[
                        1000,
                        // Same substring at the start will only be typed out once, initially
                        'Book your table in ease and dine with delight!!',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Reserve your spot effortlessly and savor the joy of dining!!',
                        1000,
                        'Discover the pleasure of sharing a meal with a delightful stranger!!',
                        1000,
                    ]}
                    wrapper="span"
                    speed={75}
                    style={{ fontFamily:'sans-serif', fontSize: '1.5em', display: 'inline-block', fontWeight: 'light' }}
                    repeat={Infinity}
                    />
            </div>
                <button className="bg-black hover:bg-transparent text-white font-semibold hover:text-black py-3 px-5 border border-black hover:border-black rounded mt-6">
                        Get Started
                </button>
        </div>

        {/* ------------------------------------------------New Section------------------------------------------------ */}
        <section className='mt-20'>
            <div className='flex flex-col items-center justify-center'>
                <Fade><p className='text-5xl font-semibold font-inter'>Why should you use Seatwise?</p></Fade>
                <Fade><p className='text-2xl w-2/3 text-center text-gray-600 font-light font-inter mt-5'>Because we're here to simplify your dining experience, ensuring you never miss out on a perfect table reservation again!</p></Fade>
            </div>
            <div className="flex flex-row my-20">
            <Fade left>
                <div className="flex flex-col items-center  basis-1/3 h-80 hover:shadow-md">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="48" height="48" rx="24" fill="#3EB075" fill-opacity="0.2"/><path d="M38 22C38 20.9 37.1 20 36 20H20C18.9 20 18 20.9 18 22M38 22V34C38 35.1 37.1 36 36 36H20C18.9 36 18 35.1 18 34V22M38 22L28 29L18 22" stroke="#3EB075" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="4" width="48" height="48" rx="24" stroke="#3EB075" stroke-opacity="0.1" stroke-width="8"/></svg>
                <p className='text-xl font-semibold font-inter my-3'>Search restaurants by meals</p>
                <p className='text-medium text-center  text-gray-600 font-medium font-inter mt-5 w-4/5'>Explore a world of culinary delights at your fingertips. With Seatwise, easily search restaurants by meals, unlocking a realm of dining possibilities tailored to your cravings.</p>
                <button class="learn-more mt-10">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Learn More</span>
                </button>
                </div>
            </Fade>
            <Fade bottom>
                <div className="flex flex-col items-center basis-1/3 h-80 hover:shadow-md">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="48" height="48" rx="24" fill="#3EB075" fill-opacity="0.2"/><path d="M29 18L19 30H28L27 38L37 26H28L29 18Z" stroke="#3EB075" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="4" width="48" height="48" rx="24" stroke="#3EB075" stroke-opacity="0.1" stroke-width="8"/></svg>
                <p className='text-xl font-semibold font-inter my-3'>Search meals by restaurant</p>
                <p className='text-medium text-center  text-gray-600 font-medium font-inter mt-5 w-4/5'>Indulge your taste buds like never before. With Seatwise, effortlessly search meals by restaurant, allowing you to discover delectable dishes and savor unforgettable flavors at your preferred dining destinations.</p>
                <button class="learn-more mt-5">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Learn More</span>
                </button>
                </div>
            </Fade>
            <Fade right>
                <div className="flex flex-col items-center basis-1/3 h-80 hover:shadow-md">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="48" height="48" rx="24" fill="#3EB075" fill-opacity="0.2"/><path d="M34 36V26M28 36V20M22 36V30" stroke="#3EB075" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="4" width="48" height="48" rx="24" stroke="#3EB075" stroke-opacity="0.1" stroke-width="8"/></svg>
                <p className='text-xl font-semibold font-inter my-3'>Table for two</p>
                <p className='text-medium text-center  text-gray-600 font-medium font-inter mt-5 w-4/5 '>Share the joy of dining. With Seatwise, book a table for two and connect with fellow food lovers. Enhance your experience, forge connections, and create lasting memories around a shared table.</p>
                <button class="learn-more mt-10">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Learn More</span>
                </button>
                </div>
            </Fade>
            </div>
        </section>

        {/* ------------------------------------------------New Section------------------------------------------------ */}

        <section className='mt-20'>
            <div className='flex flex-col items-center justify-center'>
                <Fade bottom>
                <p className='text-5xl font-semibold font-inter'>Frequently asked questions</p>
                <p className='text-2xl w-2/3 text-center text-gray-600 font-light font-inter mt-5'>Everything you need to know about Seatwise</p>
                </Fade>
            </div>
            <div class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                <div class="py-5">
                    <details class="group">
                        <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span> How can I make a table reservation using Seatwise?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <Fade>
                        <p class="text-neutral-600 mt-3">
                        Making a reservation is easy! Simply search for your preferred restaurant, select the date and time, provide the number of guests, and confirm your booking. Seatwise will handle the rest.
                        </p>
                        </Fade>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span> Can I modify or cancel my reservation?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <Fade>
                        <p class="text-neutral-600 mt-3">
                        Making a reservation is easy! Simply search for your preferred restaurant, select the date and time, provide the number of guests, and confirm your booking. Seatwise will handle the rest.
                        </p>
                        </Fade>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span> Can I share my booked table with someone else?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <Fade>
                        <p class="text-neutral-600 mt-3">
                        Making a reservation is easy! Simply search for your preferred restaurant, select the date and time, provide the number of guests, and confirm your booking. Seatwise will handle the rest.
                        </p>
                        </Fade>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span> Can I leave a review or rating for a restaurant on Seatwise?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <Fade>
                        <p class="text-neutral-600 mt-3">
                        Making a reservation is easy! Simply search for your preferred restaurant, select the date and time, provide the number of guests, and confirm your booking. Seatwise will handle the rest.
                        </p>
                        </Fade>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span> Are there any fees or charges for using Seatwise?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <Fade>
                        <p class="text-neutral-600 mt-3">
                        Making a reservation is easy! Simply search for your preferred restaurant, select the date and time, provide the number of guests, and confirm your booking. Seatwise will handle the rest.
                        </p>
                        </Fade>
                    </details>
                </div>
                <div class="py-5">
                    <details class="group">
                        <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                            <span> How do I change my account email?</span>
                            <span class="transition group-open:rotate-180">
                                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                            </span>
                        </summary>
                        <Fade>
                        <p class="text-neutral-600 mt-3">
                        Making a reservation is easy! Simply search for your preferred restaurant, select the date and time, provide the number of guests, and confirm your booking. Seatwise will handle the rest.
                        </p>
                        </Fade>
                    </details>
                </div>
            </div>
        </section>

        {/* ------------------------------------------------New Section------------------------------------------------ */}

        <section className='flex flex-col items-center justify-center mt-20'>
            <div class="flex -space-x-2 overflow-hidden">
                <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/> 
                <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
                <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            </div>
            <p className='text-3xl font-semibold font-inter my-5'>Still have questions?</p>
            <p className='text-l w-2/3 text-center text-gray-600 font-light font-inter my-5'>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
            <div>
                <button className="bg-black hover:bg-transparent text-white font-semibold hover:text-black py-2 px-5 border border-black hover:border-black rounded">
                    Get in touch
                </button>
            </div>
        </section>

        <section className='my-10'>
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 class="text-center text-lg font-semibold leading-8 text-green-500">400+ restaurants already joined</h2>
                <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <Fade left><img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src={Dots} alt="Tuple" width="158" height="48"/></Fade>
                    <Fade left><img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src={pizzahut} alt="Tuple" width="158" height="48"/></Fade>
                    <Fade bottom><img class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src={SLC} alt="SavvyCal" width="158" height="48"/></Fade>
                    <Fade right><img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src={GFH} alt="Statamic" width="158" height="48"/></Fade>
                    <Fade right><img class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1" src={subway} alt="Statamic" width="158" height="48"/></Fade>
                </div>
            </div>
        </section>
        
        {/* ------------------------------------------------New Section------------------------------------------------ */}

        <section className='flex flex-col items-center justify-center mt-20'>
          <Fade bottom><p className='text-5xl font-semibold font-inter'>Frequently asked questions</p></Fade>
          <p className='text-2xl w-2/3 text-center text-gray-600 font-light font-inter mt-5'>Numbers reveal the story behind success. Seatwise Analytics illuminates the path to growth. Harness the power of data, fuel your progress</p>

        <div class="mx-auto py-20 max-w-7xl px-6 lg:px-8">
            <dl class="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-2">
            <div class="mx-auto flex max-w-l flex-col gap-y-4">
                <dd class="order-first text-3xl font-semibold tracking-tight text-green-500 sm:text-5xl"><CountUp end={4000} enableScrollSpy /> +</dd>
                <p className='text-xl font-semibold font-inter mt-5'>Insights that drive success</p>
                <dt class="text-base text-gray-600">Join Seatwise Analytics and tap into a thriving community of 4000+ satisfied customers</dt>
            </div>
            <div class="mx-auto flex max-w-l flex-col gap-y-4">
                <dd class="order-first text-3xl font-semibold tracking-tight text-green-500 sm:text-5xl"><CountUp end={500} enableScrollSpy />+</dd>
                <p className='text-xl font-semibold font-inter mt-5'>Registered Restaurants</p>
                <dt class="text-base text-gray-600">Discover a vast culinary network with Seatwise Analytics, connecting you to 500+ registered restaurants for endless dining possibilities</dt>
            </div>
            </dl>

            <dl class="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-2 mt-16">
            <div class="mx-auto flex max-w-l flex-col gap-y-4">
                <dd class="order-first text-3xl font-semibold tracking-tight text-green-500 sm:text-5xl"><CountUp end={1500} enableScrollSpy />k+</dd>
                <p className='text-xl font-semibold font-inter mt-5'>Monthly Reservations</p>
                <dt class="text-base text-gray-600">Experience the demand firsthand with Seatwise Analytics—1.5k+ monthly reservations and counting.</dt>
            </div>
            <div class="mx-auto flex max-w-l flex-col gap-y-4">
                <dd class="order-first text-3xl font-semibold tracking-tight text-green-500 sm:text-5xl"><CountUp end={200} enableScrollSpy />+</dd>
                <p className='text-xl font-semibold font-inter mt-5'>5-star reviews</p>
                <dt class="text-base text-gray-600">Witness our commitment to excellence—our 5-star rating shines brightly with over 200 glowing reviews from satisfied users.</dt>
            </div>
            </dl>
        </div>
    </section>

    {/* ------------------------------------------------New Section------------------------------------------------ */}
    <section class="bg-green-600 p-5 ">
    <Fade>
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-md text-center mb-8">
                <h2 class="text-5xl font-semibold font-inter text-white mt-20 ">Choose the best plan for you</h2>
          <p class="mb-5 font-light text-white sm:text-xl">Discover the perfect fit for your dining needs. Choose the best plan for you and unlock a world of customized privileges with Seatwise</p>
            </div>
      <div class="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0 ">
          <div class="flex flex-col p-6 mx-auto w-8/12 text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 ">
          <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">399 LKR</span>
                  <span class="text-gray-500">/3 months</span>
              </div>
              <p class="font-light text-gray-500 sm:text-lg "> 3 months subscription </p>
              <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Free table reservation</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Unlimited table sharing facility</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Free cancellation</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Discounts and special offers</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Basic chat and email support</span>
                  </li>
              </ul>
              <button className="bg-black hover:bg-transparent text-white font-semibold hover:text-black py-3 px-5 border border-black hover:border-black rounded mt-6">
                        Get Started
                </button>          </div>
          <div class="flex flex-col p-6 mx-auto w-8/12 text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8 ">
          <div class="flex justify-center items-baseline my-8">
                  <span class="mr-2 text-5xl font-extrabold">3599 LKR</span>
                  <span class="text-gray-500">/year</span>
              </div>
              <p class="font-light text-gray-500 sm:text-lg "> 1 year subscription </p>
              <ul role="list" class="mb-8 space-y-4 text-left">
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Free table reservation</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Unlimited table sharing facility</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Free cancellation</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Discounts and special offers</span>
                  </li>
                  <li class="flex items-center space-x-3">
                      <svg class="flex-shrink-0 w-5 h-5 text-green-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Basic chat and email support</span>
                  </li>
              </ul>
              
              <button className="bg-black hover:bg-transparent text-white font-semibold hover:text-black py-3 px-5 border border-black hover:border-black rounded mt-6">
                        Get Started
                </button>
          </div>
      </div>
  </div>
  </Fade>
</section>
</div>
    </header>
    }
    </div>
    
  );
}