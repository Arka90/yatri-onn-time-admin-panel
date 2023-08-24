import type { ComponentProps, FC } from "react";
import DoughnutChart from "./charts/doughnutChart";

interface IDataset {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
}

interface IAboutChart {
    Icon: FC<ComponentProps<"svg">>;
    title: string;
    revenue: number | string;
}

export interface IDoughnutChart {
    labels: string[];
    datasets: IDataset[];
}

type DoughnutAnalysisProps = ComponentProps<"svg"> & {
    mainTitle: string;
    info: IAboutChart;
    data: IDoughnutChart;
};

const DoughnutAnalysis: FC<DoughnutAnalysisProps> = ({
    mainTitle,
    info,
    data,
}) => {
    return (
        <div className="col-span-2 card h-fit">
            <div className="">
                <h3 className="font-medium text-slate-800 text-2xl">
                    {mainTitle}
                </h3>
                <div className="flex items-center justify-around">
                    <DoughnutChart data={data} />
                    <div className="divide-y divide-slate-200 ">
                        <div className="flex items-center gap-x-4 py-2">
                            {/* icon */}
                            <div className="text-emerald-600 bg-emerald-300/20 rounded-md p-2">
                                <info.Icon className="w-8 h-8" />
                            </div>
                            {/* info */}
                            <div className="">
                                {/* title */}
                                <strong>{info.title}</strong>
                                {/* revenue */}
                                <p className=" font-bold text-4xl text-slate-600">
                                    {info.revenue}
                                </p>
                            </div>
                        </div>
                        <div className="py-2 grid grid-cols-2 gap-y-6 gap-x-12">
                            {data.labels.map((label, indx) => (
                                <div key={label}>
                                    <strong className=" text-sm text-slate-500 flex items-center gap-x-2">
                                        <div
                                            className="h-4 w-4 rounded-full"
                                            style={{
                                                backgroundColor: `${data.datasets[0].backgroundColor[indx]}`,
                                            }}
                                        />{" "}
                                        {label}
                                    </strong>
                                    <p className="highlight font-semibold text-2xl">
                                        {data.datasets[0].data[indx]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoughnutAnalysis;
