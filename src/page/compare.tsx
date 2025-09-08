import type { appCardDataState, graphDataState } from "@/interface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Brush,
    ReferenceLine,
    ComposedChart,
} from "recharts";
import { Separator } from "@/components/ui/separator";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Compare() {
    const headerData = useSelector((state: any) => state.headerDataState.value);
    const graphNameData = useSelector(
        (state: any) => state.graphNameState.value
    );

    const graphData = useSelector(
        (state: graphDataState) => state.dataState.value
    );

    const cardData = useSelector(
        (state: appCardDataState) => state.cardDataState.value
    );
    type DataOption = {
        item: string;
        idx: number;
        isVisible: boolean;
        [key: string]: any;
    };
    const [selectedDataOptions, setSelectedDataOptions] = useState([]);
    const [mergedGraphData, setMergedGraphData] = useState([]);
    const [mergedHeaderData, setMergedHeaderData] = useState([]);

    const seperateRows = (index) => {
        const result: any[] = [];
        const temp = [];
        Object.keys(graphData[index][0]).forEach((item) => {
            if (item != "time") temp.push(item);
        });
        // console.log(graphData[index]);

        temp.forEach((header) => {
            const temp1 = graphData[index].map((row) => ({
                time: row.time,
                [header]: row[header],
            }));
            result.push(temp1);
        });
        // console.log(result);
        console.log(headerData);

        return result;
    };

    const changeSelectOption = (item, idx) => {
        const optionKey = item + "#" + idx;
        let headerFlag: boolean = true;
        let updatedOptions = [];
        if (selectedDataOptions.includes(optionKey)) {
            updatedOptions = selectedDataOptions.filter(
                (opt) => opt !== optionKey
            );
            setSelectedDataOptions(updatedOptions);
            // Remove corresponding graph data and header data
            setMergedHeaderData((prev) => prev.filter((_, i) => i !== idx));
            headerFlag = false;
        } else {
            updatedOptions = [...selectedDataOptions, optionKey];
            setSelectedDataOptions(updatedOptions);
            // Add corresponding graph data and header data
            headerFlag = true;
        }
        // Merge header data without duplicates

        if (headerFlag) {
            setMergedHeaderData((prev) => [...prev, ...headerData[idx]]);
        } else {
            const result = mergedHeaderData.filter((item) => {
                return !headerData[idx].includes(item);
            });
            setMergedHeaderData([...result]);
        }
        if (headerFlag) {
            // Add new data set
            const separated = seperateRows(idx);
            setMergedGraphData((prev) => [...prev, ...separated]);
        } else {
            // Remove data set
            const result = mergedGraphData.filter(
                (_, i) =>
                    i < idx * headerData[idx].length ||
                    i >= (idx + 1) * headerData[idx].length
            );
            setMergedGraphData([...result]);
        }
        // console.log(mergedHeaderData, mergedGraphData);
    };

    const [xDomainLeft, setXDomainLeft] = useState(null);
    const [xDomainRight, setXDomainRight] = useState(null);
    const [isZooming, setIsZooming] = useState(false);
    const [startX, setStartX] = useState(null);

    const handleMouseDown = (e) => {
        if (e.activeLabel) {
            // Check if mouse is over data point
            setStartX(e.chartX);
            setXDomainLeft(e.activeLabel); // Or based on dataKey if numeric
            setIsZooming(true);
        }
    };

    const handleMouseMove = (e) => {
        if (isZooming && e.activeLabel) {
            setXDomainRight(e.activeLabel); // Or based on dataKey if numeric
        }
    };

    const handleMouseUp = () => {
        setIsZooming(false);
        // Filter data based on xDomainLeft and xDomainRight to update visibleData
        // You would then pass this filtered data to the LineChart's data prop
        // For simplicity, this example only updates the domain
        console.log("Zoomed from:", xDomainLeft, "to:", xDomainRight);
    };

    return (
        <div style={{ width: "100%", height: "100%" }} className="p-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-5">
                Compare Graphs Data
            </h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="mb-5">
                    <Button variant="outline">Select Data</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        Select CSV data to compare
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {graphNameData.map((item: string, idx: number) => (
                        <DropdownMenuCheckboxItem
                            key={idx}
                            checked={selectedDataOptions.includes(
                                item + "#" + idx
                            )}
                            onCheckedChange={() =>
                                changeSelectOption(item, idx)
                            }
                        >
                            {item + "#" + (idx + 1)}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {graphData.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-2xl font-bold mb-4">
                        No Data Available
                    </h1>
                    <p className="text-gray-600">
                        Please upload a CSV file to visualize data.
                    </p>
                </div>
            )}
            <div>
                <Card className="mb-10">
                    <CardHeader>
                        <CardTitle>Graph</CardTitle>
                        <CardDescription>Ploted Graph Data</CardDescription>
                        {/* <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent>
                        <div>
                            <ResponsiveContainer
                                width="100%"
                                height={400}
                                initialDimension={{
                                    width: 520,
                                    height: 400,
                                }}
                            >
                                <ComposedChart
                                    width={600}
                                    height={300}
                                    // data={graphData}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                >
                                    {mergedGraphData.map((dataSet, idx) => (
                                        <Line
                                            key={idx}
                                            type="monotone"
                                            data={dataSet}
                                            dataKey={mergedHeaderData[idx]}
                                            stroke={`var(--chart-${idx + 1})`}
                                            dot={false}
                                            onMouseDown={handleMouseDown}
                                            onMouseMove={handleMouseMove}
                                            onMouseUp={handleMouseUp}
                                        />
                                    ))}
                                    <CartesianGrid
                                        stroke="#ccc"
                                        strokeDasharray="5 5"
                                    />
                                    <XAxis
                                        dataKey="time"
                                        domain={[xDomainLeft, xDomainRight]}
                                        type="number"
                                        ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                        allowDataOverflow={true}
                                        allowDuplicatedCategory={false}
                                        label={{
                                            value: "Time",
                                            position: "insideBottom",
                                            // offset: 0,
                                        }}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor:
                                                "var(--sidebar-primary-foreground)",
                                            color: "var(--sidebar-ring)",
                                            borderRadius: "5px",
                                        }}
                                    />
                                    <Legend />
                                    <ReferenceLine
                                        y={0}
                                        stroke="var(--foreground)"
                                    />
                                    <Brush
                                        dataKey="time"
                                        stroke="var(--brush-stroke)"
                                        fill="var(--brush-fill)"
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    {/* <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter> */}
                </Card>
                <Separator className="my-10" />
            </div>
        </div>
    );
}
