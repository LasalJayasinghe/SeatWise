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

                        <div className="w-[1066px] h-[130px] relative">
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
