import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";

import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { MainSideBar } from "./components";

const drawerWidth = 240;

function MainLayout({ children }: { children: ReactNode }) {
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
            backgroundColor: "white",
          }}
          elevation={1}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div" color="primary">
              Toolbar
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
export default MainLayout;
