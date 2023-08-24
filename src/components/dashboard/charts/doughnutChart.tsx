import type { FC } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { IDoughnutChart } from "../doughnutAnalysis";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
    data: IDoughnutChart;
};

const DoughnutChart: FC<DoughnutChartProps> = ({ data }) => {
    return (
        <div className="w-64 h-64">
            <Doughnut
                className="w-48 h-48"
                datasetIdKey="doughnut"
                data={data}
            />
        </div>
    );
};

export default DoughnutChart;
