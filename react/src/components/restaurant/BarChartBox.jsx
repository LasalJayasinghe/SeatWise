// import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

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

export default function BarChartBox() {

  const {user} = useStateContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user && user.id) {
    axiosClient.get(`/getMonthlyVisitsCount/${user.id}`)
    .then(response => {
      setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [user]);



  return (

  <div className="barChartBox">
      <h1 className="mb-0">Total Visit - Hall</h1>
      <div className="">

      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'],
            // data: data.map(month => month.label),
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: [2, 2, 3, 4, 1, 2, 3, 3, 4, 2, 1, 8],
          },
        ]}
        width={300}
        height={200}
    />

      </div>
  </div>

  

  )

}
