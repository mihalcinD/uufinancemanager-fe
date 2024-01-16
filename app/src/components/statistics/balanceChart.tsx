import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export interface BalanceChartProps {
  data?: {
    x: string;
    y: number;
  }[];
}
export const BalanceChart = ({ data }: BalanceChartProps) => {
  return (
    <Line
      data={{
        datasets: [
          {
            data: data,
            borderColor: 'red',
          },
        ],
      }}
    />
  );
};
