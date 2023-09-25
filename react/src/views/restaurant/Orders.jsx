import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import SideBar from "../../components/restaurant/SideBar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


export default function Orders() {

    const {user, setUser} = useStateContext();
    const [order, setOrder] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        { field: 'id', headerName: 'Reservation ID', width: 150 },
        {
            field:"avatar", headerName:"Avatar", width:100,
            renderCell: (params) => {
                return <img src={params.row.img || "src/assets/meal.jpg" } alt="" />
            }
        },
        {
          field: 'reservant_ID',
          headerName: 'Customer',
          width: 150,
          editable: true,
          renderCell: (params) => {
                const reservantId = params.value;
                // console.log("reservant Id:", reservantId);
                let customerName = '';
               
                // Loop through the customerData array to find a matching customer by id
                for (const customer of customerData) {
                    if (reservantId == customer.id) {
                        customerName = customer.name;
                        break; // Stop the loop once a match is found
                    }
                }
                
    
                return (
                    <div className="flex">
                        <p>
                            {customerName}
                        </p>
                    </div>
                );
            }
        },
        {
          field: 'start_time',
          headerName: 'Start time',
          width: 150,
          editable: true,
        },
        {
            field: 'end_time',
            headerName: 'End time',
            width: 150,
            editable: true,
        },
        {
            field: 'tablefortwo',
            headerName: 'Table For two',
            width: 170,
            editable: true,
        },
        {
            field:"status",
            headerName:"Actions", 
            width:200,
            renderCell: (params) => {
                const status = params.value;
                let statusLabel = "";
               
                if (status == "0") {
                    statusLabel = "Completed";
                } else if (status == "1") {
                    statusLabel = "Ongoing";
                } else if (status == "2") {
                    statusLabel = "Not Arrived Yet";
                }
    
                return (
                    <div className="flex">
                        <p className={status == "0" ? "text-green-500" : status == "1" ? "text-red-500" : "text-black-500"}>
                            {statusLabel}
                        </p>
                    </div>
                );
            }
        },
    ];

    useEffect(() => {
        axiosClient.get('/user')
          .then(({ data }) => {
            setUser(data);
            getCustomer(data.id);
          });
      }, []);

    useEffect(() => {
        setLoading(true);
        if (user && user.id) {
          axiosClient.get(`/getOrder/${user.id}`)
            .then(({ data }) => {
              setOrder(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }, [user]);

      const getCustomer = (restaurant_id) => {
        // setLoading(true);
        axiosClient
        .get("/getcustomer", { params: { restaurant_id } })
        .then(({ data }) => {
            console.log("Customer data:", data);
            setCustomerData(data);
            // setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching tables:", error);
        });
    };




    return (
        <>

        <div className="main">
            

            <div className="ordercontainer">
                <div className="menuContainer">
                    <SideBar />
                </div>
                <div className="contentContainer">
                    <div>
                        <header className="bg-white shadow">
                            <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Today Orders</h1>
                                <div className="loading-container">
                                    {/* {loading && <p className="loading-text">Loading...</p>} */}
                                </div>
                            </div>
                        </header>
                    </div>
                    <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        
                        <div className="dataTable">
                            <DataGrid
                                rows={order}
                                columns={columns}
                                initialState={{
                                pagination: {
                                    paginationModel: {
                                    pageSize: 5,
                                    },
                                },
                                }}
                                slots={{ toolbar: GridToolbar }}
                                slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                                // disableColumnFilter
                                disableDensitySelector
                                disableColumnSelector
                            />

                        </div>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 ml-10">Meals</h1>

                    <div className="ml-10 mt-5">
                        {/* <h1 className="text-2xl font-bold mb-4">Menu for</h1> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* {meals.map((meal) => ( */}
                            <div className="bg-white p-4 shadow-md rounded-md">
                                <div className="flex gap-10">
                                    <div>
                                        <h2 className="text-lg font-semibold">Order #215</h2>
                                        <h2 className="text-xs">12 August 2023, 12.35 PM</h2>
                                    </div>
                                    
                                    <div className="user">
                                        <img src="src/assets/slide2.png" alt="" />
                                        {/* <img src={user.img} alt="" /> */}
                                    </div>
                                </div>

                                <div className="flex gap-10">
                                    <img src="src/assets/slide2.png" className="w-10 h-10 object-cover mt-5 rounded-md" />

                                    <div className="mt-5">
                                        <h3 className="text-base text-gray-500">Cheezy sunshine</h3>
                                        <h2 className="text-xs text-gray-500">3200 LKR | Qty : 1</h2>
                                    </div>     
                                </div>

                                <div className="flex gap-10">
                                    <img src="src/assets/slide2.png" className="w-10 h-10 object-cover mt-5 rounded-md" />

                                    <div className="mt-5">
                                        <h3 className="text-base text-gray-500">Cheezy sunshine</h3>
                                        <h2 className="text-xs text-gray-500">3200 LKR | Qty : 1</h2>
                                    </div>     
                                </div>

                                <div className="mt-10">
                                    <p className="text-gray-600 mt-2">Total : 6400 LKR</p>
                                    <p className="text-gray-600 mt-1">Order Fee : 1520 LKR </p>
                                </div>

                                <div className="flex space-x-4 mt-3">
                                    <button className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm">Cancel</button>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create view</button>
                                </div>

                            </div>
                            {/* ))} */}
                        </div>
                    </div>
                    
                </div>
            </div>

            

            {/* <Footer /> */}
        </div>






            
        </>
    )
}
