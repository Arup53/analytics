"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Make a Card Transcation",
    url: "#",
    icon: Settings,
  },
];

const UserDashboard = () => {
  const { data: session } = useSession();

  return (
    <Sidebar className="border-black " collapsible="icon">
      <SidebarHeader className="bg-black text-white ">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="bg-black ">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="text-white">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <hr className="border-neutral-700" />
      <SidebarFooter className="bg-black flex flex-col md:flex-row gap-3 p-6">
        <Avatar>
          <AvatarImage src={`${session?.user?.image}`} alt="@shadcn" />
          <AvatarFallback>Loading...</AvatarFallback>
        </Avatar>
        <>
          {session && (
            <div className="flex flex-col text-sm text-white">
              <span className="font-medium truncate w-32">
                {session?.user?.name}
              </span>
              <span className="truncate w-32">{session?.user?.email}</span>
            </div>
          )}
        </>
      </SidebarFooter>
    </Sidebar>
  );
};

export default UserDashboard;
