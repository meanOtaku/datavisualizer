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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trueState, falseState } from "../slice/appStateSlice";
import type { state } from "@/interface";

export function DialogCloseButton() {
    const [isOpen, setIsOpen] = useState(false);
    const dialogState = useSelector((state: state) => state.dialogState.value);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsOpen(dialogState);
    }, [dialogState]);

    useEffect(() => {
        if (isOpen) {
            dispatch(trueState());
        } else {
            dispatch(falseState());
        }
    }, [dispatch, isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* <DialogTrigger asChild>
                <span>Upload CSV</span>
            </DialogTrigger> */}
            Upload CSV
            <DialogContent
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
                className="sm:max-w-md"
            >
                <DialogHeader>
                    <DialogTitle>Upload</DialogTitle>
                    <DialogDescription>
                        Upload your CSV file here. Click outside the modal or
                        the close
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
