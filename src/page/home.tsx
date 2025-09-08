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
} from "recharts";
import { Separator } from "@/components/ui/separator";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function Home() {
    const headerData = useSelector((state: any) => state.headerDataState.value);

    const graphData = useSelector(
        (state: graphDataState) => state.dataState.value
    );

    const cardData = useSelector(
        (state: appCardDataState) => state.cardDataState.value
    );

    const formatYAxisTick = (value) => {
        if (value > 0) value = Math.floor(value);
        return value;
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
            {graphData.map((item, idx) => (
                <div key={idx}>
                    <Card className="mb-10" key={idx}>
                        <CardHeader>
                            <CardTitle>Graph {idx + 1}</CardTitle>
                            <CardDescription>Ploted Graph Data</CardDescription>
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        <CardContent>
                            <div key={idx}>
                                {/* Combined Graph */}
                                {cardData[idx].graphType === "Grouped" ? (
                                    <ResponsiveContainer
                                        width="100%"
                                        height={400}
                                        initialDimension={{
                                            width: 520,
                                            height: 400,
                                        }}
                                    >
                                        <LineChart
                                            width={600}
                                            height={300}
                                            data={item}
                                            margin={{
                                                top: 5,
                                                right: 20,
                                                bottom: 5,
                                                left: 0,
                                            }}
                                            onMouseDown={handleMouseDown}
                                            onMouseMove={handleMouseMove}
                                            onMouseUp={handleMouseUp}
                                        >
                                            {headerData[idx].map(
                                                (
                                                    lineItem: keyof (typeof cardData)[typeof idx],
                                                    id: number
                                                ) =>
                                                    cardData[idx][lineItem] && (
                                                        <Line
                                                            key={id}
                                                            type="monotone"
                                                            dataKey={lineItem}
                                                            stroke={`var(--chart-${
                                                                id + 1
                                                            })`}
                                                            dot={false}
                                                        />
                                                    )
                                            )}
                                            <CartesianGrid
                                                stroke="#ccc"
                                                strokeDasharray="5 5"
                                            />
                                            <XAxis
                                                dataKey="time"
                                                domain={[
                                                    xDomainLeft,
                                                    xDomainRight,
                                                ]}
                                                // type="number"
                                                ticks={[
                                                    1, 2, 3, 4, 5, 6, 7, 8, 9,
                                                    10,
                                                ]}
                                                // tickFormatter={formatYAxisTick}
                                                allowDataOverflow={true}
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
                                                stroke="var(--brush-stroke)"
                                                fill="var(--brush-fill)"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    // Separate Graphs
                                    <div>
                                        <ResponsiveContainer
                                            width="100%"
                                            height={50}
                                            initialDimension={{
                                                width: 520,
                                                height: 400,
                                            }}
                                            className={"mb-5"}
                                        >
                                            <LineChart
                                                margin={{
                                                    top: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    left: 0,
                                                }}
                                                width={10}
                                                height={10}
                                                data={item}
                                                syncId={"id" + idx}
                                            >
                                                <Brush
                                                    dataKey="time"
                                                    height={30}
                                                    stroke="var(--brush-stroke)"
                                                    fill="var(--brush-fill)"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                        {headerData[idx].map(
                                            (headerItem, headerId) =>
                                                cardData[idx][headerItem] && (
                                                    <ResponsiveContainer
                                                        width="100%"
                                                        height={400}
                                                        initialDimension={{
                                                            width: 520,
                                                            height: 400,
                                                        }}
                                                        key={headerId}
                                                    >
                                                        <LineChart
                                                            width={600}
                                                            height={300}
                                                            data={item}
                                                            syncId={"id" + idx}
                                                            margin={{
                                                                top: 5,
                                                                right: 20,
                                                                bottom: 5,
                                                                left: 0,
                                                            }}
                                                        >
                                                            <Line
                                                                type="monotone"
                                                                dataKey={
                                                                    headerItem
                                                                }
                                                                stroke={`var(--chart-${
                                                                    headerId + 1
                                                                })`}
                                                                dot={false}
                                                            />

                                                            <CartesianGrid
                                                                stroke="#ccc"
                                                                strokeDasharray="5 5"
                                                            />
                                                            <XAxis
                                                                dataKey="time"
                                                                domain={[
                                                                    xDomainLeft,
                                                                    xDomainRight,
                                                                ]}
                                                                // type="number"
                                                                ticks={[
                                                                    1, 2, 3, 4,
                                                                    5, 6, 7, 8,
                                                                    9, 10,
                                                                ]}
                                                                // tickFormatter={formatYAxisTick}
                                                                allowDataOverflow={
                                                                    true
                                                                }
                                                                label={{
                                                                    value: "Time",
                                                                    position:
                                                                        "insideBottom",
                                                                    // offset: 0,
                                                                }}
                                                            />
                                                            <YAxis />
                                                            <Tooltip
                                                                contentStyle={{
                                                                    backgroundColor:
                                                                        "var(--sidebar-primary-foreground)",
                                                                    color: "var(--sidebar-ring)",
                                                                    borderRadius:
                                                                        "5px",
                                                                }}
                                                            />
                                                            <Legend />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                )
                                        )}
                                        {/* {cardData[idx].showgFx && (
                                            <ResponsiveContainer
                                                width="100%"
                                                height={400}
                                                initialDimension={{
                                                    width: 520,
                                                    height: 400,
                                                }}
                                            >
                                                <LineChart
                                                    width={600}
                                                    height={300}
                                                    data={item}
                                                    syncId={"id" + idx}
                                                    margin={{
                                                        top: 5,
                                                        right: 20,
                                                        bottom: 5,
                                                        left: 0,
                                                    }}
                                                >
                                                    <Line
                                                        type="monotone"
                                                        dataKey="gFx"
                                                        stroke="var(--chart-1)"
                                                        dot={false}
                                                    />

                                                    <CartesianGrid
                                                        stroke="#ccc"
                                                        strokeDasharray="5 5"
                                                    />
                                                    <XAxis
                                                        dataKey="time"
                                                        domain={[
                                                            xDomainLeft,
                                                            xDomainRight,
                                                        ]}
                                                        // type="number"
                                                        ticks={[
                                                            1, 2, 3, 4, 5, 6, 7,
                                                            8, 9, 10,
                                                        ]}
                                                        // tickFormatter={formatYAxisTick}
                                                        allowDataOverflow={true}
                                                        label={{
                                                            value: "Time",
                                                            position:
                                                                "insideBottom",
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
                                                </LineChart>
                                            </ResponsiveContainer>
                                        )}
                                        {cardData[idx].showgFy && (
                                            <ResponsiveContainer
                                                width="100%"
                                                height={400}
                                                initialDimension={{
                                                    width: 520,
                                                    height: 400,
                                                }}
                                            >
                                                <LineChart
                                                    width={600}
                                                    height={300}
                                                    data={item}
                                                    syncId={"id" + idx}
                                                    margin={{
                                                        top: 5,
                                                        right: 20,
                                                        bottom: 5,
                                                        left: 0,
                                                    }}
                                                >
                                                    <Line
                                                        type="monotone"
                                                        dataKey="gFy"
                                                        stroke="var(--chart-2)"
                                                        dot={false}
                                                    />

                                                    <CartesianGrid
                                                        stroke="#ccc"
                                                        strokeDasharray="5 5"
                                                    />
                                                    <XAxis
                                                        dataKey="time"
                                                        domain={[
                                                            xDomainLeft,
                                                            xDomainRight,
                                                        ]}
                                                        // type="number"
                                                        ticks={[
                                                            1, 2, 3, 4, 5, 6, 7,
                                                            8, 9, 10,
                                                        ]}
                                                        // tickFormatter={formatYAxisTick}
                                                        allowDataOverflow={true}
                                                        label={{
                                                            value: "Time",
                                                            position:
                                                                "insideBottom",
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
                                                </LineChart>
                                            </ResponsiveContainer>
                                        )}
                                        {cardData[idx].showgFz && (
                                            <ResponsiveContainer
                                                width="100%"
                                                height={400}
                                                initialDimension={{
                                                    width: 520,
                                                    height: 400,
                                                }}
                                            >
                                                <LineChart
                                                    width={600}
                                                    height={300}
                                                    data={item}
                                                    syncId={"id" + idx}
                                                    margin={{
                                                        top: 5,
                                                        right: 20,
                                                        bottom: 5,
                                                        left: 0,
                                                    }}
                                                >
                                                    <Line
                                                        type="monotone"
                                                        dataKey="gFz"
                                                        stroke="var(--chart-3)"
                                                        dot={false}
                                                    />

                                                    <CartesianGrid
                                                        stroke="#ccc"
                                                        strokeDasharray="5 5"
                                                    />
                                                    <XAxis
                                                        dataKey="time"
                                                        domain={[
                                                            xDomainLeft,
                                                            xDomainRight,
                                                        ]}
                                                        // type="number"
                                                        ticks={[
                                                            1, 2, 3, 4, 5, 6, 7,
                                                            8, 9, 10,
                                                        ]}
                                                        // tickFormatter={formatYAxisTick}
                                                        allowDataOverflow={true}
                                                        label={{
                                                            value: "Time",
                                                            position:
                                                                "insideBottom",
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
                                                </LineChart>
                                            </ResponsiveContainer>
                                        )}
                                        {cardData[idx].showTgF && (
                                            <ResponsiveContainer
                                                width="100%"
                                                height={400}
                                                initialDimension={{
                                                    width: 520,
                                                    height: 400,
                                                }}
                                            >
                                                <LineChart
                                                    width={600}
                                                    height={300}
                                                    data={item}
                                                    syncId={"id" + idx}
                                                    margin={{
                                                        top: 5,
                                                        right: 20,
                                                        bottom: 5,
                                                        left: 0,
                                                    }}
                                                >
                                                    <Line
                                                        type="monotone"
                                                        dataKey="TgF"
                                                        stroke="var(--chart-4)"
                                                        dot={false}
                                                    />
                                                    <CartesianGrid
                                                        stroke="#ccc"
                                                        strokeDasharray="5 5"
                                                    />
                                                    <XAxis
                                                        dataKey="time"
                                                        domain={[
                                                            xDomainLeft,
                                                            xDomainRight,
                                                        ]}
                                                        // type="number"
                                                        ticks={[
                                                            1, 2, 3, 4, 5, 6, 7,
                                                            8, 9, 10,
                                                        ]}
                                                        // tickFormatter={formatYAxisTick}
                                                        allowDataOverflow={true}
                                                        label={{
                                                            value: "Time",
                                                            position:
                                                                "insideBottom",
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
                                                </LineChart>
                                            </ResponsiveContainer>
                                        )} */}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        {/* <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter> */}
                    </Card>
                    {idx !== graphData.length - 1 && (
                        <Separator className="my-10" />
                    )}
                </div>
            ))}
        </div>
    );
}
