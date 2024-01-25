import { ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

type BarChartProp = {
  countData: ChartData<'bar', (number | [number, number] | null)[], unknown>;
};

const BarChart = ({ countData }: BarChartProp) => {
  return (
    <Bar
      data={countData}
      options={{
        responsive: false,
        devicePixelRatio: 4,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 10,
              },
            },
          },
        },
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      }}
      style={{
        position: 'relative',
        height: '38vh',
        width: '28vw',
        margin: '1rem',
      }}
    />
  );
};

export default BarChart;
