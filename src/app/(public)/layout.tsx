import Navbar from "@/components/layout/publicNavabar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
}