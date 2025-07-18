import { SidebarTrigger,SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
  );
}

