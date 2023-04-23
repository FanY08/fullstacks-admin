import React, { useState } from "react";
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutline,
    Groups2Outlined,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImg from "../assets/images/profire.jpg";

const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutline />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />,
    },
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    const listNavRender = () =>
        navItems.map(({ text, icon }) => {
            if (!icon) {
                return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                    </Typography>
                );
            }
            const lcText = text.toLowerCase();
            return (
                <ListItem key={text} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate(`/${lcText}`);
                            setActive(lcText);
                        }}
                        sx={{
                            backgroundColor:
                                active === lcText
                                    ? theme.palette.secondary[300]
                                    : "transparent",
                            color:
                                active === lcText
                                    ? theme.palette.primary[600]
                                    : theme.palette.primary[200],
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                ml: "2rem",
                                color:
                                    active === lcText
                                        ? theme.palette.primary[600]
                                        : theme.palette.primary[200],
                            }}
                        >
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                            <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                    </ListItemButton>
                </ListItem>
            );
        });

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    components="nav"
                    onClose={() => setIsSidebarOpen(false)}
                    anchor="left"
                    variant="persistent"
                    open={isSidebarOpen}
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                    position="relative"
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="0.5rem"
                                >
                                    <Typography variant="h4" fontWeight="bold">
                                        ECOMVSION
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton
                                        onClick={() =>
                                            setIsSidebarOpen(!isSidebarOpen)
                                        }
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>{listNavRender()}</List>
                    </Box>
                    <AppBar
                        position="sticky"
                        sx={{
                            top: "auto",
                            bottom: 0,
                            bgcolor: theme.palette.background.alt,
                            paddingBottom: "1.5rem",
                        }}
                    >
                        <Divider />
                        <FlexBetween
                            textTransform="none"
                            gap="1rem"
                            m="1.5rem 2rem 0 2rem"
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImg}
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{
                                        color: theme.palette.secondary[100],
                                    }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{
                                        color: theme.palette.secondary[200],
                                    }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px",
                                }}
                            />
                        </FlexBetween>
                    </AppBar>
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
