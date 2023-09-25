import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
      name: "Sun",
      table: 4000,
      hall: 2400,
      both: 2400,
    },
    {
      name: "Mon",
      table: 3000,
      hall: 1398,
      both: 2210,
    },
    {
      name: "Tue",
      table: 2000,
      hall: 9800,
      both: 2290,
    },
    {
      name: "Wed",
      table: 2780,
      hall: 3908,
      both: 2000,
    },
    {
      name: "Thu",
      table: 1890,
      hall: 4800,
      both: 2181,
    },
    {
      name: "Fri",
      table: 2390,
      hall: 3800,
      both: 2500,
    },
    {
      name: "Sat",
      table: 3490,
      hall: 4300,
      both: 2100,
    },
  ];
  

export default function BigChartBox() {
  return (
    <div className="bigChartBox">
      <h1>Revenue Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="table"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="hall"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="both"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
