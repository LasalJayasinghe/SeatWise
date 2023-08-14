import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";


export default function Reservations() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState([]);

  const [errors, setErrors] = useState(null);
  const {user, setUser } = useStateContext();

  const [loading, setLoading] = useState(false);
  
  function handleItemClick(itemNumber) {
    setIsModalOpen(true);
    setSelectedItem(itemNumber);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }


  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => {
        setUser(data)
        // getViews(data.id);
        fetchTableData(data.id);
    })
    }, [])

    // const getViews = (restaurant_id) => {
    //     if (!restaurant_id) {
    //     console.error("Restaurant ID not available.");
    //     return;
    //     }
  
    //     const payload = {
    //     restaurant_id: restaurant_id,
    //     };
        
    //     axiosClient
    //     .get('/views', { params: payload })
    //     .then(({ data }) => {
    //         setViews(data);
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching views:", error);
    //     });
    // };

    const fetchTableData = (restaurant_id) => {
      setLoading(true);
        axiosClient
        .get("/gettable", { params: { restaurant_id } })
        .then(({ data }) => {
            // console.log("Fetched table data:", data);
            setTableData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching tables:", error);
        });
    };

    

    const isTableInStructure = (tableNumber) => {
        // const parsedTableNumber = parseInt(tableNumber, 10);
        return tableData.some((table) => (table.table_id) === String(tableNumber));
      };

  return (
    <>
      <header className="bg-white shadow">
        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reservations</h1>
          <div className="loading-container">
            {loading && <p className="loading-text">Loading...</p>}
          </div>
        </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

            <div className="flex gap-10">
              <div className="mr-10">
                <h1 className="text-1xl font-bold">Arrange your table Structure</h1>

                <p>Select according to your restaurant table staructure</p>

                <p>Add table count with necessary details</p>
              </div>

              <div className="flex ml-20">
                <div className="w-[131.04px] h-[33.46px] relative">
                  {/* <div className="w-5 h-5 left-0 top-[2.79px] absolute bg-gray-200 rounded-[10px]" />
                  <div className="w-[93.86px] h-[33.46px] left-[37.17px] top-0 absolute text-slate-700 text-base font-normal leading-normal">All</div> */}
                </div>
                <div className="w-[136.61px] h-[33.46px] relative">
                  <div className="w-5 h-5 left-0 top-[2.79px] absolute bg-zinc-400 rounded-[10px]" />
                  <div className="w-[99.44px] h-[33.46px] left-[37.17px] top-0 absolute text-slate-700 text-base font-normal leading-normal">Available</div>
                </div>
                <div className="w-[130.11px] h-[33.46px] relative">
                  <div className="w-5 h-5 left-0 top-[2.79px] absolute bg-green-500 rounded-[10px]" />
                  <div className="w-[92.93px] h-[33.46px] left-[37.17px] top-0 absolute text-slate-700 text-base font-normal leading-normal">Reserved</div>
                </div>
                <div className="w-[202.17px] h-6 relative">
                  <div className="w-5 h-5 left-0 top-[2.79px] absolute bg-amber-300 rounded-[10px]" />
                  <div className="left-[37.17px] top-0 absolute text-slate-700 text-base font-normal leading-normal">Table for two enabled</div>
                </div>
              </div>
            </div>
    
              

              

              

                <div className="grid-container">
                    {Array.from({ length: 44 }, (_, index) => {
                        const tableNumber = index + 1;
                        const isTablePresent = isTableInStructure(tableNumber);
                        console.log(isTablePresent);
                        return (
                            <div
                            key={tableNumber}
                            className={`grid-item-reserve ${isTablePresent ? "bg-zinc-400" : ""}`}
                            onClick={() => handleItemClick(tableNumber)}
                            >
                            {isTablePresent ? tableData.find((table) => table.table_id === String(tableNumber)).table_no : ""}
                            </div>
                        );
                    })}
                </div>    
          </div>
        </main>
    </>
  )
}
