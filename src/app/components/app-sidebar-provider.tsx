import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/commons/auth";
export default async function AppSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const activeUser: any = session?.user;
  return (
    <SidebarProvider>
      <AppSidebar accessToken={activeUser.accessToken} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
