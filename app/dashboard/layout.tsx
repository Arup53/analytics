import { SidebarProvider } from "@/components/ui/sidebar";
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
        <main className="bg-[#0D0D0D] flex justify-center items-center w-full">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
