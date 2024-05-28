import { myQueryClient } from "@/api/api";
import { AuthProvider, ProtectRoute } from "@/common/context/authcontext";
import { AppLayout } from "@/common/layout/applayout";
import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={myQueryClient}>
      <AuthProvider>
        <ProtectRoute>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ProtectRoute>
      </AuthProvider>
    </QueryClientProvider>
  );
}
