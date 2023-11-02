import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SideBar from "../../components/restaurant/SideBar";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";

export default function Requests() {

    const {user, setUser} = useStateContext();
    const [order, setOrder] = useState([]);
    // const [customerData, setCustomerData] = useState([]);
    const [loading, setLoading] = useState(false);


    const columns = [
        { field: 'id', headerName: 'Reservation ID', width: 150 },
        // {
        //     field:"avatar", headerName:"Avatar", width:100,
        //     renderCell: (params) => {
        //         return <img src={params.row.img || "src/assets/meal.jpg" } alt="" />
        //     }
        // },
        {
            field: 'reservant_name',
            headerName: 'Customer',
            width: 150,
        },
        // {
        //   field: 'reservant_ID',
        //   headerName: 'Customer',
        //   width: 150,
        //   editable: true,
        //   renderCell: (params) => {
        //         const reservantId = params.value;
        //         // console.log("reservant Id:", reservantId);
        //         let customerName = '';
               
        //         // Loop through the customerData array to find a matching customer by id
        //         for (const customer of customerData) {
        //             if (reservantId == customer.id) {
        //                 customerName = customer.name;
        //                 break; // Stop the loop once a match is found
        //             }
        //         }
                
    
        //         return (
        //             <div className="flex">
        //                 <p>
        //                     {customerName}
        //                 </p>
        //             </div>
        //         );
        //     }
        // },
        {
            field: 'slot_date',
            headerName: 'Date',
            width: 150,
            editable: true,
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
            field: 'Description',
            headerName: 'Requirement',
            width: 150,
            editable: true,
        },
        {
            field: "status",
            headerName: "Actions",
            width: 170,
            renderCell: (params) => (
                <button
                    // onClick={handleDeleteModalClose}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Facilitated
                </button>
            ),
        }
        
    ];

    useEffect(() => {
        axiosClient.get('/user')
          .then(({ data }) => {
            setUser(data);
            // getCustomer(data.id);
          });
    }, []);

    useEffect(() => {
        setLoading(true);
        if (user && user.id) {
          axiosClient.get(`/getHallRequests/${user.id}`)
            .then(({ data }) => {
              setOrder(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
            });
        }
    }, [user]);

    // const getCustomer = (restaurant_id) => {
    //     // setLoading(true);
    //     axiosClient
    //     .get("/getcustomer", { params: { restaurant_id } })
    //     .then(({ data }) => {
    //         console.log("Customer data:", data);
    //         setCustomerData(data);
    //         // setLoading(false)
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching tables:", error);
    //     });
    // };





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
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Special Requests</h1>
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
                        
                    </div>
                </div>
    
                
    
                {/* <Footer /> */}
            </div>
        </>
      )
}
