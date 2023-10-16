import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Switch from '@mui/material/Switch';
import OfferDeleteConfirmationModel from "../components/OfferDeleteConfirmationModel";
import SettingsBar from "../components/SettingsBar";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Complaints() {

    const {user, setUser} = useStateContext();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const [showConfirmationModalDelete, setShowConfirmationModalDelete] = useState(false);
    const [selectedComplaintForDelete, setSelectedComplaintForDelete] = useState(null);


    

    useEffect(() => {
      axiosClient.get('/user')
        .then(({ data }) => {
          setUser(data);
        });
    }, []);
  
  
     useEffect(() => {
      if (user && user.id) {
        axiosClient.get(`/getComplaints/${user.id}`)
          .then(({ data }) => {
              setComplaints(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [user]);
  


    const handleRemove = (complaintID) => {

      setSelectedComplaintForDelete(complaintID);
      setShowConfirmationModalDelete(true);
    };
  
    const cancelDelete = () => {
      setShowConfirmationModalDelete(false);
      setSelectedComplaintForDelete(null);
    };
    const confirmDelete = () => {
      setShowConfirmationModalDelete(false);
    //const shouldDelete = window.confirm("Are you sure you want to delete this cashier?");
    
    
      // User confirmed deletion, send a DELETE request to the deleteEmployee API endpoint
      axiosClient.post(`/deleteComplaint/${selectedComplaintForDelete}`)
        .then(response => {
          // Handle success (e.g., show a success message)
          console.log(response.data.message); // Display success message from the server
          
          // Fetch updated cashier data
          if (user && user.id) {
            axiosClient.get(`/getComplaints/${user.id}`)
              .then(({ data }) => {
                setComplaints(data);
              
        // Clear the selected complaint after successful deletion
       

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
    

   
  const columns = [
    { field: 'complaintID', headerName: 'complaint ID', width: 90 },
   
    {
      field: 'title',
      headerName: 'Complaint Title',
      width: 150,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      editable: false,
    
    },
   

    {
        field: 'user_email',
        headerName: 'User Email',
          width: 160,
        editable: false,
    },
  
    {
        field:"actions",
        headerName:"Actions", 
        width:130,
        renderCell: (params) => {
            return <div className="flex">
                          
<button  onClick={() => handleRemove(params.row.complaintID)}  style={{ marginLeft: '1rem'}}className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
Remove
</button>  
                
            </div>
        }
    },
];




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
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Complaints</h1>
                            <div className="loading-container">
                                {/* {loading && <p className="loading-text">Loading...</p>} */}
                            </div>
                        </div>
                    </header>
                </div>
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    
                  
            <div className="dataTable">
                <DataGrid
                    rows={complaints}
                    getRowId={(row) => row.complaintID}
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
                    style={{ maxWidth: '900px' }}
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
