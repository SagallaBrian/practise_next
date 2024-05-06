import { Inter, Roboto } from "next/font/google";
import { ReactNode } from "react";
import { useAuth } from "@/common/context/authcontext";
import { AuthLayout, MainLayout } from "@/common/layout";

const inter = Inter({
  subsets: ["latin"],
});

function AppLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className={`${inter.className} h-screen container-fluid`}>
      {user && user.email ? (
        <MainLayout>{children}</MainLayout>
      ) : (
        <AuthLayout>{children}</AuthLayout>
      )}
    </div>
  );
}

export default AppLayout;
