import {Line} from "react-chartjs-2";
import {useMemo} from "react";
import moment from "moment/moment";
import {
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
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export interface BalanceChartProps {
    timePeriod?: number
}
export const BalanceChart = ({timePeriod = 100}:BalanceChartProps)=>{
    const data = useMemo(() => {
        const dataLocal = []
        const current = moment();
        for(let x = 0; x < timePeriod; x++) {
            dataLocal.push({x: current.format("DD.MM.YYYY"), y: Math.floor(Math.random() * 1000) + 5000})
            current.subtract(1, "day")
        }
        return dataLocal
    }, [timePeriod])
    return(
        <Line data={{
            datasets: [{
                data: data,
                borderColor: "red"
            }]
        }}/>
    )
}
