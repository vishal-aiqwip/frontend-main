
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { SiteHeader } from "./site-header"

export default function DashboardLayout ({ children }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
            {children}
          
          
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
