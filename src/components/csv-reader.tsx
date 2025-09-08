"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { updateData } from "@/slice/dataStateSlice";
import { falseState } from "@/slice/appStateSlice";
import { addCardData } from "@/slice/appCardStateSlice";
import { addHeaderData } from "@/slice/appHeaderStateSlice";
import { addGraphNameData } from "@/slice/graphNameStateSlice";

export function CsvReader() {
    const dispatch = useDispatch();
    const [csvFile, setCsvFile] = useState(null);

    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const parseCsv = () => {
        if (csvFile) {
            Papa.parse(csvFile, {
                header: true, // If your CSV has a header row
                dynamicTyping: true, // Convert numbers and booleans to their respective types
                skipEmptyLines: false,
                comments: "#",
                complete: (results) => {
                    results.data = results.data.filter((row: any) => {
                        return (
                            row.time !== undefined &&
                            row.time !== null &&
                            row.time <= 10
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

                    console.log(typeof csvFile.name);

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

    return (
        <div className="flex flex-row gap-4">
            <Input type="file" accept=".csv" onChange={handleFileChange} />
            <Button variant="outline" onClick={parseCsv}>
                Parse CSV
            </Button>
        </div>
    );
}

export default CsvReader;
