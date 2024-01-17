import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { HouseholdStatisticsResponse } from '../../types/api/response/household';
import { useUsersContext } from '../../context/UsersContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface IncomeChartProps {
  inpData?: HouseholdStatisticsResponse;
}

export const IncomeChart = ({ inpData }: IncomeChartProps) => {
  const { users } = useUsersContext();

  const data = {
    labels: inpData ? inpData.map(item=>users.find(usr=> usr.id === item._id)?.name) : [],
    datasets: [
      {
        label: 'income',
        data: inpData ? inpData.map(item=>item.y) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};
