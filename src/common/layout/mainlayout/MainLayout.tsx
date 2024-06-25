import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";

import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { MainSideBar } from "./components";
import { useAuth } from "@/common/context";
import { Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useCustomTheme } from "@/common/context/themecontext/ThemeContext";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";

const drawerWidth = 240;

function MainLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const { mode, toggleMode } = useCustomTheme();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <MainSideBar />
        </Box>
      </Drawer>
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          width: "calc(100% - 240px)",
          p: 3,
          boxSizing: "border-box",
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            // backgroundColor: "white",
          }}
          elevation={1}
          color="transparent"
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div" color="primary">
              Toolbar
            </Typography>
            <IconButton onClick={toggleMode}>
              {mode === "light" ? <LightMode /> : <DarkMode />}
            </IconButton>

            <Button variant="outlined" onClick={logout}>
              Logout
            </Button>
            <Link href={"/auth/register"}>Register</Link>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
export default MainLayout;
