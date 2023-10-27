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

export default function landing(){

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
        <div className='container h-screen p-20'>
        <div className="flex flex-row-reverse ">
            <div>
               <Link to = "/signup" > 
                    <button className="px-5 py-2 font-semibold text-white bg-black border border-black rounded hover:bg-transparent hover:text-black hover:border-black">
                        Sign Up
                    </button>
                </Link>
            </div>
            <div className='pr-5'>
                <Link to = "/login" >
                <button className="px-5 py-2 font-semibold text-black bg-transparent border border-black rounded hover:bg-black hover:text-white">
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
                <p className='w-1/2 text-2xl font-semibold font-inter'>
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
                <button className="px-5 py-3 mt-6 font-semibold text-white bg-black border border-black rounded hover:bg-transparent hover:text-black hover:border-black">
                        Get Started
                </button>
        </div>

        {/* ------------------------------------------------New Section------------------------------------------------ */}
        <section className='mt-20'>
            <div className='flex flex-col items-center justify-center'>
                <Fade><p className='text-5xl font-semibold font-inter'>Why should you use Seatwise?</p></Fade>
                <Fade><p className='w-2/3 mt-5 text-2xl font-light text-center text-gray-600 font-inter'>Because we're here to simplify your dining experience, ensuring you never miss out on a perfect table reservation again!</p></Fade>
            </div>
            <div className="flex flex-row my-20">
            <Fade left>
                <div className="flex flex-col items-center basis-1/3 h-80 hover:shadow-md">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="48" height="48" rx="24" fill="#3EB075" fill-opacity="0.2"/><path d="M38 22C38 20.9 37.1 20 36 20H20C18.9 20 18 20.9 18 22M38 22V34C38 35.1 37.1 36 36 36H20C18.9 36 18 35.1 18 34V22M38 22L28 29L18 22" stroke="#3EB075" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="4" width="48" height="48" rx="24" stroke="#3EB075" stroke-opacity="0.1" stroke-width="8"/></svg>
                <p className='my-3 text-xl font-semibold font-inter'>Search restaurants by meals</p>
                <p className='w-4/5 mt-5 font-medium text-center text-gray-600 text-medium font-inter'>Explore a world of culinary delights at your fingertips. With Seatwise, easily search restaurants by meals, unlocking a realm of dining possibilities tailored to your cravings.</p>
                <button className="mt-10 learn-more">
                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Learn More</span>
                </button>
                </div>
            </Fade>
            <Fade bottom>
                <div className="flex flex-col items-center basis-1/3 h-80 hover:shadow-md">
                {/* <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="48" height="48" rx="24" fill="#3EB075" fill-opacity="0.2"/><path d="M29 18L19 30H28L27 38L37 26H28L29 18Z" stroke="#3EB075" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="4" width="48" height="48" rx="24" stroke="#3EB075" stroke-opacity="0.1" stroke-width="8"/></svg> */}
                <p className='my-3 text-xl font-semibold font-inter'>Search meals by restaurant</p>
                <p className='w-4/5 mt-5 font-medium text-center text-gray-600 text-medium font-inter'>Indulge your taste buds like never before. With Seatwise, effortlessly search meals by restaurant, allowing you to discover delectable dishes and savor unforgettable flavors at your preferred dining destinations.</p>
                <button className="mt-5 learn-more">
                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Learn More</span>
                </button>
                </div>
            </Fade>
            <Fade right>
                <div className="flex flex-col items-center basis-1/3 h-80 hover:shadow-md">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="48" height="48" rx="24" fill="#3EB075" fill-opacity="0.2"/><path d="M34 36V26M28 36V20M22 36V30" stroke="#3EB075" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="4" width="48" height="48" rx="24" stroke="#3EB075" stroke-opacity="0.1" stroke-width="8"/></svg>
                <p className='my-3 text-xl font-semibold font-inter'>Table for two</p>
                <p className='w-4/5 mt-5 font-medium text-center text-gray-600 text-medium font-inter '>Share the joy of dining. With Seatwise, book a table for two and connect with fellow food lovers. Enhance your experience, forge connections, and create lasting memories around a shared table.</p>
                <button className="mt-10 learn-more">
                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Learn More</span>
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
                <p className='w-2/3 mt-5 text-2xl font-light text-center text-gray-600 font-inter'>Everything you need to know about Seatwise</p>
                </Fade>
            </div>
            <div className="grid max-w-xl mx-auto mt-8 divide-y divide-neutral-200">
                <div className="py-5">
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
                <div className="py-5">
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
                <div className="py-5">
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
                <div className="py-5">
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
                <div className="py-5">
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
                <div className="py-5">
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
            <div className="flex -space-x-2 overflow-hidden">
                <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/> 
                <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt=""/>
                <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            </div>
            <p className='my-5 text-3xl font-semibold font-inter'>Still have questions?</p>
            <p className='w-2/3 my-5 font-light text-center text-gray-600 text-l font-inter'>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
            <div>
                <button className="px-5 py-2 font-semibold text-white bg-black border border-black rounded hover:bg-transparent hover:text-black hover:border-black">
                    Get in touch
                </button>
            </div>
        </section>

        <section className='my-10'>
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <h2 class="text-center text-lg font-semibold leading-8 text-green-500">400+ restaurants already joined</h2>
                <div className="grid items-center max-w-lg grid-cols-4 mx-auto mt-10 gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
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
          <p className='w-2/3 mt-5 text-2xl font-light text-center text-gray-600 font-inter'>Numbers reveal the story behind success. Seatwise Analytics illuminates the path to growth. Harness the power of data, fuel your progress</p>

        <div className="px-6 py-20 mx-auto max-w-7xl lg:px-8">
            <dl class="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-2">
            <div className="flex flex-col mx-auto max-w-l gap-y-4">
                <dd class="order-first text-3xl font-semibold tracking-tight text-green-500 sm:text-5xl"><CountUp end={4000} enableScrollSpy /> +</dd>
                <p className='mt-5 text-xl font-semibold font-inter'>Insights that drive success</p>
                <dt class="text-base text-gray-600">Join Seatwise Analytics and tap into a thriving community of 4000+ satisfied customers</dt>
            </div>
            <div className="flex flex-col mx-auto max-w-l gap-y-4">
                <dd class="order-first text-3xl font-semibold tracking-tight text-green-500 sm:text-5xl"><CountUp end={500} enableScrollSpy />+</dd>
                <p className='mt-5 text-xl font-semibold font-inter'>Registered Restaurants</p>
                <dt class="text-base text-gray-600">Discover a vast culinary network with Seatwise Analytics, connecting you to 500+ registered restaurants for endless dining possibilities</dt>
            </div>
            </dl>

            <dl class="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-2 mt-16">
            <div className="flex flex-col mx-auto max-w-l gap-y-4">
                <dd class="order-first text-3xl font-semibold tracking-tight text-green-500 sm:text-5xl"><CountUp end={1500} enableScrollSpy />k+</dd>
                <p className='mt-5 text-xl font-semibold font-inter'>Monthly Reservations</p>
                <dt class="text-base text-gray-600">Experience the demand firsthand with Seatwise Analytics—1.5k+ monthly reservations and counting.</dt>
            </div>
            <div className="flex flex-col mx-auto max-w-l gap-y-4">
                <dd class="order-first text-3xl font-semibold tracking-tight text-green-500 sm:text-5xl"><CountUp end={200} enableScrollSpy />+</dd>
                <p className='mt-5 text-xl font-semibold font-inter'>5-star reviews</p>
                <dt class="text-base text-gray-600">Witness our commitment to excellence—our 5-star rating shines brightly with over 200 glowing reviews from satisfied users.</dt>
            </div>
            </dl>
        </div>
    </section>

    {/* ------------------------------------------------New Section------------------------------------------------ */}
     <section class="bg-green-100  border-t mt-20 rounded-xl">
 <footer className="p-10 text-green-600">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <h3 className="text-xl font-semibold">About Us</h3>
        <p className="mt-3">Discover seamless dining experience with Seatwise, the ultimate destination for hassle-free restaurant table bookings.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Quick Links</h3>
        <ul className="mt-3">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Contact Us</h3>
        <p className="mt-3">
          Address: 123 Main St, City, Country
          <br />
          Email: info@seatwise.com
          <br />
          Phone: +1 (123) 456-7890
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Follow Us</h3>
        <ul className="flex mt-3 space-x-4">
          <li><a href="#" className="text-2xl"><i className="fab fa-facebook"></i></a></li>
          <li><a href="#" className="text-2xl"><i className="fab fa-twitter"></i></a></li>
          <li><a href="#" className="text-2xl"><i className="fab fa-instagram"></i></a></li>
        </ul>
      </div>
    </div>
    <div className="pt-4 mt-8 text-center text-green-500 border-t border-green-300 ">
      <p>&copy; 2023 Seatwise. All rights reserved.</p>
    </div>
  </div>
</footer>
</section>
</div>


    </header>



    
    }
    </div>
    
  );
}