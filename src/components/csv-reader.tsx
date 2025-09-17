"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "@/slice/dataStateSlice";
import { falseState } from "@/slice/appStateSlice";
import { addCardData } from "@/slice/appCardStateSlice";
import { addHeaderData } from "@/slice/appHeaderStateSlice";
import { addGraphNameData } from "@/slice/graphNameStateSlice";
import type { graphDataState } from "@/interface";

export function CsvReader() {
    const dispatch = useDispatch();
    const graphData = useSelector(
        (state: graphDataState) => state.dataState.value
    );
    const [csvFile, setCsvFile] = useState(null);
    const [value, setValue] = useState("10");

    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const parseCsv = () => {
        if (csvFile) {
            Papa.parse(csvFile, {
                header: true, // If your CSV has a header row
                transformHeader: function (header, index) {
                    console.log(header, index);

                    // Your logic to transform the header
                    if (header !== "time" && !header.includes("#")) {
                        return header + "#" + (graphData.length + 1);
                    }
                    return header; // Return original header if no change needed
                },
                dynamicTyping: true, // Convert numbers and booleans to their respective types
                skipEmptyLines: false,
                comments: "#",
                complete: (results) => {
                    results.data = results.data.filter((row: any) => {
                        return (
                            row.time !== undefined &&
                            row.time !== null &&
                            row.time <= value
                        );
                    });
                    // const temp = results.data.slice(1);
                    // temp = temp.slice(0, 5);
                    const temp1: string[] = results.meta.fields?.slice(1) || [];
                    const temp2: { [key: string]: boolean | string } = {
                        deleteGraphData: false,
                        graphType: "Grouped",
                    };
                    temp1.forEach((item) => {
                        temp2[item as string] = true;
                    });

                    dispatch(addGraphNameData(csvFile.name));
                    dispatch(addHeaderData(temp1));
                    dispatch(addCardData(temp2));
                    dispatch(updateData(results.data));
                    dispatch(falseState());
                },
                error: (err) => {
                    console.error("Error parsing CSV:", err);
                },
            });
        }
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        // Allow only digits and a single decimal point
        if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
            setValue(inputValue);
        }
    };

    return (
        <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
                <Input type="file" accept=".csv" onChange={handleFileChange} />
                <Input
                    type="text" // Use type="text" for custom validation to prevent native number input restrictions
                    placeholder="Enter a number"
                    value={value}
                    onChange={handleValueChange}
                />
            </div>
            <Button variant="outline" onClick={parseCsv}>
                Parse CSV
            </Button>
        </div>
    );
}

export default CsvReader;
