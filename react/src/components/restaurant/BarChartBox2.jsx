import { BarChart } from '@mui/x-charts/BarChart';


export default function BarChartBox2() {
  return (
    <div className="barChartBox">
      <h1 className="mb-0">Total Visit - Table</h1>
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
            data: [2, 5, 3, 6, 7, 8, 7, 8, 1, 7, 9, 7],
          },
        ]}
        width={300}
        height={200}
    />

      </div>
  </div>
  )
}
