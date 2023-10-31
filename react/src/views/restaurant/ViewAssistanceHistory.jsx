import { useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../components/restaurant/DeleteConfirmationModal";
import RequestViewModal from "../../components/restaurant/RequestViewModal";
import ReplyViewModal from "../../components/restaurant/ReplyViewModal";
import SettingsBar from "../../components/restaurant/SettingsBar";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function  ViewAssistanceHistory() {

  const {user, setUser} = useStateContext();
  const [loading, setLoading] = useState(false);  
  const [Requests, setRequests] = useState([]);
  const [errors, setErrors] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  ;
  const [showReplyViewModal, setShowReplyViewModal] = useState(false);
  //const [showConfirmationModalDelete, setShowConfirmationModalDelete] = useState(false);
  const [selectedRequestForView, setSelectedRequestForView] = useState(null);
  const [selectedReplyForView, setSelectedReplyForView] = useState(null)
    const navigate = useNavigate();
  
    useEffect(() => {
      axiosClient.get('/user')
        .then(({ data }) => {
          setUser(data);
        });
    }, []);
  
  
     useEffect(() => {
      if (user && user.id) {
        axiosClient.get(`/getAssistanceData/${user.id}`)
          .then(({ data }) => {
            setRequests(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, [user]);
  
  const handleClick = () =>{
  
  navigate("/AddTechnicalAssistance");
  
  }
  



  function handleRemove(RequestId) {
    // Make API call to update the check-out value in the database
    axiosClient.post(`/handleStatusUpdate/${RequestId}`)
      .then(response => {
        //setClickedButtonIdOne(reservationId); 
        if (user && user.id) {
          axiosClient.get(`/getAssistanceData/${user.id}`)
            .then(({ data }) => {
              setRequests(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
            
    
      })
      .catch(error => {
        console.error(error);
        
      });
          
  }








//get the id of relevant cashier

const handleView1 = (RequestId) => {



  axiosClient.get(`/displayRequest/${RequestId}`)
    .then(({ data }) => {
        setSelectedRequestForView(data);
      setShowViewModal(true);
      console.log("Fetched request Data:", data);
    })
    .catch((error) => {
      console.error(error);
    });


   // setSelectedRequestForView(RequestId);
    //setShowViewModal(true);
  };

  
    const cancelView1 = () => {
      setShowViewModal(false);
      setSelectedRequestForView(null);
    };




    const handleView2 = (RequestId) => {



      axiosClient.get(`/displayRequest/${RequestId}`)
        .then(({ data }) => {
            setSelectedReplyForView(data);
          setShowReplyViewModal(true);
          console.log("Fetched request Data:", data);
        })
        .catch((error) => {
          console.error(error);
        });
    
    
       // setSelectedRequestForView(RequestId);
        //setShowViewModal(true);
      };
    
      
        const cancelView2 = () => {
          setShowReplyViewModal(false);
          setSelectedReplyForView(null);
        };
    
        /*const confirmSolved = (updatedData) => {
          setShowReplyViewModal(false);
        //const shouldDelete = window.confirm("Are you sure you want to delete this cashier?");
        
     
          const payLoad = {
            id: updatedData.id,
            //status:1,
           
          };
          console.log(updatedData.id);
          axiosClient.post('/updateAssistanceData', payLoad)
            .then(({ data }) => {
              setMessage(data.message);
              // Update cashiers or perform any other necessary updates
              // ...
              if (user && user.id) {
                axiosClient.get(`/getAssistanceData/${user.id}`)
                  .then(({ data }) => {
                    setRequests(data);
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
      
        
      };*/
  const columns = [
    { field: 'id', headerName: 'Request ID', width: 400 },
   
    {
      field: 'updated_at',
      headerName: 'Date',
      width: 150,
      editable: true,
    },
    
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      editable: true,
    
    },
   

    
    {
        field:"actions",
        headerName:"Actions", 
        width:390,
        renderCell: (params) => {
            return <div className="flex">
 <button
            onClick={() => handleView1(params.row.id)} 
            style={{ marginLeft: '0rem' }}
            className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
           View request
          </button>   

           <button
            onClick={() => handleView2(params.row.id)} 
            style={{ marginLeft: '2rem' }}
            className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded"
          >
          View Reply
          </button>                           
<button 
  onClick={() => handleRemove(params.row.id)} style={{ marginLeft: '1rem'}}className="bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
Not Solved
</button>  
                
            </div>
        }
    },
];



  return (
    <>
    
        <main>
        <div className="ordercontainer">
        <div className="menuContainer">
       
                <SettingsBar />
            </div>
        <div>
                    <header className="bg-white shadow">
                        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Technical Assistance</h1>
                            <div className="loading-container">
                                {/* {loading && <p className="loading-text">Loading...</p>} */}
                            </div>
                        </div>
                    </header>
            
            <div className="contentContainer">
        <button onClick={handleClick} style={{ marginLeft: '63rem',
     marginTop: '3rem',
     fontSize: '1.3rem', // Increase font size
     padding: '1rem 1rem', // Increase padding vertically and horizontally
     borderRadius: '0.6rem',
     
     }}className="bg-white text-green-500 font-bold py-2 px-4 rounded">
 + Add Requests
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
                    rows={Requests}
                    getRowId={(row) => row.id}
                    columns={columns}
                    style={{
                      width: '1100px',
                      '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                      },
                    }}
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
            </div>
            <RequestViewModal
        isOpen={showViewModal}
        onCancel={cancelView1}
       // onConfirm={confirmUpdate}
        Request={selectedRequestForView}
        
        
       
      />

<ReplyViewModal
        isOpen={showReplyViewModal}
        onCancel={cancelView2}
    //    onConfirm={confirmSolved}
        Request={selectedReplyForView}
        
        
       
      />

        </main>
    </>
  )
}
