import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

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
  return (
    // <div className="barChartBox">
    //   <h1>{props.title}</h1>
    //   <div className="chart">
    //     <ResponsiveContainer width="99%" height={150}>
    //       <BarChart data={props.chartData}>
    //         <Tooltip
    //           contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
    //           labelStyle={{ display: "none" }}
    //           cursor={{fill:"none"}}
    //         />
    //         <Bar dataKey={props.dataKey} fill={props.color} />
    //       </BarChart>
    //     </ResponsiveContainer>
    //   </div>
    // </div>
    <div className="barChartBox">
   
      <div className="chart">
        <ResponsiveContainer width="99%" height={90}>
          <BarChart data={data}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{fill:"none"}}
            />
            <Bar dataKey="uv" fill="#22C55E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
