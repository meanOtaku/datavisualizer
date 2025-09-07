import { useDispatch } from "react-redux";
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
import { useForm, useWatch } from "react-hook-form";
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

const formSchema = z.object({
    graphType: z.string().min(2, {
        message: "Graph Type Must be selected",
    }),
    showTgF: z.boolean().optional(),
    showgFx: z.boolean().optional(),
    showgFy: z.boolean().optional(),
    showgFz: z.boolean().optional(),
});

export function AppCard(props: { id: number }) {
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            graphType: "Grouped",
            showTgF: true,
            showgFx: true,
            showgFy: true,
            showgFz: true,
        },
    });
    const allFormValues = form.watch();

    useEffect(() => {
        // Update the Redux store whenever form values change
        dispatch(
            updateCardData({
                index: props.id,
                value: {
                    deleteGraphData: false,
                    graphType: allFormValues.graphType as
                        | "Grouped"
                        | "Seperated",
                    showTgF: allFormValues.showTgF as boolean,
                    showgFx: allFormValues.showgFx as boolean,
                    showgFy: allFormValues.showgFy as boolean,
                    showgFz: allFormValues.showgFz as boolean,
                },
            })
        );
        // console.log(allFormValues);
    }, [allFormValues, dispatch, props.id]);

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
                    <CardTitle>Graph {props.id + 1}</CardTitle>
                    <CardDescription>Graph Properties </CardDescription>
                    <CardAction>
                        <Button
                            onClick={() => {
                                // dispatch delete action here
                                dispatch(deleteData(props.id));
                                dispatch(deleteCardData(props.id));
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
                                <FormField
                                    control={form.control}
                                    name="showgFx"
                                    render={({ field }) => (
                                        <div>
                                            <FormItem className="flex flex-row items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                        checked={field.value}
                                                    />
                                                </FormControl>
                                                <FormLabel>gFx</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="showgFy"
                                    render={({ field }) => (
                                        <div>
                                            <FormItem className="flex flex-row items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                        checked={field.value}
                                                    />
                                                </FormControl>
                                                <FormLabel>gFy</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="showgFz"
                                    render={({ field }) => (
                                        <div>
                                            <FormItem className="flex flex-row items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                        checked={field.value}
                                                    />
                                                </FormControl>
                                                <FormLabel>gFz</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="showTgF"
                                    render={({ field }) => (
                                        <div>
                                            <FormItem className="flex flex-row items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                        checked={field.value}
                                                    />
                                                </FormControl>
                                                <FormLabel>TgF</FormLabel>
                                                <FormMessage />
                                            </FormItem>
                                        </div>
                                    )}
                                />
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
