import {Avatar, Drawer, List, Stack, Toolbar, Typography,} from "@mui/material";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import {appRoutes} from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import {useAppSelector} from "../../redux/store";

const Sidebar = () => {
    const user = useAppSelector(state => state.auth.authUser);
    const role = useAppSelector(state => state.auth.role);

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: sizeConfigs.sidebar.width,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: sizeConfigs.sidebar.width,
                    boxSizing: "border-box",
                    borderRight: "0px",
                    backgroundColor: colorConfigs.sidebar.bg,
                    color: colorConfigs.sidebar.color,
                },
            }}
        >
            <List disablePadding>
                <Toolbar sx={{marginBottom: "20px"}}>
                    <Stack sx={{width: "100%"}} direction="row" justifyContent="center">
                        <Avatar
                            src={assets.images.logo}
                            style={{width: "60%", padding: "15%"}}
                        />
                    </Stack>
                </Toolbar>
                {user ? <div
                    style={{
                        marginBottom: "5%",
                    }}
                >
                    <Typography
                        variant="caption"
                        style={{
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            marginLeft: "15%",
                        }}
                    >
                        {user.firstName} {user.lastName} - {role}
                    </Typography>
                </div> : null}
                {appRoutes(role).map((route, index) =>
                    route.sidebarProps ? (
                        route.child ? (
                            <SidebarItemCollapse item={route} key={index}/>
                        ) : (
                            <SidebarItem item={route} key={index}/>
                        )
                    ) : null
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;
