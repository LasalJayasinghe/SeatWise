import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../components/restaurant/DeleteConfirmationModal";
import OffersUpdateModal from "../../components/OffersUpdateModal";
import SettingsBar from "../../components/restaurant/SettingsBar";
import StarIcon from '@mui/icons-material/Star';

import renderStarRatings from "../../components/restaurant/renderStarRatings";

import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function ViewRatings() {

    const {user, setUser} = useStateContext();
    const [loading, setLoading] = useState(false);  
    const [Ratings, setRatings] = useState([]);
    const [AverageRating, setAverageRating] = useState([]);
    const [errors, setErrors] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
   
    const navigate = useNavigate();
  
  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);


   useEffect(() => {
    if (user && user.id) {
      axiosClient.get(`/getRatings/${user.id}`)
        .then(({ data }) => {
          setRatings(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);


  useEffect(() => {
    if (user && user.id) {
      axiosClient.get(`/getAverageRating/${user.id}`)
        .then(({ data }) => {
          setAverageRating(data);

          console.log('Data from getAverageRating:', data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);






/*const handleRemove = (offerId) => {

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
  
};*/







//get the id of relevant cashier

/*const handleUpdate = (offerId) => {



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
  
    
  };*/



  const columns = [
    { field: 'rateID', headerName: 'Rate ID', width: 200 },
   
  
    {
      field: 'starCount',
      headerName: 'Rating',
      width: 360,
      renderCell: renderStarRatings,
    
    },
   

    
   {
    field: 'name',
    headerName: 'Customer Name',
      width: 200,
    editable: true,
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
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ratings</h1>
                            <div className="loading-container">
                                {/* {loading && <p className="loading-text">Loading...</p>} */}
                            </div>
                        </div>
                    </header>
                </div>
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <button  style={{ marginLeft: '60rem',
     marginTop: '3rem',
     fontSize: '1.3rem', // Increase font size
     padding: '1rem 1rem', // Increase padding vertically and horizontally
     borderRadius: '0.6rem',

     }}className="bg-white text-green-500 font-bold py-2 px-4 rounded">
Average Rating  ☆ {AverageRating}
</button>
    </div>            <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    
        
             
                <div className="dataTable">
                <DataGrid
                    rows={Ratings}
                    getRowId={(row) => row.rateID}
                    columns={columns}
                   // disableColumnReorder={true} // Disable column reordering
                  //  disableColumnResize={true} 
                    //autoFocus={false} 
                    style={{
                      width: '1230px',
                      // Remove the cell outline
                      
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
      

    </div>






        
    </>
)
}
