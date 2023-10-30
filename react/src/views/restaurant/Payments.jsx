import SettingsBar from "../../components/restaurant/SettingsBar";

export default function Payments() {
  return (
    <>
    <div className="main">
        

        <div className="ordercontainer">
            <div className="menuContainer">
                <SettingsBar />
            </div>
            <div className="contentContainer">
                <div>
                    <header className="bg-white shadow">
                        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Monthly Payments</h1>
                            <div className="loading-container">
                                {/* {loading && <p className="loading-text">Loading...</p>} */}
                            </div>
                        </div>
                    </header>
                </div>
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                    {/* payment section starts */}

                        {/* <div className="w-[1066px] h-[130px] relative">
                        <div className="w-[250px] h-[130px] left-0 top-0 absolute">
                            <div className="w-[270px] h-[130px] left-0 top-0 absolute opacity-5 bg-black rounded-xl shadow" />
                            <div className="w-[189px] h-[103px] left-[20px] top-[14px] absolute">
                            <div className="left-0 top-0 absolute opacity-90 text-black text-5xl font-bold font-['Hind Siliguri']">8,000</div>
                            <div className="left-0 top-[50px] absolute opacity-90 text-green-600 text-base font-medium font-['Hind Siliguri'] uppercase tracking-tight">Total Table Reservations</div>
                            <div className="w-8 h-8 left-[157px] top-[47px] absolute" />
                            </div>
                        </div>
                        <div className="w-[250px] h-[130px] left-[280px] top-0 absolute">
                            <div className="w-[270px] h-[130px] left-0 top-0 absolute opacity-5 bg-black rounded-xl shadow" />
                            <div className="w-[189px] h-[103px] left-[20px] top-[14px] absolute">
                            <div className="left-0 top-0 absolute opacity-90 text-black text-5xl font-bold font-['Hind Siliguri']">30%</div>
                            <div className="left-0 top-[50px] absolute opacity-90 text-green-600 text-base font-medium font-['Hind Siliguri'] uppercase tracking-tight">Flat Platform Fee</div>
                            <div className="w-8 h-8 left-[189px] top-[47px] absolute origin-top-left rotate-180 opacity-90" />
                            </div>
                        </div>
                        <div className="w-[250px] h-[130px] left-[560px] top-0 absolute">
                            <div className="w-[270px] h-[130px] left-0 top-0 absolute opacity-5 bg-black rounded-xl shadow" />
                            <div className="w-[189px] h-[103px] left-[20px] top-[14px] absolute">
                            <div className="left-0 top-0 absolute opacity-90 text-black text-5xl font-bold font-['Hind Siliguri']">467k</div>
                            <div className="left-0 top-[50px] absolute opacity-90 text-green-600 text-base font-medium font-['Hind Siliguri'] uppercase tracking-tight">Total Revenue Generated</div>
                            <div className="w-8 h-8 left-[157px] top-[47px] absolute" />
                            </div>
                        </div>
                        <div className="w-[250px] h-[130px] left-[840px] top-0 absolute">
                            <div className="w-[270px] h-[130px] left-0 top-0 absolute opacity-5 bg-black rounded-xl shadow" />
                            <div className="w-[189px] h-[103px] left-[20px] top-[14px] absolute">
                            <div className="left-0 top-0 absolute opacity-90 text-black text-5xl font-bold font-['Hind Siliguri']">43.5k</div>
                            <div className="left-0 top-[50px] absolute opacity-90 text-green-600 text-base font-medium font-['Hind Siliguri'] uppercase tracking-tight">Paid out to creators</div>
                            <div className="w-8 h-8 left-[189px] top-[47px] absolute origin-top-left rotate-180 opacity-90" />
                            </div>
                        </div>
                        </div> */}


                        <div className="flex mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 mt-0">
                            <div className="mt-0">
                                <div className="w-[572px] h-[600px] p-5 flex-col justify-start items-start gap-5 inline-flex">
                                    <div className="flex-col justify-start items-start gap-2 flex">
                                        <div className="w-[179px] h-7 text-zinc-950 text-2xl font-semibold font-['Inter'] leading-7">Summary</div>
                                        <div className="w-[476px] h-[0px] border border-zinc-400"></div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-6 flex">
                                        <div className="justify-start items-start gap-4 inline-flex">
                                        {/* <img className="w-[70px] h-[70px] relative rounded border border-zinc-400" src="https://via.placeholder.com/70x70" /> */}
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="justify-start items-start gap-[125px] inline-flex">
                                            <div className="w-[197px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Advertisement fee</div>
                                            <div className="w-[68px] h-[25px] text-zinc-950 text-lg font-medium font-['Inter'] leading-snug">$49.80</div>
                                            </div>
                                            <div className="pl-px pr-2 justify-start items-start gap-[148px] inline-flex">
                                            <div className="w-[173px] h-[25px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">Brown Vegan Leather</div>
                                            <div className="w-[51px] h-[25px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">Qty: 2</div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-9 flex">
                                        <div className="w-[476px] h-[0px] border border-zinc-400"></div>
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="justify-start items-start gap-[125px] inline-flex">
                                                <div className="w-[197px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Total Table Reservations</div>
                                                <div className="w-[68px] h-[25px] text-zinc-950 text-lg font-medium font-['Inter'] leading-snug">$49.80</div>
                                            </div>
                                            <div className="justify-start items-start gap-[125px] inline-flex">
                                                <div className="w-[197px] h-[33px] text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Total Revenue Generated</div>
                                                <div className="w-[68px] h-[33px] text-zinc-950 text-lg font-medium font-['Inter'] leading-snug">$49.80</div>
                                            </div>
                                            <div className="pl-px pr-2 justify-start items-start gap-[148px] inline-flex">
                                                <div className="w-[173px] h-[29px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">Flat Platform Fee</div>
                                                <div className="w-[51px] h-[25px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">3%</div>
                                            </div>
                                            <div className="justify-start items-start gap-[125px] inline-flex">
                                                <div className="w-[197px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Paid out to creators</div>
                                                <div className="w-[68px] h-[25px] text-zinc-950 text-lg font-medium font-['Inter'] leading-snug">$49.80</div>
                                            </div>
                                            
                                        </div>
                                        {/* <div className="w-[476px] h-[0px] border border-zinc-400"></div>
                                        <div className="justify-start items-start gap-4 inline-flex">
                                        <div className="pl-4 pr-48 py-3.5 bg-white rounded border border-zinc-400 justify-start items-start gap-2.5 flex">
                                            <div className="text-zinc-400 text-base font-normal font-['Inter'] leading-[18px]">Gift or discount code</div>
                                        </div>
                                        <div className="px-[23px] py-[13px] bg-zinc-400 rounded border border-zinc-400 justify-center items-center gap-2.5 flex">
                                            <div className="w-[46px] h-5 text-zinc-100 text-base font-medium font-['Inter'] leading-3">Apply</div>
                                        </div>
                                        </div> */}
                                    </div>
                                    <div className="flex-col justify-start items-start gap-6 flex">
                                        <div className="w-[476px] h-[0px] border border-zinc-400"></div>
                                        <div className="flex-col justify-start items-start gap-4 flex">
                                        <div className="justify-start items-start gap-[346px] inline-flex">
                                            <div className="w-[70px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-3">Subtotal</div>
                                            <div className="w-[60px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-3">$49.80</div>
                                        </div>
                                        <div className="justify-start items-start gap-[346px] inline-flex">
                                            <div className="w-[70px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-3">Shipping</div>
                                            <div className="w-[60px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-3">$7.24</div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-6 flex">
                                        <div className="w-[476px] h-[0px] border border-zinc-400"></div>
                                        <div className="justify-start items-start gap-[183px] inline-flex">
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="w-[38px] h-[22px] text-zinc-950 text-base font-medium font-['Inter'] leading-3">Total</div>
                                            <div className="w-[166px] h-[22px] text-zinc-400 text-sm font-normal font-['Inter'] leading-snug">Including $2.24 in taxes</div>
                                        </div>
                                        <div className="w-[127px] h-[55px] text-zinc-950 text-4xl font-medium font-['Inter'] leading-[18px]">$59.28</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div>

                                <div className="w-[572px] h-[685px] p-12 rounded-lg border flex-col justify-start items-start gap-5 inline-flex">
                                    <div className="flex-col justify-start items-start gap-2 flex">
                                        <div className="w-[207px] h-10 text-zinc-950 text-2xl font-semibold font-['Inter'] leading-7">Payment</div>
                                        <div className="w-[476px] h-[0px] border border-zinc-400"></div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-4 flex">
                                        <div className="w-[92px] h-[15px] text-zinc-950 text-base font-semibold font-['Inter'] leading-3">Pay With:</div>
                                        <div className="justify-start items-start gap-[19px] inline-flex">
                                            <div className="justify-center items-center gap-2 flex">    

                                                <div className=" flex items-center gap-x-6">
                                                    <div className="flex items-center gap-x-5">
                                                        <input
                                                            // ref={typeHallRef} 
                                                            value="Hall"
                                                            id="push-everything"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"

                                                        />
                                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Hall
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            // ref={typeTableRef} 
                                                            value="Table"
                                                            id="push-email"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"
                                                        />
                                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Table
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            // ref={typeBothRef} 
                                                            value="Both"
                                                            id="push-nothing"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"
                                                        />
                                                        <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Both
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-4 flex">
                                        <div className="flex-col justify-start items-start gap-6 flex">
                                        <div className="flex-col justify-start items-start gap-4 flex">
                                            <div className="w-[129px] h-[17px] text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Card Number</div>
                                            <input className="w-[460px] text-zinc-400 text-base font-normal font-['Inter'] leading-snug" type="text" placeholder="1234  5678  9101  1121"/>
                                        </div>
                                        <div className="justify-start items-start gap-[18px] inline-flex">
                                            <div className="flex-col justify-start items-start gap-4 inline-flex">
                                                <div className="text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Expiration Date</div>
                                                <input className="w-[233px] pl-4 py-3 rounded border border-zinc-400 justify-start items-start gap-2.5 inline-flex" type="text" placeholder="MM/YY"/>  
                                            </div>
                                            <div className="flex-col justify-start items-start gap-4 inline-flex">
                                            <div className="text-zinc-950 text-base font-medium font-['Inter'] leading-snug">CVV</div>
                                            <input className="w-[233px] pl-4 py-3 rounded border border-zinc-400 justify-start items-start gap-2.5 inline-flex" type="text" placeholder="123"/>  
                                            </div>
                                        </div>
                                        <div className="justify-end items-center gap-4 inline-flex">
                                            <input className="mt-2 w-4 h-4 relative rounded-sm border border-zinc-400" type="checkbox" />
                                            <div className="text-zinc-400 text-base font-normal font-['Inter'] leading-tight">Save card details</div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-[23px] flex">
                                        <div className="w-[476px] px-[193px] py-5 bg-green-500 rounded justify-center items-center gap-2.5 inline-flex">
                                        <div className="text-zinc-100 text-base font-bold font-['Inter'] leading-3">Pay</div>
                                        </div>
                                        <div className="w-[475px] text-zinc-400 text-sm font-normal font-['Inter'] leading-snug">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</div>
                                    </div>
                                </div>

                            
                                
                            </div>

                        </div>

                    
                  
                    {/* payment section ends */}
                
                </div>

                
                
            </div>
        </div>
        {/* <Footer /> */}
    </div>    
    </>
  )
}
