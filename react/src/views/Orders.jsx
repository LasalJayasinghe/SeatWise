import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import SideBar from "../components/SideBar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
    { field: 'id', headerName: 'Rservation ID', width: 150 },
    {
        field:"avatar", headerName:"Avatar", width:100,
        renderCell: (params) => {
            return <img src={params.row.img || "src/assets/meal.jpg" } alt="" />
        }
    },
    {
      field: 'reservant_name',
      headerName: 'Customer',
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
        field: 'tablefortwo',
        headerName: 'Table For two',
        width: 170,
        editable: true,
    },
    // {
    //     field: 'price',
    //     headerName: 'Price',
    //     type: 'number',
    //     width: 110,
    //     editable: true,
    // },
    // {
    //     field: 'status',
    //     headerName: 'Availability',
    //     type: 'boolean',
    //     width: 200,
    //     renderCell: (params) => {
    //         return <Switch {...label} />
    //     }
    // },
    {
        field:"status",
        headerName:"Actions", 
        width:200,
        renderCell: (params) => {
            const status = params.value;
            let statusLabel = "";
           
            if (status === "checked in") {
                statusLabel = "Ongoing";
            } else if (status === "checked out") {
                statusLabel = "Completed";
            }

            return (
                <div className="flex">
                    <p className={status === "checked in" ? "text-green-500" : "text-red-500"}>
                        {statusLabel}
                    </p>
                </div>
            );
            
            
            // return <div className="flex">
            //     <div className="view">
            //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="green" className="w-6 h-6">
            //             <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            //         </svg>
            //     </div>
            //     <div className="delete">
            //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="red" className="w-6 h-6">
            //             <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            //         </svg>
            //     </div>
            // </div>
        }
    },
  ];


export default function Orders() {

    const {user, setUser} = useStateContext();
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axiosClient.get('/user')
          .then(({ data }) => {
            setUser(data);
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
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
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
