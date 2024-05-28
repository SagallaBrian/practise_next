import { Inter, Roboto } from "next/font/google";
import { ReactNode } from "react";
import { AuthLayout, MainLayout } from "@/common/layout";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
});

function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={`${inter.className} h-screen container-fluid`}>
      {pathname.startsWith("/auth") ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </div>
  );
}

export default AppLayout;
