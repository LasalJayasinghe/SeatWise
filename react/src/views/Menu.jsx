import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Menu() {

    const {user, setUser} = useStateContext();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    
    const columns = [
        { field: 'id', headerName: 'Meal ID', width: 90 },
        {
            field:"avatar", headerName:"Avatar", width:100,
            renderCell: (params) => {
                return <img src={params.row.img || "src/assets/meal.jpg" } alt="" />
            }
        },
        {
          field: 'name',
          headerName: 'Meal Name',
          width: 150,
          editable: true,
        },
        {
          field: 'category_id',
          headerName: 'Category',
          width: 130,
          editable: true,
          renderCell: (params) => {
            const categoryId = params.value;
            const selectedCategory = category.find(cat => cat.id === categoryId);
           
            const categoryName = selectedCategory ? selectedCategory.category : 'Unknown Category';
    
            return (
                <div className="flex">
                  <p>
                    {categoryName}
                  </p>
                </div>
            );
            
        }
        },
        {
            field: 'potion',
            headerName: 'Potion',
            width: 90,
            editable: true,
          },
        {
            field: 'description',
            headerName: 'Description',
            width: 170,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'availability',
            headerName: 'Availability',
            type: 'boolean',
            width: 200,
            renderCell: (params) => {

              const handleSwitchToggle = (ev) => {
                ev.preventDefault()

                const updatedAvailability = params.value === 1 ? 0 : 1;
                // updateAvailabilityInDatabase(params.id, updatedAvailability);
                // console.log(updatedAvailability)
          
                const payLoad = {
                  id: params.id,
                  availability: updatedAvailability 
                }
                console.log("payload", payLoad);
                axiosClient.post(`/updatemealavailability`, payLoad)
                    .then(() => {
                      window.location.reload();
                        // setMessage(data.message); 
                        // navigate('/Menu');
                    })
                    .catch((error) => {
                      console.error("Error fetching tables:", error);
                  });
              } 


                // const isAvailable = params.value === 1

                return <Switch
                        checked={params.value === 1}
                        onChange={handleSwitchToggle}
                      />
            }
        },
        {
            field:"actions",
            headerName:"Actions", 
            width:100,
            renderCell: (params) => {
                return <div className="flex">
                    <div className="view">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="green" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </div>
                    <div className="delete">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="red" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                </div>
            }
        },
    ];

    

    useEffect(() => {
        axiosClient.get('/user')
          .then(({ data }) => {
            setUser(data);
          });
    }, []);

    useEffect(() => {
        setLoading(true);
        if (user && user.id) {
          axiosClient.get(`/getMenu/${user.id}`)
            .then(({ data }) => {
              setMenu(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
            });
        }
    }, [user]);

    useEffect(() => {
        if (user && user.id) {
          axiosClient.get(`/getCategories/${user.id}`)
            .then(({ data }) => {
              setCategory(data);
              console.log("menu:", data)
            })
            .catch((error) => {
              console.error(error);
            });
        }
    }, [user]);








  return (
    <>
      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Menu</h1>
          <div className="loading-container">
            {loading && <p className="loading-text">Loading...</p>}
          </div>
        </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

            <div className="flex mb-5">
                <div className="w-[109px] h-[46px] relative mr-3">
                    <div className="w-[109px] h-[46px] left-0 top-0 absolute bg-green-500 rounded-[50px] border border-green-500"></div>
                    <div className="w-[55px] left-[24px] top-[8px] absolute text-center text-white text-xl font-semibold leading-normal">All</div>
                </div>

        {category.map((category) => (
            <div className="w-[150px] h-[46px] relative mr-3" key={category.id}>
                <div className="w-[150px] h-[46px] left-0 top-0 absolute bg-green-500 bg-opacity-10 rounded-[50px] border border-green-500" />
                <div className="w-[100px] h-[19px] left-[25px] top-[8px] absolute text-center text-green-500 text-xl font-semibold leading-normal">{category.category}</div>
            </div>
        ))}

                

                
            </div>

            
            <div className="w-[1253px] h-[72px] p-4 justify-start items-center gap-[1000px] inline-flex">
                <div className="h-8 justify-start items-start gap-6 flex">
                    {/* <div style={{width:'250px'}} className="grow shrink basis-0 h-8 px-[9px] py-2 rounded-lg border border-neutral-400 justify-start items-center gap-2 flex">
                    <div className="w-4 h-4 relative" />
                    <div className="grow shrink basis-0 text-neutral-400 text-xs font-medium">Search...</div>
                    </div> */}
                </div>
                <div className="px-3 py-2 bg-zinc-900 rounded-lg justify-center items-center gap-2 flex">
                    {/* <div className="w-4 h-4 relative" /> */}
                    <div className="text-white text-xs font-bold">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg> */}

                       <Link to="/addmenu"> Add meal</Link></div>
                </div>
            </div>
            
            <div className="dataTable">
                <DataGrid
                    rows={menu}
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
                    disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                />

            </div>

            </div>
        </main>
    </>
  )
}
