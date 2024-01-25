import { BubbleDataPoint, ChartData, Point } from 'chart.js';
import { Line } from 'react-chartjs-2';

type LineChartProp = {
  timeData: ChartData<
    'line',
    (number | [number, number] | Point | BubbleDataPoint | null)[],
    unknown
  >;
};

const LineChart = ({ timeData }: LineChartProp) => {
  return (
    <Line
      data={timeData}
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

export default LineChart;
