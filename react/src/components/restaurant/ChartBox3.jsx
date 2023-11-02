import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function ChartBox() {

    const {user, setUser} = useStateContext();
    const [addPrice, setAddPrice] = useState([null]);
    const [tableCount, settableCount] = useState([null]);
    const [hallCount, sethallCount] = useState([null]);
 

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
            // fetchAddFee(data.id);
            fetchTableCount(data.id);
            fetchHallCount(data.id);
            //fetchReservedTableData(data.id);
            // getfloordata(data.id);
        })
    }, [])
    
        // const fetchAddFee = (restaurant_id) => {
        // //   setLoading(true);
        //     axiosClient
        //     .get("/getAdvertisementFee", { params: { restaurant_id } })
        //     .then(({ data }) => {
        //         console.log("Fetched data:", data);
        //         setAddPrice(data);
        //         // setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching tables:", error);
        //     });
        // };

        const fetchTableCount = (restaurant_id) => {
            //   setLoading(true);
                axiosClient
                .get(`/getTotalMonthlyReservationCount/${restaurant_id}`)
                .then(({ data }) => {
                    console.log("Fetched table data:", data);
                    settableCount(data);
                    // setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching tables:", error);
                });
        };

        const fetchHallCount = (restaurant_id) => {
            //   setLoading(true);
                axiosClient
                .get(`/getMonthlyHallReservations/${restaurant_id}`)
                .then(({ data }) => {
                    console.log("Fetched table data:", data);
                    sethallCount(data);
                    // setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching tables:", error);
                });
        };


  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          {/* <img src={props.icon} alt="" />
          <span>{props.title}</span> */}
          {/* <img src="" alt="" /> */}
          <span><h1><b>Total income</b></h1></span>
        </div>
        {/* <h1>{props.number}</h1>
        <Link to="/" style={{ color: props.color }}>
          View all
        </Link> */}
        <h1><b>{(tableCount * 49) + (hallCount * 1099)}</b></h1>       
        <Link className="link">View all</Link>
      </div>
      <div className="chartInfo">
        <div className="chart">
          {/* <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer> */}
           <ResponsiveContainer width="99%" height="100%">
            <LineChart data={data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#e1faeb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          {/* <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className="duration">this month</span> */}
          <span className="percentage">35%</span>
          <span className="duration"> This Month</span>
        </div>
      </div>
    </div>
  );
}
