import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/Layout/nav-documents"
import { NavMain } from "@/components/Layout/nav-main"
import { NavSecondary } from "@/components/Layout/nav-secondary"
import { NavUser } from "@/components/Layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAppSelector } from "@/redux"

import {
  AudioWaveform,
  BarChart,
  Command,
  GalleryVerticalEnd,
  HelpCircle,
  Home,
  PhoneCall,
  Settings,
  SquareTerminal,
  User
} from "lucide-react"



const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      name: 'Home',
      url: '/dashboard',
      icon: Home
    },
    {
      name: 'About ',
      url: '/about',
      icon: HelpCircle

    },
    {
      name: 'Sales Report',
      url: '/',
      icon: BarChart

    },
    {
      name: 'Users',
      url: '/admin/users',
      icon: User
    },

    {
      title: "Policy Management",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Policies",
          url: "/admin/policies",
        },
        {
          title: "Prompt",
          url: "/admin/policy-ocr-prompt",
        },
        
      ],
    }, {
      name: 'Settings',
      url: '/admin/settings',
      icon: Settings
    }, {
      name: 'Help Center',
      url: '/admin/help-center',
      icon: HelpCircle,

    },

  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}


export function AppSidebar({
  ...props
}) {

  const { userSession } = useAppSelector((state) => state.session);
  const user = userSession?.user;
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ||data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
