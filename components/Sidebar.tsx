"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"

import { items } from "@/constants"
import { useSetRecoilState } from "recoil"
import currentViewState from "@/recoil/currentviewAtom";
import { signOut } from "next-auth/react";
  
  export function AppSidebar() {
    const setCurrentView = useSetRecoilState(currentViewState);
    return (
      <Sidebar className="mt-[6vh]">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroupLabel className="flex flex-col items-start gap-1">
            <h1>
              Dashboard
            </h1>
            <span>
              Your personalized content hub
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a onClick={() => {
                      if(item.title==="Logout"){
                        signOut();
                      }
                      setCurrentView(item.title as any);
                      }}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }