import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import OfferDeleteConfirmationModel from "../../components/OfferDeleteConfirmationModel";
import OffersUpdateModal from "../../components/OffersUpdateModal";
import SettingsBar from "../../components/restaurant/SettingsBar";

import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function ViewOffers() {

    const {user, setUser} = useStateContext();
    const [loading, setLoading] = useState(false);  
    const [offers, setOffers] = useState([]);
    const [errors, setErrors] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showConfirmationModalDelete, setShowConfirmationModalDelete] = useState(false);
    const [selectedOfferForUpdate, setSelectedOfferForUpdate] = useState(null);
    const [selectedOfferForDelete, setSelectedOfferForDelete] = useState(null);
    const navigate = useNavigate();
  
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);


   useEffect(() => {
    if (user && user.id) {
      axiosClient.get(`/getOffers/${user.id}`)
        .then(({ data }) => {
          setOffers(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

const handleClick = () =>{

navigate("/addOffer");

}




const handleRemove = (offerId) => {

    setSelectedOfferForDelete(offerId);
    setShowConfirmationModalDelete(true);
  };

  const cancelDelete = () => {
    setShowConfirmationModalDelete(false);
    setSelectedOfferForDelete(null);
  };
  const confirmDelete = () => {
    setShowConfirmationModalDelete(false);
  //const shouldDelete = window.confirm("Are you sure you want to delete this cashier?");
  
  
    // User confirmed deletion, send a DELETE request to the deleteEmployee API endpoint
    axiosClient.post(`/deleteOffer/${selectedOfferForDelete}`)
      .then(response => {
        // Handle success (e.g., show a success message)
        console.log(response.data.message); // Display success message from the server
        
        // Fetch updated cashier data
        if (user && user.id) {
          axiosClient.get(`/getOffers/${user.id}`)
            .then(({ data }) => {
              setOffers(data);
            
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch(error => {
        // Handle error (e.g., show an error message)
        console.error('Error deleting offers:', error);
      });
  
};







//get the id of relevant cashier

const handleUpdate = (offerId) => {



  axiosClient.get(`/displayOffer/${offerId}`)
    .then(({ data }) => {
        setSelectedOfferForUpdate(data);
      setShowUpdateModal(true);
      console.log("Fetched offers Data:", data);
    })
    .catch((error) => {
      console.error(error);
    });


    setSelectedOfferForUpdate(offerId);
    setShowUpdateModal(true);
  };

  
    const cancelUpdate = () => {
      setShowUpdateModal(false);
      setSelectedOfferForUpdate(null);
    };
    const confirmUpdate = (updatedOffersData) => {
      setShowUpdateModal(false);
    //const shouldDelete = window.confirm("Are you sure you want to delete this cashier?");
    
 
      const payLoad = {
        id: updatedOffersData.id,
        meal: updatedOffersData.meal,
        offer_type: updatedOffersData.offer_type,
        offer_title: updatedOffersData.offer_title,
        offer_percentage: updatedOffersData.offer_percentage,
        offer_description: updatedOffersData.offer_description,
        start_date: updatedOffersData.start_date,
        end_date: updatedOffersData.end_date,
        days_of_week: updatedOffersData.days_of_week,
        minimum_purchase_amount: updatedOffersData.minimum_purchase_amount,
      
      };
      console.log(updatedOffersData.id);
      axiosClient.post('/updateOffer', payLoad)
        .then(({ data }) => {
          setMessage(data.message);
          // Update cashiers or perform any other necessary updates
          // ...
          if (user && user.id) {
            axiosClient.get(`/getOffers/${user.id}`)
              .then(({ data }) => {
                setOffers(data);
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
    { field: 'id', headerName: 'Offer ID', width: 90 },
   
    {
      field: 'meal',
      headerName: 'Meal',
      width: 70,
      editable: true,
    },
    {
      field: 'offer_type',
      headerName: 'Offer Type',
      width: 100,
      editable: true,
    
    },
   

    
   {
    field: 'offer_percentage',
    headerName: 'Offer Percentage',
      width: 140,
    editable: true,
},


{
    field: 'start_date',
    headerName: 'Start Date',
      width: 100,
    editable: true,
},


{
    field: 'end_date',
    headerName: 'End Date',
      width: 100,
    editable: true,
},

{
    field: 'days_of_week',
    headerName: 'days_of_week',
      width: 100,
    editable: true,
},

{
    field: 'minimum_purchase_amount',
    headerName: 'Minimum Purchase Amount',
      width: 170,
    editable: true,
},

    {
        field:"actions",
        headerName:"Actions", 
        width:200,
        renderCell: (params) => {
            return <div className="flex">
 <button
            onClick={() => handleUpdate(params.row.id)} 
            style={{ marginLeft: '0rem',  outline: 'none',}}
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

    <div className="main">
        

        <div className="ordercontainer">
            <div className="menuContainer">
                <SettingsBar />
            </div>
            <div className="contentContainer">
                <div>
                    <header className="bg-white shadow">
                        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Offers</h1>
                            <div className="loading-container">
                                {/* {loading && <p className="loading-text">Loading...</p>} */}
                            </div>
                        </div>
                    </header>
                </div>
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <button onClick={handleClick} style={{ marginLeft: '60rem',
     marginTop: '3rem',
     fontSize: '1.3rem', // Increase font size
     padding: '1rem 1rem', // Increase padding vertically and horizontally
     borderRadius: '0.6rem',

     }}className="bg-white text-green-500 font-bold py-2 px-4 rounded">
 + Add Offers
</button>
    </div>            <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    
        
             
                <div className="dataTable">
                <DataGrid
                    rows={offers}
                    getRowId={(row) => row.id}
                    columns={columns}
                   // disableColumnReorder={true} // Disable column reordering
                  //  disableColumnResize={true} 
                    //autoFocus={false} 
                    style={{
                      width: '1230px',
                      // Remove the cell outline
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
                    //style={{ maxWidth: '900px' }}
                />

            </div>
                </div>

                
                
            </div>
        </div>

        

        {/* <Footer /> */}
        <OffersUpdateModal
        isOpen={showUpdateModal}
        onCancel={cancelUpdate}
        onConfirm={confirmUpdate}
        //offers={setSelectedOfferForUpdate}
        Offer={selectedOfferForUpdate}



      />
<OfferDeleteConfirmationModel
        isOpen={showConfirmationModalDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>






        
    </>
)
}
