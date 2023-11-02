import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";

import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Menu() {

    const {user, setUser} = useStateContext();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [errors, setErrors] = useState(null);
    
    const columns = [
        { field: 'id', headerName: 'Meal ID', width: 50
       },
        {
            field:"avatar", headerName:"Avatar", width:70,
            renderCell: (params) => {
                return <img src={params.row.img || "src/assets/meal.jpg" } alt="" />
            }
        },
        {
          field: 'name',
          headerName: 'Meal Name',
          width: 170,
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
            width: 120,
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
          field: "actions",
          headerName: "Actions",
          width: 200, // Adjust the width according to your needs
          renderCell: (params) => (
            <div className="flex">
              <button
                onClick={() => handleUpdateModalOpen(params.row.id)} // Assuming id is a property of the row data
                style={{ marginRight: '1rem' }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteModalOpen(params.row.id)}
                className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          )
        }
        
    ];

    const [selectedUpdate, setSelectedUpdate] = useState(null);
    const [selectedDelete, setSelectedDelete] = useState(null);
    const [isopenUpdateModal, setopenUpdateModal] = useState(false);
    const [isopenDeleteModal, setopenDeleteModal] = useState(false);

    function handleUpdateModalOpen(id) {
      setopenUpdateModal(true);
      setSelectedUpdate(id);
    }
    
    function handleUpdateModalClose() {
      setopenUpdateModal(false);
      setSelectedUpdate(null);
    }

    function handleDeleteModalOpen(id) {
      setopenDeleteModal(true);
      setSelectedDelete(id);
    }
    
    function handleDeleteModalClose() {
      setopenDeleteModal(false);
      setSelectedDelete(null);
    }

    const nameRef = useRef();
    const potionRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    

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
              console.log(menu);
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

    const onSubmitEdit = (ev) => {
      ev.preventDefault();

      const payload = {
        id: selectedUpdate,
        restaurant_id: user.id,
        name: nameRef.current.value,
        potion: potionRef.current.value,
        price: priceRef.current.value,
        description: descriptionRef.current.value,
      }
      // console.log(payload);
      setErrors(null)
      axiosClient.post('/updatemenu', payload)
      .then((response) => {
        console.log('API response:', response.data);
        handleUpdateModalClose();
        window.location.reload();
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if(response.data.errors)
          {
            setErrors(response.data.errors)
          }else{
            setErrors({
              email: [response.data.message]
            })
          }
        }
        })
    }

    const onSubmitDelete = (ev) => {
      ev.preventDefault();

      setErrors(null)
      axiosClient.post(`/deleteAdd/${selectedDelete}`)
      .then((response) => {
        console.log('API response:', response.data);
        handleDeleteModalClose();
        window.location.reload();
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if(response.data.errors)
          {
            setErrors(response.data.errors)
          }else{
            setErrors({
              email: [response.data.message]
            })
          }
        }
        })
    }








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

            {menu.map((menu) => {
              return (
                isopenUpdateModal && menu.id === selectedUpdate && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                      <h2>Popup Content for Add View {selectedUpdate}</h2>
                      <h2 className="text-2xl font-bold">Update a Menu Item</h2>
                      <form 
                        onSubmit={onSubmitEdit} 
                        className="space-y-4" 
                        method="post" 
                        action="{{ route('structure.addView') }}"
                      >
                        <label className="block text-sm font-medium leading-6 text-gray-900 mt-0">Name:</label>
                        <input 
                          ref={nameRef}
                          defaultValue={menu.name} 
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                          type="text" 
                        />

                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Portion size:</label>
                        <input 
                          ref={potionRef} 
                          defaultValue={menu.potion} 
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                          type="text" 
                        />

                        <label className="block text-sm font-medium leading-6 text-gray-900 mt-0">Price:</label>
                        <input 
                          ref={priceRef} 
                          defaultValue={menu.price} 
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                          type="text" 
                        />

                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Add a description:</label>
                        <input 
                          ref={descriptionRef} 
                          defaultValue={menu.description} 
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                          type="text" 
                        />
                        {/* Add more input fields as needed for other menu item data */}
                        <div className="flex space-x-4">
                          <button 
                            onClick={handleUpdateModalClose} 
                            className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              );
            })}

              {isopenDeleteModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                      <h2>Popup Content for Add View {selectedDelete}</h2>
                      <h2 className="text-2xl font-bold">Are you sure you want to delete?</h2>
                      <form 
                        onSubmit={onSubmitDelete} 
                        className="space-y-4" 
                        method="post" 
                      >
                        <br />
                        
                        {/* Add more input fields as needed for other menu item data */}
                        <div className="flex space-x-4">
                          <button 
                            onClick={handleDeleteModalClose} 
                            className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Delete
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              }


            </div>
        </main>
    </>
  )
}
