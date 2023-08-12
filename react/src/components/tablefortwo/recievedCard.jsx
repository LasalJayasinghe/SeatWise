import profilepic from '../../assets/TFTpic.svg';

// const products = [
//     {
//       id: 1,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://img.freepik.com/photos-gratuite/salade-vue-dessus-dans-bol-sombre_23-2148537230.jpg?w=740&t=st=1689415240~exp=1689415840~hmac=1ad469f6fb98eba528ce1f2fe314ec686216a9935433bf2b4db100dfad753022',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: '$35',
//       color: 'Black',
//     },
//     // More products...
//   ]
  
  export default function Cards() {
        return (
    <div>
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                     <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-3xl bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img src={profilepic} class="h-full w-full object-cover object-center group-hover:opacity-75"/>
                     </div>
                                <div className='text-center'>
                <h3 className="mt-4 text-lg font-bold text-gray-700">Jane Doe</h3>
                <h3 className="mt-4 text-sm text-gray-700">Product Manager</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <h3 className="text-center text-gray-700">Kottawa</h3>
                </div>
                
                {/* Buttons */}
                <div className="mt-4">
                    <button className="block w-full py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-900">Accept</button>
                    <button className="block w-full py-2 mt-2 bg-white text-black border border-gray-300 rounded-md shadow-md hover:bg-gray-100">Decline</button>
                </div>
                </div>
        </div>    
    </div>
  )
  }