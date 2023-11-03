import { useEffect, useRef, useState } from "react";
import SettingsBar from "../../components/restaurant/SettingsBar";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";

export default function Payments() {

    const {user, setUser} = useStateContext();
    const [addPrice, setAddPrice] = useState([null]);
    const [tableCount, settableCount] = useState([null]);
    const [hallCount, sethallCount] = useState([null]);

    const cardnoRef = useRef(); 
    const dateRef = useRef();  
    const cvvRef = useRef();  

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
            fetchAddFee(data.id);
            fetchTableCount(data.id);
            fetchHallCount(data.id);
            //fetchReservedTableData(data.id);
            // getfloordata(data.id);
        })
    }, [])
    
        const fetchAddFee = (restaurant_id) => {
        //   setLoading(true);
            axiosClient
            .get("/getAdvertisementFee", { params: { restaurant_id } })
            .then(({ data }) => {
                console.log("Fetched data:", data);
                setAddPrice(data);
                // setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching tables:", error);
            });
        };

        const fetchTableCount = (restaurant_id) => {
            //   setLoading(true);
                axiosClient
                .get(`/getTotalMonthlyReservationCount/${restaurant_id}`)
                .then(({ data }) => {
                    console.log("Fetched table data:", data);
                    settableCount(data);
                    // setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching tables:", error);
                });
        };

        const fetchHallCount = (restaurant_id) => {
            //   setLoading(true);
                axiosClient
                .get(`/getMonthlyHallReservations/${restaurant_id}`)
                .then(({ data }) => {
                    console.log("Fetched table data:", data);
                    sethallCount(data);
                    // setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching tables:", error);
                });
        };

        const onSubmitPayment = (ev) => {
            ev.preventDefault();
            console.log("extract", user.id);
            const selectedType = document.querySelector('input[type="radio"]:checked')?.value || '';
          
            const totalAmount = addPrice + ((tableCount * 49) + (hallCount * 1099)) * 3 / 100;
          
            const payload = {
              restaurant_id: user.id,
              amount: totalAmount,
              card: selectedType,
              cardno: cardnoRef.current.value,
              expiry: dateRef.current.value,
              cvv: cvvRef.current.value,
            };
          
            // console.log(payload);
            axiosClient.post('/addPayment', payload)
              .then((response) => {
                console.log('API response:', response.data);
                // window.location.reload();
                setnull();
              })
              .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                  if (response.data.errors) {
                    setErrors(response.data.errors);
                  } else {
                    setErrors({
                      email: [response.data.message]
                    });
                  }
                }
              });
        };

        function setnull(){
            setAddPrice(null);
            sethallCount(null);
            settableCount(null);
        }

          

    

    






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
                                            <div className="w-[270px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Advertisement fee</div>
                                            <div className="w-[68px] h-[25px] text-zinc-950 text-lg font-medium font-['Inter'] leading-snug">LKR {addPrice}</div>
                                            </div>
                                            <div className="pl-px pr-2 justify-start items-start gap-[148px] inline-flex">
                                            <div className="w-[173px] h-[25px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">All advertisements </div>
                                            {/* <div className="w-[51px] h-[25px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">Qty: 2</div> */}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-9 flex">
                                        <div className="w-[476px] h-[0px] border border-zinc-400"></div>
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="justify-start items-start gap-[5px] inline-flex">
                                                <div className="w-[290px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Total Table Reservations</div>
                                                <div className="w-[100px] h-[25px] text-zinc-950 text-lg font-medium font-['Inter'] leading-snug">{tableCount}</div>
                                            </div>
                                            <div className="justify-start items-start gap-[125px] inline-flex">
                                                <div className="w-[173px] h-[29px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">Fee per table</div>
                                                <div className="w-[100px] h-[25px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">LKR 49</div>
                                            </div>
                                            <div className="pl-px pr-2 justify-start items-start gap-[5px] inline-flex">
                                                <div className="w-[290px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Total Hall Reservations</div>
                                                <div className="w-[68px] h-[25px] text-zinc-950 text-lg font-medium font-['Inter'] leading-snug">{hallCount}</div>
                                            </div>
                                            <div className="justify-start items-start gap-[125px] inline-flex">
                                                <div className="w-[173px] h-[29px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">Fee per hall</div>
                                                <div className="w-[100px] h-[25px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">LKR 1099</div>
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
                                        <div className="justify-start items-start gap-[230px] inline-flex">
                                            <div className="w-[70px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-3">Subtotal</div>
                                            <div className="w-[60px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-3">{(tableCount * 49) + (hallCount * 1099)}</div>
                                        </div>
                                        <div className="justify-start items-start gap-[130px] inline-flex">
                                            <div className="w-[173px] h-[2px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">Flat platform cost</div>
                                            <div className="w-[51px] h-[25px] text-zinc-400 text-base font-medium font-['Inter'] leading-3">30%</div>
                                        </div>
                                        <div className="justify-start items-start gap-[230px] inline-flex">
                                            <div className="w-[170px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-3"></div>
                                            <div className="w-[60px] h-[25px] text-zinc-950 text-base font-medium font-['Inter'] leading-3">{((tableCount * 49) + (hallCount * 1099))*30/100}</div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-6 flex">
                                        <div className="w-[476px] h-[0px] border border-zinc-400"></div>
                                        <div className="justify-start items-start gap-[20px] inline-flex">
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="w-[70px] h-[22px] text-zinc-950 text-base font-medium font-['Inter'] leading-3">Total</div>
                                            <div className="w-[206px] h-[22px] text-zinc-400 text-sm font-normal font-['Inter'] leading-snug">Including advertisements </div>
                                        </div>
                                        <div className="w-[400px] h-[55px] text-zinc-950 text-4xl font-medium font-['Inter'] leading-[18px]">LKR {addPrice+((tableCount * 49) + (hallCount * 1099))*3/100}</div>
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

                                    <form onSubmit={onSubmitPayment} method="post">
                                    <div className="flex-col justify-start items-start gap-4 flex">
                                        <div className="w-[92px] h-[15px] text-zinc-950 text-base font-semibold font-['Inter'] leading-3">Pay With:</div>
                                        <div className="justify-start items-start gap-[19px] inline-flex">
                                            <div className="justify-center items-center gap-2 flex">    

                                                <div className=" flex items-center gap-x-6">
                                                    <div className="flex items-center gap-x-5">
                                                        <input
                                                            // ref={typeHallRef} 
                                                            value="Visa"
                                                            id="push-everything"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"

                                                        />
                                                        <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Visa
                                                        </label>
                                                    </div>

                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            // ref={typeTableRef} 
                                                            value="Master"
                                                            id="push-email"
                                                            name="push-notifications"
                                                            type="radio"
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mb-0"
                                                        />
                                                        <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Master
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
                                            <input ref={cardnoRef} className="w-[460px] text-zinc-400 text-base font-normal font-['Inter'] leading-snug" type="text" placeholder="1234  5678  9101  1121"/>
                                        </div>
                                        <div className="justify-start items-start gap-[18px] inline-flex">
                                            <div className="flex-col justify-start items-start gap-4 inline-flex">
                                                <div className="text-zinc-950 text-base font-medium font-['Inter'] leading-snug">Expiration Date</div>
                                                <input ref={dateRef} className="w-[233px] pl-4 py-3 rounded border border-zinc-400 justify-start items-start gap-2.5 inline-flex" type="date" placeholder="MM/YY"/>  
                                            </div>
                                            <div className="flex-col justify-start items-start gap-4 inline-flex">
                                            <div className="text-zinc-950 text-base font-medium font-['Inter'] leading-snug">CVV</div>
                                            <input ref={cvvRef} className="w-[233px] pl-4 py-3 rounded border border-zinc-400 justify-start items-start gap-2.5 inline-flex" type="text" placeholder="123"/>  
                                            </div>
                                        </div>
                                        <div className="justify-end items-center gap-4 inline-flex">
                                            <input className="mt-2 w-4 h-4 relative rounded-sm border border-zinc-400" type="checkbox" />
                                            <div className="text-zinc-400 text-base font-normal font-['Inter'] leading-tight">Save card details</div>
                                        </div>
                                        </div>
                                    </div>
                                    <button type="submit">
                                        <div className="flex-col justify-start items-start gap-[23px] flex">
                                            <div className="w-[476px] px-[193px] py-5 bg-green-500 rounded justify-center items-center gap-2.5 inline-flex">
                                            <div className="text-zinc-100 text-base font-bold font-['Inter'] leading-3">Pay</div>
                                            </div>
                                            <div className="w-[475px] text-zinc-400 text-sm font-normal font-['Inter'] leading-snug">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</div>
                                        </div>
                                    </button>
                                    </form>
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
