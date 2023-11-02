import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Switch from '@mui/material/Switch';
import ComplaintUpdateModal from "../../components/restaurant/ComplaintUpdateModal";
import SettingsBar from "../../components/restaurant/SettingsBar";

import ComplaintDeleteConfirmationModal from "../../components/restaurant/ComplaintDeleteConfirmationModal";
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Complaints() {

    const {user, setUser} = useStateContext();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfirmationModalDelete, setShowConfirmationModalDelete] = useState(false);
    const [selectedComplaintForDelete, setSelectedComplaintForDelete] = useState(null);
    const [selectedComplaintForUpdate, setSelectedComplaintForUpdate] = useState(null);


    

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
  //const shouldDelete = window.confirm("Are you sure you want to delete this Complaint?");
  
  
    // User confirmed deletion, send a DELETE request to the deleteEmployee API endpoint
    axiosClient.post(`/deleteComplaint/${selectedComplaintForDelete}`)
      .then(response => {
        // Handle success (e.g., show a success message)
        console.log(response.data.message); // Display success message from the server
        
        // Fetch updated Complaint data
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
        console.error('Error deleting Complaint:', error);
      });
  
};
  






//get the id of relevant Complaint

const handleUpdate = (complaintID) => {



  axiosClient.get(`/displayComplaint/${complaintID}`)
    .then(({ data }) => {
      setSelectedComplaintForUpdate(data);
      setShowUpdateModal(true);
      console.log("Fetched Complaint Data:", data);
    })
    .catch((error) => {
      console.error(error);
    });


    setSelectedComplaintForUpdate(complaintID);
    setShowUpdateModal(true);
  };

  
    const cancelUpdate = () => {
      setShowUpdateModal(false);
      setSelectedComplaintForUpdate(null);
    };
    const confirmUpdate = (updatedComplaintData) => {
      setShowUpdateModal(false);
    //const shouldDelete = window.confirm("Are you sure you want to delete this Complaint?");
    
 
      const payLoad = {
      id: updatedComplaintData.id,
        reply :updatedComplaintData.reply,
        //title: updatedComplaintData.title,
        //user_email:updatedComplaintData.user_email,
        //description:updatedComplaintData.description,

    
      };
      console.log(updatedComplaintData.id);
      axiosClient.post('/replyComplaint', payLoad)
        .then(({ data }) => {
          setMessage(data.message);
          // Update Complaints or perform any other necessary updates
          // ...
          if (user && user.id) {
            axiosClient.get(`/getComplaints/${user.id}`)
              .then(({ data }) => {
                setComplaints(data);
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
    { field: 'id', headerName: 'complaint ID', width: 130 },
   
    {
      field: 'title',
      headerName: 'Complaint Title',
      width: 170,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 180,
      editable: false,
    
    },
   

    {
        field: 'user_email',
        headerName: 'User Email',
          width: 160,
        editable: false,
    },

    {
      field: 'reply',
      headerName: 'Reply',
        width: 160,
      editable: false,
  },
 
  
    {
        field:"actions",
        headerName:"Actions", 
        width:260,
        renderCell: (params) => {
            return <div className="flex">

  <button  onClick={() => handleUpdate(params.row.id)}  style={{ marginLeft: '1rem'}}className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
Reply
</button>                    
<button  onClick={() => handleRemove(params.row.id)}  style={{ marginLeft: '1rem'}}className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
Remove
</button>  
                
            </div>
        }
    },
];






  return (
    <>
      <header className="bg-white shadow">
        
        </header>

        <main>
   
         
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
                    getRowId={(row) => row.id}
                    columns={columns}
                    style={{ maxWidth: '1200px' }}
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

                
                
            </div>
        </div>

        

        {/* <Footer /> */}
  

            <ComplaintUpdateModal
        isOpen={showUpdateModal}
        onCancel={cancelUpdate}
        onConfirm={confirmUpdate}
        complaint={selectedComplaintForUpdate}
        
        
       
      />
<ComplaintDeleteConfirmationModal
        isOpen={showConfirmationModalDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
        </main>
    </>
  )
}
