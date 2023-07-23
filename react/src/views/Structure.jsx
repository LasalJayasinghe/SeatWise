import { useState } from "react";


export default function Structure() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleItemClick(itemNumber) {
    setIsModalOpen(true);
    setSelectedItem(itemNumber);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }


  return (
    <>
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Table Structure</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

          <h1 className="text-2xl font-bold">Add views for your restaurant</h1>
          <form className="space-y-4"> <br />
  
            <div className="flex space-x-2 ml-0 max-w-2xl relative">
                {/* <!-- Create Story Start --> */}
                <div className="w-36 h-52 rounded-xl overflow-hidden flex flex-col group cursor-pointer relative">
                    <input className="w-full h-4/5 object-cover transition duration-300 ease-in-out transform group-hover:scale-105 bg-gray-300 mb-0" />
                    <div className="bg-green-500 relative flex-1 flex flex-col">
                        <div className="bg-green-600 p-0.5 rounded-full border-4 border-gray-100 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        </div>
                        <div className="flex-1 pb-1 text-white text-sm font-semibold capitalize flex justify-center items-end">
                            <p>
                                Add view
                            </p>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"></div>
              </div>
            </div>
                {/* <!-- Create Story End --> */}

    
            {/* Add more input fields as needed for other table data */}
            
          </form>

          <br /><br /><br />




            <h1 className="text-1xl font-bold">Arrange your table Structure</h1>

              <p>Select according to your restaurant table staructure</p>

              <p>Add table count with necessary details</p>

              <div className="grid-container">
              <div className="grid-item" onClick={() => handleItemClick(1)}>1</div>
              <div className="grid-item" onClick={() => handleItemClick(2)}>2</div>
              <div className="grid-item" onClick={() => handleItemClick(3)}>3</div>  
              <div className="grid-item" onClick={() => handleItemClick(4)}>4</div>
              <div className="grid-item" onClick={() => handleItemClick(5)}>5</div>
              <div className="grid-item" onClick={() => handleItemClick(6)}>6</div>  
              <div className="grid-item" onClick={() => handleItemClick(7)}>7</div>
              <div className="grid-item" onClick={() => handleItemClick(8)}>8</div>
              <div className="grid-item" onClick={() => handleItemClick(9)}>9</div> 
              <div className="grid-item" onClick={() => handleItemClick(10)}>10</div>
              <div className="grid-item" onClick={() => handleItemClick(11)}>11</div>
              <div className="grid-item" onClick={() => handleItemClick(12)}>12</div>
              <div className="grid-item" onClick={() => handleItemClick(13)}>13</div>  
              <div className="grid-item" onClick={() => handleItemClick(14)}>14</div>
              <div className="grid-item" onClick={() => handleItemClick(15)}>15</div>
              <div className="grid-item" onClick={() => handleItemClick(16)}>16</div>  
              <div className="grid-item" onClick={() => handleItemClick(17)}>17</div>
              <div className="grid-item" onClick={() => handleItemClick(18)}>18</div>
              <div className="grid-item" onClick={() => handleItemClick(19)}>19</div>  
              <div className="grid-item" onClick={() => handleItemClick(20)}>20</div>
              <div className="grid-item" onClick={() => handleItemClick(21)}>21</div>
              <div className="grid-item" onClick={() => handleItemClick(22)}>22</div>
              <div className="grid-item" onClick={() => handleItemClick(23)}>23</div>  
              <div className="grid-item" onClick={() => handleItemClick(24)}>24</div>
              <div className="grid-item" onClick={() => handleItemClick(25)}>25</div>
              <div className="grid-item" onClick={() => handleItemClick(26)}>26</div>  
              <div className="grid-item" onClick={() => handleItemClick(27)}>27</div>
              <div className="grid-item" onClick={() => handleItemClick(28)}>28</div>
              <div className="grid-item" onClick={() => handleItemClick(29)}>29</div>  
              <div className="grid-item" onClick={() => handleItemClick(30)}>30</div>
              <div className="grid-item" onClick={() => handleItemClick(31)}>31</div>
              <div className="grid-item" onClick={() => handleItemClick(32)}>32</div>
              <div className="grid-item" onClick={() => handleItemClick(33)}>33</div>  
              <div className="grid-item" onClick={() => handleItemClick(34)}>34</div>
              <div className="grid-item" onClick={() => handleItemClick(35)}>35</div>
              <div className="grid-item" onClick={() => handleItemClick(36)}>36</div>  
              <div className="grid-item" onClick={() => handleItemClick(37)}>37</div>
              <div className="grid-item" onClick={() => handleItemClick(38)}>38</div>
              <div className="grid-item" onClick={() => handleItemClick(39)}>39</div> 
              <div className="grid-item" onClick={() => handleItemClick(40)}>40</div>
              <div className="grid-item" onClick={() => handleItemClick(41)}>41</div>
              <div className="grid-item" onClick={() => handleItemClick(42)}>42</div>
              <div className="grid-item" onClick={() => handleItemClick(43)}>43</div>  
              <div className="grid-item" onClick={() => handleItemClick(44)}>44</div>  
              </div>

              {/* popup */}
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-4 z-10 mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-lg">
                      <h2>Popup Content for Item {selectedItem}</h2>
                      <h2 className="text-2xl font-bold">Create Table</h2>
                      <form className="space-y-4">
                        <label htmlFor="table-name" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Table No:</label>
                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" id="table-name" name="table-name" />
      
                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">No of chairs:</label>
                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="number" id="capacity" name="capacity" />
      
                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900 mt-0">Select view:</label>
                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" id="capacity" name="capacity" />
                        {/* Add more input fields as needed for other table data */}
                        <div className="flex space-x-4">
                        <button onClick={handleCloseModal} className="flex w-full justify-center rounded-md bg-white rounded-lg shadow border border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm">Cancel</button>
                          <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create table</button>
                        </div>
                      </form>
                      
                    </div>
                </div>

                // <div className="fixed inset-0 flex items-center justify-center z-50">
                //   <div className="absolute inset-0 bg-black opacity-50"></div>
                //   <div className="bg-white p-4 z-10">
                //     <h2>Popup Content for Item {selectedItem}</h2>
                //     {/* Add your custom content for the popup here */}
                //     <button onClick={handleCloseModal}>Close</button>
                //   </div>
                // </div>
              )}
          </div>
        </main>
    </>
  )
}
