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
import { GitCompare, Upload } from "lucide-react";
import { DialogCloseButton } from "./dialog-box";
import { useDispatch, useSelector } from "react-redux";
import { trueState } from "@/slice/appStateSlice";
import { ModeToggle } from "./mode-toggle";
import type { graphDataState } from "@/interface";
import { AppCard } from "./app-card";

export function AppSidebar() {
    const dispatch = useDispatch();
    const graphData = useSelector(
        (state: graphDataState) => state.dataState.value
    );
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
                                        dispatch(trueState());
                                    }}
                                    asChild
                                >
                                    <div>
                                        <Upload />
                                        <DialogCloseButton />
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem
                                key={"Compare Data"}
                                className="mb-5"
                            >
                                <SidebarMenuButton asChild>
                                    <div>
                                        <GitCompare />
                                        Compare Data
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {
                                // Dynamically add more menu items here
                                graphData.map((_dataPoint, index) => (
                                    <SidebarMenuItem
                                        key={`Upload CSV ${index}`}
                                    >
                                        {/* //! To DO */}
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
