import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";


export default function Reservations() {

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [reservedtableData, setReservedTableData] = useState([]);

  // const [errors, setErrors] = useState(null);
  const {user, setUser } = useStateContext();

  const [loading, setLoading] = useState(false);

  const [floor, setFloorData] = useState([]);
  const [toggle, setToggle] = useState([1]);
  const [selectedFloor, setSelectedFloor] = useState([1]);
  const [date, setDate] = useState('');

  const handleToggle = (floorNumber) => {
    setSelectedFloor(floorNumber);
    setToggle(floorNumber);
  };


  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => {
        setUser(data)
        // getViews(data.id);
        fetchTableData(data.id);
        fetchReservedTableData(data.id);
        getfloordata(data.id);
    })
    }, [])

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

    const fetchReservedTableData = (restaurant_id) => {
      setLoading(true);
        axiosClient
        .get("/getreservedtable", { params: { restaurant_id } })
        .then(({ data }) => {
            // console.log("Fetched table data:", data);
            setReservedTableData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching tables:", error);
        });
    };

    const getfloordata = (restaurant_id) => {
      axiosClient
      .get("/getfloor", { params: { restaurant_id } })
      .then(({ data }) => {
        if (data !== undefined) {
          setFloorData([data.floors]);
        } else {
          console.error("API response is missing expected data");
        }
      })
      .catch((error) => {
          console.error("Error fetching tables:", error);
      });
  };

    

    const isTableInStructure = (tableNumber) => {
        // const parsedTableNumber = parseInt(tableNumber, 10);
        return tableData.some((table) => (table.table_id) === String(tableNumber) && (table.floor) == selectedFloor);
      };

      const isTableInReserved = (tableNumber) => {
        // const parsedTableNumber = parseInt(tableNumber, 10);
        return reservedtableData.some((table) => (table.table_id) === String(tableNumber) && table.reservation_date === date);
      };

  return (
    <>
      <header className="bg-white shadow"> 
        <div className="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-20">Reservations</h1>
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
    
              
            <div className="flex gap-5 justify-center">
              <div className="flex items-center justify-center mb-6">
                    {Array.from({ length: floor }, (_, index) => (
                      <div
                        key={index+1}
                        className={`py-2 px-4 rounded-lg ${
                          toggle === index + 1 ? 'bg-green-500 text-white' : 'bg-white text-green-500'
                        }`}
                        onClick={() => handleToggle(index + 1)}
                      >
                        Floor {index + 1}
                      </div>
                    ))}
                  
                </div>  

                <div className="flex items-center">
                  <label className="flex items-center mt-negative" > Date:</label>
                   
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="mr-5 p-2 border rounded-lg"
                  />
                  
                </div>
            </div>
                

                <div className="grid-container">
                    {Array.from({ length: 44 }, (_, index) => {
                        const tableNumber = index + 1;
                        const isTablePresent = isTableInStructure(tableNumber);
                        const isTableReserved = isTableInReserved(tableNumber);
                        console.log(isTablePresent);
                        console.log(isTableReserved);
                        let classes = "grid-item-reserve";
                        if (isTableReserved && isTablePresent) {
                            classes += " bg-green-500";
                        } else if (isTablePresent) {
                            classes += " bg-zinc-400";
                        }
                        return (
                            <div
                            key={tableNumber}
                            className={classes}
                            >
                            {isTablePresent ? tableData.find((table) => table.table_id === String(tableNumber)).table_number : ""}
                            </div>
                        );
                    })}
                </div>    
          </div>
        </main>
    </>
  )
}
