import SettingsBar from "../../components/restaurant/SettingsBar";
import adimage from '../../assets/slide2.png'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function Advertisement() {

    const {user, setUser } = useStateContext();
    const [loading, setLoading] = useState(false);
    const [adds, setAdds] = useState([]);

    const [selectedAdd, setSelectedAdd] = useState(null);

    const [isopenConfimModal, setopenConfimModal] = useState(false);

    function handleAddModalOpen(id) {
        setopenConfimModal(true);
        setSelectedAdd(id);
    }
    
      function handleAddModalClose() {
        setopenConfimModal(false);
        setSelectedAdd(null);
      }

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
            getAdvertisements(data.id);
    })
    }, [])

    const getAdvertisements = (restaurant_id) => {
        if (!restaurant_id) {
          console.error("Restaurant ID not available.");
          return;
        }
      
        const payload = {
          restaurant_id: restaurant_id,
        };
        setLoading(true)
        axiosClient
          .get('/adds', { params: payload })
          .then(({ data }) => {
            setAdds(data);
            setLoading(false)
          })
          .catch((error) => {
            console.error("Error fetching views:", error);
          });
    };


    // const addRemove = (addId) => {

    //     setSelectedAdd(addId);
    //     setopenConfimModal(true)
    // };

    const onConfirmDelete = (ev) => {
        ev.preventDefault()

        axiosClient.post(`/deleteAdd/${selectedAdd}`)
        console.log(selectedAdd)
        .then((response) => {
          handleAddModalClose();
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
    <div className="main">
        

        <div className="ordercontainer">
            <div className="menuContainer">
                <SettingsBar />
            </div>
            <div className="contentContainer">
                <div>
                    <header className="bg-white shadow">
                        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Advertisements</h1>
                            <div className="loading-container">
                                {/* {loading && <p className="loading-text">Loading...</p>} */}
                            </div>
                        </div>
                    </header>
                </div>
                <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    
                    {/* Advertisement content start */}

                        <div className='px-20'>
                            {/* <h1 className='text-2xl font-bold '>Advertisements</h1>
                            <p className='text-gray-500'>Description goes here</p> */}
                            <div className="flex justify-start px-100 my-5">
                                <div className="flex items-center space-x-2">
                                    <Link to="/addadd" className="flex items-center space-x-2">
                                        <button className="flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-200 rounded-lg hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400">
                                            <span className="text-3xl">+</span>
                                        </button>
                                        <span className="font-bold text-gray-700">Add banner</span>
                                    </Link>
                                </div>
                        </div>

                        <div className="flex">

                        
                        
                        {adds.map((add) => {
                            const timestamp = add.updated_at;
                            const datePart = timestamp.split('T')[0];
                            
                            return (
                                    <div key={add.id} className="mt-11 mr-5 w-96 transform overflow-hidden rounded-lg bg-white duration-300 hover:scale-105 hover:shadow-lg">
                                        <img className="h-20 w-full object-cover object-center" src={adimage} alt="Product Image" />
                                        <div className="p-4">
                                            <div className="flex items-center">
                                                <p className="text-xs text-gray-500 mr-5">
                                                    <span className='text-xl font-bold text-gray-800'>509&nbsp;</span> views <br />
                                                    Posted on {datePart}
                                                </p>
                                                <p className="text-xs text-gray-500 mr-5">
                                                    <span className='text-xl font-bold text-red-700'>{add.duration}&nbsp;</span> more<br />
                                                    Expire on 21/08/2023
                                                </p>
                                                <button onClick={() => handleAddModalOpen(add.id)} className="bg-red-100 hover:bg-red-500 text-red-500 hover:text-white font-semibold py-2 px-4 rounded">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                
                                
                            );
                        })}

                        </div>



                    
                        </div>

                    {/* Advertisement content end */}
        
                </div>

                {isopenConfimModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-4 z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                        <h2>Popup Content for delete Advertisement {selectedAdd}</h2>
                        <h2 className="text-2xl font-bold">Are you sure you wantt to delete this?</h2>
                        <form onSubmit={onConfirmDelete} className="space-y-4" method="post">
                                <div className="flex space-x-4 mt-3">
                                        <button onClick={handleAddModalClose} className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm">No</button>
                                        <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Yes</button>
                                </div>
                        </form>
                        
                        </div>
                    </div>

                )}

                
                
            </div>
        </div>
        {/* <Footer /> */}
    </div>    
    </>
  )
}
