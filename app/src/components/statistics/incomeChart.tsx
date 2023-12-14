import {Doughnut, Line, Pie} from "react-chartjs-2";
import {useMemo} from "react";
import moment from "moment/moment";
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";

ChartJS.register(
    ArcElement, Tooltip, Legend
);

export interface IncomeChartProps {
    member?: string
    timePeriod?: number
}

export const IncomeChart = ({member = "all", timePeriod = 100}: IncomeChartProps) => {
    /*const data = useMemo(() => {
        return [{x: "user1", y: 2000 }, {x: "user2", y: 2000 }]
    }, [])*/
    const incomes = {
        Jakub: 10,
        Tary: 20,
        David: 30
    }
    const data = {
        labels: member === "all" ? ["Jakub", "Tary", "David"] : [member],
        datasets: [
            {
                label: 'income',
                data: member === "all" ? [Math.floor(Math.random() * timePeriod), Math.floor(Math.random() * timePeriod), Math.floor(Math.random() * timePeriod)] : [incomes[member] * Math.floor(Math.random() * timePeriod)],
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
    return (
        <Doughnut data={data}/>
    )
}
