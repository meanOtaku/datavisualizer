import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";
import { GitCompare, RotateCcwSquareIcon, Upload } from "lucide-react";
import { DialogCloseButton } from "./dialog-box";
import { useDispatch, useSelector } from "react-redux";
import { trueState } from "@/slice/appStateSlice";
import { ModeToggle } from "./mode-toggle";
import type { graphDataState } from "@/interface";
import { AppCard } from "./app-card";
import {
    falseCompareState,
    trueCompareState,
} from "@/slice/compareDataStateSlice";
import { toast } from "sonner";

export function AppSidebar() {
    const dispatch = useDispatch();
    const graphData = useSelector(
        (state: graphDataState) => state.dataState.value
    );
    const compareState = useSelector((state: any) => state.compareState.value);
    return (
        <Sidebar className="m-px" variant="floating">
            <SidebarHeader>
                <ModeToggle />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Data Visualizer</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* Menu ITEM */}
                            <SidebarMenuItem key={"Upload CSV"}>
                                <SidebarMenuButton
                                    onClick={() => {
                                        if (!compareState)
                                            dispatch(trueState());
                                        else
                                            toast("Please click return", {
                                                description:
                                                    "Return to home page to Upload more CSV",
                                            });
                                    }}
                                    asChild
                                >
                                    <div>
                                        <Upload />
                                        <DialogCloseButton />
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {!compareState ? (
                                <SidebarMenuItem
                                    key={"Compare Data"}
                                    className="mb-5"
                                >
                                    <SidebarMenuButton
                                        onClick={() =>
                                            dispatch(trueCompareState())
                                        }
                                        asChild
                                    >
                                        <div>
                                            <GitCompare />
                                            Compare Data
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : (
                                <SidebarMenuItem
                                    key={"Compare Data"}
                                    className="mb-5"
                                >
                                    <SidebarMenuButton
                                        onClick={() =>
                                            dispatch(falseCompareState())
                                        }
                                        asChild
                                    >
                                        <div>
                                            <RotateCcwSquareIcon />
                                            Return
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}

                            {
                                // Dynamically add more menu items here
                                !compareState &&
                                    graphData.map((_dataPoint, index) => (
                                        <SidebarMenuItem
                                            key={`Upload CSV ${index}`}
                                        >
                                            <AppCard id={index} />
                                        </SidebarMenuItem>
                                    ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {/* <SidebarFooter /> */}
        </Sidebar>
    );
}
