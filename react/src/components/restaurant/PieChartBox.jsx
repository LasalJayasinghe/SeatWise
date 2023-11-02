import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";



export default function PieChartBox() {

  const {user} = useStateContext();
  const [count2, setCount2] = useState([]);
  const [count1, setCount1] = useState([]);



  useEffect(() => {
    if (user && user.id) {
    axiosClient.get(`/getTotalMonthlyReservationCount/${user.id}`)
      .then(({ data }) => {
        setCount2(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.id) {
    axiosClient.get(`/getMonthlyHallReservations/${user.id}`)
      .then(({ data }) => {
        setCount1(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [user]);

  const data = [
    { name: "Table", value: count2, color: "#22C55E" },
    { name: "Hall", value: count1, color: "#374151" },
  ];


  return (
    <div className="pieChartBox">
      <h1>Leads by Source</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"60%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
