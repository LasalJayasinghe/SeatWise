import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";

import { useStateContext } from "../../context/ContextProvider";


export default function Structure() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);

  // pop up for the add view
  const [views, setViews] = useState([]);
  const [isAddViewModalOpen, setIsAddViewModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState(null);
  // const [tableId, setTableId] = useState(null);

  const [errors, setErrors] = useState(null);
  const {user, setUser } = useStateContext();

  const [loading, setLoading] = useState(false);
  

  const viewnameRef = useRef();
  const photoRef = useRef();
  const descriptionRef = useRef();

  // const tablenoRef = useRef();
  // const chairsRef = useRef();
  // const viewidRef = useRef();

  // function handleItemClick(itemNumber) {
  //   setIsModalOpen(true);
  //   setSelectedItem(itemNumber);
  //   setTableId(itemNumber);
  // }

  // function handleCloseModal() {
  //   setIsModalOpen(false);
  // }

  function handleAddViewModalOpen(view) {
    setIsAddViewModalOpen(true);
    setSelectedView(view);
  }

  function handleAddViewModalClose() {
    setIsAddViewModalOpen(false);
  }

  const onSubmitView = (ev) => {
    ev.preventDefault()
    // const payload = {
    //   restaurant_id: user.id,
    //   viewname: viewnameRef.current.value,
    //   photo: photoRef.current.files[0],
    //   description: descriptionRef.current.value,
    // }
    // console.log(payload);

    const formData = new FormData();
    formData.append('restaurant_id', user.id);
    formData.append('viewname', viewnameRef.current.value);
    formData.append('photo', photoRef.current.files[0]);
    formData.append('description', descriptionRef.current.value);
    setErrors(null)
    axiosClient.post('/structure', formData)
    .then((response) => {
      // Handle successful response here if needed
      // For example, show a success message or perform some action
      console.log('API response:', response.data);
      handleAddViewModalClose();
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

  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => {
        setUser(data)
        getViews(data.id);
        // if (tableId !== null) {
        //   isTableInStructure(data.id, tableId);
        // }
})
}, [])

  const getViews = (restaurant_id) => {
    if (!restaurant_id) {
      console.error("Restaurant ID not available.");
      return;
    }
  
    const payload = {
      restaurant_id: restaurant_id,
    };
    setLoading(true)
    axiosClient
      .get('/views', { params: payload })
      .then(({ data }) => {
        // console.log(data);
        // Assuming data is an array of views received from the API
        setViews(data);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching views:", error);
      });
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Table Structure</h1>
          <div className="loading-container">
            {loading && <p className="loading-text">Loading...</p>}
          </div>
        </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

          <h1 className="text-2xl font-bold">Add views for your restaurant</h1>
    
  
          <div className="flex space-x-2 ml-0 mr-0 relative">
              {/* <!-- Create Story Start --> */}
            
            {views.map((view) => (
              <div key={view.id} className="gallery">
                <a href="">
                  {/* <img src={"http://localhost:8000/" + view.photo} alt="Mountains" width="600" height="400" /> */}
                  <img src="/src/assets/add.jpeg" alt="Mountains" width="600" height="400" />
                </a>
                <div className="desc">{view.name} <br/> <font size="2"><i>{view.description}</i></font></div>
                {/* <div className="desc">{view.name}</div>
                <div className="desc">{view.description}</div> */}
              </div>
            ))}

              <div className="gallery">
                <div onClick={() => handleAddViewModalOpen()}>
                  <img src="/src/assets/images.jpeg" width="600" height="400" />
                </div>
                
                <div className="desc">Add View<br/></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" ml-auto mr-auto w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {/* <div className="desc">{view.name}</div>
                <div className="desc">{view.description}</div> */}
              </div>
            </div>

        
              
                {/* <!-- Create Story End --> */}

    
            {/* Add more input fields as needed for other table data */}

            {/* <img src={{ URL::assets("/uploads/views/1691605534.jpg")}} alt="image here" /> */}
            
              {/* Add view modal */}
              {isAddViewModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                      <h2>Popup Content for Add View {selectedView}</h2>
                      <h2 className="text-2xl font-bold">Create a view</h2>
                      <form onSubmit={onSubmitView} className="space-y-4" method="post" action="{{ route('structure.addView') }}">
                        <label className="block text-sm font-medium leading-6 text-gray-900 mt-0">View Name:</label>
                        <input ref={viewnameRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />
      
                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Add a photo:</label>
                        <input ref={photoRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="file" />
      
                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Add a description:</label>
                        <input ref={descriptionRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />
                        {/* Add more input fields as needed for other table data */}
                        <div className="flex space-x-4">
                        <button onClick={handleAddViewModalClose} className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm">Cancel</button>
                          <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create view</button>
                        </div>
                      </form>
                      
                    </div>
                </div>

              )}


                <br /><br /><br /><br />

            <div style={{ marginTop: '10px' }}>
              <a href="/tablestructure" className="font-semibold leading-6 text-gray-600 hover:text-indigo-500">
                <button style={{width: '300px'}} className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Set Table Structure {'>>'}
                </button>
              </a>
            </div>   
      
            
         
          </div>
          {/* </div> */}
        </main>
    </>
  )
}
