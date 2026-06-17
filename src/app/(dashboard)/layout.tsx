import DashboardNavbar from "@/components/layout/dashboardNavbar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
      <DashboardNavbar/>

      <main>{children}</main>
    </>
  );
}