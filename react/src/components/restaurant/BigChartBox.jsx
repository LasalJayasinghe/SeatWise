import { BarChart } from '@mui/x-charts/BarChart';
  

export default function BigChartBox() {
  return (
    <div className="barChartBox">
      <h1 className="mb-0">Monthly Revenue </h1>
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
            data: [1234, 6745, 3467, 8735, 234, 9846, 2314, 4352, 7468, 2453, 8735, 6373],
            color: '#22C55E',
          },
        ]}
        width={500}
        height={400}
    />

      </div>
  </div>
  )
}
