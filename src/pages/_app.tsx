import { myQueryClient } from "@/api/api";
import { AuthProvider, ProtectRoute } from "@/common/context/authcontext";
import ThemeContextProvider from "@/common/context/themecontext/ThemeContext";
import { AppLayout } from "@/common/layout/applayout";
import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={myQueryClient}>
      <AuthProvider>
        <ProtectRoute>
          <ThemeContextProvider>
            <AppLayout>
              <CssBaseline />
              <Component {...pageProps} />
            </AppLayout>
          </ThemeContextProvider>
        </ProtectRoute>
      </AuthProvider>
    </QueryClientProvider>
  );
}
