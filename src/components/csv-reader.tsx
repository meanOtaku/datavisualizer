"use client";
import { Input } from "@/components/ui/input";

export function CsvReader() {
  // const [csvData, setCsvData] = useState([]);

  // const handleFileChange = (event: any) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //         // Process the file here
  //     }
  // };

  return (
    <div>
      {/* <input type="file" accept=".csv" /> */}
      <Input id="picture" type="file" />
      {/* Render the data */}
    </div>
  );
}

export default CsvReader;
