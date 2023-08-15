import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";



export default function AddMenu() {

    const {user} = useStateContext();
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [category, setCategory] = useState([]);

    const addCategoryRef = useRef();
    const mealidRef = useRef();
    const nameRef = useRef();
    const categoryRef = useRef();
    const potionRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    function handleModalOpen() {
        setModalOpen(true);
      }
    
    function handleModalClose() {
    setModalOpen(false);
    }

    useEffect(() => {
        if (user && user.id) {
          axiosClient.get(`/getCategories/${user.id}`)
            .then(({ data }) => {
              setCategory(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }, [user]);

    const onSubmit = (ev) => {
        ev.preventDefault()
  
        const payLoad = {
          restaurant_id: user.id,
          meal_id: mealidRef.current.value,
          name: nameRef.current.value,
          category: categoryRef.current.value,
          potion: potionRef.current.value,
          price: priceRef.current.value,
          description: descriptionRef.current.value,
           
        }
        console.log("payload", payLoad);
        axiosClient.post('/addmeal', payLoad)
            .then(({data}) => {
                setMessage(data.message); 
                navigate('/Menu');
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

    const onSubmitCategory = (ev) => {
        ev.preventDefault()
  
        const payLoad = {
            restaurant_id: user.id,
            category: addCategoryRef.current.value,        
        }
        axiosClient.post('/addcategory', payLoad)
            .then(({data}) => {
                handleModalClose();
                setMessage(data.message); 
                // navigate('/Menu');
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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add Menu</h1>
            <div className="loading-container">
                {/* {loading && <p className="loading-text">Loading...</p>} */}
            </div>
        </div>
        </header>
        <main>
            <div className="mx-auto max-w-5xl py-6 sm:px-6 lg:px-8">

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">

                    <form onSubmit={onSubmit} className="space-y-3" action="#" method="POST">
                    <div className="flex mr-10">

                        <div className="mt-0 sm:w-full sm:max-w-sm ml-2">

                                {message && (
                                    <div className="alert">
                                        {message}
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Meal ID
                                    </label>
                                    <div className="mt-1" style={{width: '282px'}}>
                                        <input
                                        ref={mealidRef}
                                        id="meal_id"
                                        name="meal_id"
                                        type="text"
                                        placeholder="#1234"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Category
                                    </label>
                                    <div className="flex">
                                        <div className="mt-1 mb-3">
                                            <select ref={categoryRef} style={{width: '282px', height: '36px'}} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text">
                                            {category.map((category) => (
                                                <option key={category.id} value={category.category}>
                                                {category.category}
                                                </option>
                                            ))}
                                            </select>
                                        </div>
                                        <div>
                                            <svg onClick={() => handleModalOpen()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-7 h-7 ml-3 mt-2">
                                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Name
                                        </label>
                                    </div>
                                    <div className="mt-1" style={{width: '282px'}}>
                                        <input
                                        ref={nameRef}
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Name the meal"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Portion Size
                                        </label>
                                    </div>
                                    <div className="mt-1 mb-3" style={{width: '282px'}}>
                                        <select ref={potionRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text">
                                            <option value="S">Small</option>
                                            <option value="M">Medium</option>
                                            <option value="L">Large</option>
                                            <option value="Normal">Normal</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                    <div className="mt-1" style={{width: '282px'}}>
                                        <input
                                        ref={priceRef}
                                        id="price"
                                        name="price"
                                        type="text"
                                        placeholder="LKR"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-1" style={{width: '282px'}}>
                                        <textarea
                                        ref={descriptionRef}
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="   Add note"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                        </div>

                        <div className="add-menu"> 
                            <div className="text-slate-700 text-sm font-medium leading-tight">Image</div>
                            
                            {/* <div className="w-[196px] h-[196px] bg-zinc-100 rounded-[10px]" /> */}
                            {/* <img className="w-[110px] h-[110px]" src="https://via.placeholder.com/110x110" /> */}
                            <div className="w-[37px] h-[37px] relative" />
                            <div className="w-[195px] h-[135px] bg-gradient-to-b from-white to-white rounded-[10px] mb-10">
                                <img src="src/assets/download.png" alt="" />
                                <div style={{ position: 'relative' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="w-8 h-8" style={{ position: 'absolute', top: '50%', left: '100%', transform: 'translate(-50%, -50%)' }}>
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                    
                            <div className="mt-20 w-[195px] h-[90px] rounded-lg justify-end items-start inline-flex">
                                <div className="mt-10 px-5 py-3 bg-zinc-900 rounded-lg shadow justify-center items-center gap-2 flex">
                                    <button type="submit" className="text-white text-s font-semibold leading-5">Add meal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>            
                </div>

            </div>


            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="bg-white p-4 z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                            {/* <h2>Popup Content for Item </h2> */}

                            <h2 className="text-2xl font-bold">Add Category</h2>

                            <form onSubmit={onSubmitCategory} className="space-y-4">
                                <label htmlFor="table-name" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Category Name:</label>
                                <input ref={addCategoryRef} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" />

                                <div className="flex space-x-4">
                                    <button onClick={handleModalClose} className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm">Cancel</button>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Category</button>
                                </div>
                            </form>
                        </div>
                </div>
            )}
        </main>
    </>
  )
}
