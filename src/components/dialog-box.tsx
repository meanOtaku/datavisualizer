"use client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import CsvReader from "./csv-reader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trueState, falseState } from "../slice/appStateSlice";
import type { state } from "@/interface";

export function DialogCloseButton() {
  const dialogState = useSelector((state: state) => state.dialogState.value);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dialogState) {
      dispatch(trueState());
    } else {
      dispatch(falseState());
    }
    console.log("isDialogOpen changed:", dialogState);
  }, [dispatch, dialogState]);

  return (
    <Dialog open={dialogState}>
      <DialogTrigger asChild>
        <span>Upload CSV</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload</DialogTitle>
          <DialogDescription>
            Upload your CSV file here. Click outside the modal or the close
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <CsvReader></CsvReader>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
