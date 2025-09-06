import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Upload } from "lucide-react";
import { DialogCloseButton } from "./dialog-box";
import { useDispatch } from "react-redux";
import { flipState } from "@/slice/appStateSlice";

export function AppSidebar() {
  const dispatch = useDispatch();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Menu ITEM */}
              <SidebarMenuItem
                key={"Upload CSV"}
                onClickCapture={() => {
                  dispatch(flipState());
                }}
              >
                <SidebarMenuButton asChild>
                  <div>
                    <Upload />
                    <DialogCloseButton />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
