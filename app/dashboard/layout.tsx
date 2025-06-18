import { SidebarFooter, SidebarProvider } from "@/components/ui/sidebar";
import UserDashboard from "@/components/user/DashboardUser";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <UserDashboard />
        <main className="bg-[#101011] flex justify-center items-center w-full border border-neutral-600 rounded-sm my-2 overflow-y-auto">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
