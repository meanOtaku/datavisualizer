import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2 } from "lucide-react";
import { deleteCardData, updateCardData } from "@/slice/appCardStateSlice";
import { deleteData } from "@/slice/dataStateSlice";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { deleteHeaderData } from "@/slice/appHeaderStateSlice";
import { deleteGraphNameData } from "@/slice/graphNameStateSlice";

export function AppCard(props: { id: number }) {
    const dispatch = useDispatch();
    const headerData = useSelector((state: any) => state.headerDataState.value);
    const compareData = useSelector((state: any) => state.compareState.value);
    const graphNameData = useSelector(
        (state: any) => state.graphNameState.value
    );
    const temp: { [key: string]: boolean | string } = {
        graphType: "Grouped",
    };
    const temp1: Record<string, any> = {
        graphType: z.string().min(2, {
            message: "Graph Type Must be selected",
        }),
    };
    headerData[props.id].forEach((item: string) => {
        temp[item as string] = true;
        temp1[item as string] = z.boolean().optional();
    });
    const formSchema = z.object(temp1);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: temp,
    });
    const allFormValues = form.watch();

    useEffect(() => {
        const temp: any = {
            index: props.id,
            value: {
                deleteGraphData: false,
                graphType: allFormValues.graphType as "Grouped" | "Seperated",
            },
        };

        headerData[props.id].forEach((item: string) => {
            temp.value[item] = allFormValues[item] as boolean;
        });

        dispatch(updateCardData(temp));
    }, [allFormValues, dispatch, headerData, props.id]);

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    // Define sidebar items
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Graph #{props.id + 1}</CardTitle>
                    <CardDescription>
                        {graphNameData[props.id]}{" "}
                    </CardDescription>
                    <CardAction>
                        <Button
                            onClick={() => {
                                // dispatch delete action here
                                dispatch(deleteData(props.id));
                                dispatch(deleteCardData(props.id));
                                dispatch(deleteHeaderData(props.id));
                                dispatch(deleteGraphNameData(props.id));
                            }}
                        >
                            <Trash2 />
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                disabled={compareData}
                                control={form.control}
                                name="graphType"
                                render={({ field }) => (
                                    <div className="space-y-3">
                                        <FormItem>
                                            <FormLabel>Graph Type</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="Grouped"
                                                            id="Grouped"
                                                        />
                                                        <Label htmlFor="Grouped">
                                                            Grouped
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="Seperated"
                                                            id="Seperated"
                                                        />
                                                        <Label htmlFor="Seperated">
                                                            Seperated
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                            <div className="space-y-5">
                                {headerData[props.id].map((headerItem, idx) => (
                                    <FormField
                                        key={idx}
                                        control={form.control}
                                        name={headerItem}
                                        render={({ field }) => (
                                            <div>
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                            checked={
                                                                field.value
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormLabel>
                                                        {headerItem}
                                                    </FormLabel>
                                                    <FormMessage />
                                                </FormItem>
                                            </div>
                                        )}
                                    />
                                ))}
                            </div>
                            {/* <Button type="submit">Reset</Button> */}
                        </form>
                    </Form>
                </CardContent>
                {/* <CardFooter>
                    <p>Card Footer</p>
                </CardFooter> */}
            </Card>
        </>
    );
}
