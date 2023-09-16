import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import CashierUpdateModal from "../components/CashierUpdateModal";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function CashierUpdate() {

    const {user, setUser} = useStateContext();
    const [loading, setLoading] = useState(false);  
    const [cashiers, setCashiers] = useState([]);
    const [errors, setErrors] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfirmationModalDelete, setShowConfirmationModalDelete] = useState(false);
    const [selectedCashierForUpdate, setSelectedCashierForUpdate] = useState(null);
    const [selectedCashierForDelete, setSelectedCashierForDelete] = useState(null);
    const navigate = useNavigate();
  
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);


   useEffect(() => {
    if (user && user.id) {
      axiosClient.get(`/getCashiers/${user.id}`)
        .then(({ data }) => {
          setCashiers(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

const handleClick = () =>{

navigate("/addCashier");

}




const handleRemove = (cashierId) => {

    setSelectedCashierForDelete(cashierId);
    setShowConfirmationModalDelete(true);
  };

  const cancelDelete = () => {
    setShowConfirmationModalDelete(false);
    setSelectedCashierForDelete(null);
  };
  const confirmDelete = () => {
    setShowConfirmationModalDelete(false);
  //const shouldDelete = window.confirm("Are you sure you want to delete this cashier?");
  
  
    // User confirmed deletion, send a DELETE request to the deleteEmployee API endpoint
    axiosClient.post(`/deleteEmployee/${selectedCashierForDelete}`)
      .then(response => {
        // Handle success (e.g., show a success message)
        console.log(response.data.message); // Display success message from the server
        
        // Fetch updated cashier data
        if (user && user.id) {
          axiosClient.get(`/getCashiers/${user.id}`)
            .then(({ data }) => {
              setCashiers(data);
            
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        // Handle error (e.g., show an error message)
        console.error('Error deleting cashier:', error);
      });
  
};







//get the id of relevant cashier

const handleUpdate = (cashierId) => {



  axiosClient.get(`/displayCashier/${cashierId}`)
    .then(({ data }) => {
      setSelectedCashierForUpdate(data);
      setShowUpdateModal(true);
      console.log("Fetched Cashier Data:", data);
    })
    .catch((error) => {
      console.error(error);
    });


    setSelectedCashierForUpdate(cashierId);
    setShowUpdateModal(true);
  };

  
    const cancelUpdate = () => {
      setShowUpdateModal(false);
      setSelectedCashierForUpdate(null);
    };
    const confirmUpdate = (updatedCashierData) => {
      setShowUpdateModal(false);
    //const shouldDelete = window.confirm("Are you sure you want to delete this cashier?");
    
 
      const payLoad = {
        id: updatedCashierData.id,
        cashiername: updatedCashierData.cashiername,
        email: updatedCashierData.email,
        phone: updatedCashierData.phone,
        password: updatedCashierData.password,
        password_confirmation: updatedCashierData.password_confirmation,
      };
      console.log(updatedCashierData.id);
      axiosClient.post('/updateCashier', payLoad)
        .then(({ data }) => {
          setMessage(data.message);
          // Update cashiers or perform any other necessary updates
          // ...
          if (user && user.id) {
            axiosClient.get(`/getCashiers/${user.id}`)
              .then(({ data }) => {
                setCashiers(data);
                window.location.reload(); 
              })
              .catch((error) => {
                console.error(error);
              });
          }
          setTimeout(() => {
            navigate('/Employees');
          }, 2000);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    
      // User confirmed deletion, send a DELETE request to the deleteEmployee API endpoint
  
    
  };



  const columns = [
    { field: 'id', headerName: 'Cashier ID', width: 90 },
   
    {
      field: 'cashier_name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'E mail',
      width: 300,
      editable: false,
    
    },
   

    
   {
    field: 'cashier_phone_number',
    headerName: 'Phone number',
      width: 260,
    editable: false,
},
    {
        field:"actions",
        headerName:"Actions", 
        width:190,
        renderCell: (params) => {
            return <div className="flex">
 <button
            onClick={() => handleUpdate(params.row.id)} 
            style={{ marginLeft: '0rem' }}
            className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>                           
<button 
  onClick={() => handleRemove(params.row.id)} style={{ marginLeft: '1rem'}}className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
Remove
</button>  
                
            </div>
        }
    },
];






  return (
    <>
      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Employees</h1>
          <div className="loading-container">
            
          </div>
        </div>
        </header>

        <main>
        <button onClick={handleClick} style={{ marginLeft: '73rem',
     marginTop: '3rem',
     fontSize: '1.3rem', // Increase font size
     padding: '1rem 1rem', // Increase padding vertically and horizontally
     borderRadius: '0.6rem',
     
     }}className="bg-white text-green-500 font-bold py-2 px-4 rounded">
 + Add Cashier
</button>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

            <div className="flex mb-5">
                

        
                

                
            </div>

            
            <div className="w-[1253px] h-[72px] p-4 justify-start items-center gap-[1000px] inline-flex">
                <div className="h-8 justify-start items-start gap-6 flex">
                    {/* <div style={{width:'250px'}} className="grow shrink basis-0 h-8 px-[9px] py-2 rounded-lg border border-neutral-400 justify-start items-center gap-2 flex">
                    <div className="w-4 h-4 relative" />
                    <div className="grow shrink basis-0 text-neutral-400 text-xs font-medium">Search...</div>
                    </div> */}
                </div>
           
            </div>
            
            <div className="dataTable">
                <DataGrid
                    rows={cashiers}
                    getRowId={(row) => row.id}
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
            <CashierUpdateModal
        isOpen={showUpdateModal}
        onCancel={cancelUpdate}
        onConfirm={confirmUpdate}
        cashier={selectedCashierForUpdate}
        
        
       
      />
<DeleteConfirmationModal
        isOpen={showConfirmationModalDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
        </main>
    </>
  )
}
