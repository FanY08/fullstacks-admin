import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import {
    DarkModeOutlined,
    LightModeOutlined,
    Search,
    Settings,
    Menu as MenuIcon,
    ArrowDropDownCircleOutlined,
} from "@mui/icons-material";
import { logoutUser, setMode } from "store/slice/globalSlice";
import profileImg from "../assets/images/profire.jpg";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const clickHandler = (e) => setAnchorEl(e.currentTarget);
    const closeHandler = () => setAnchorEl(null);
    const logoutHandler = () => {
        dispatch(logoutUser());
        navigate("/login", { replace: true });
    };

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Left side */}
                <FlexBetween gap="1rem" marginRight="1rem">
                    <IconButton
                        onClick={() => setIsSidebarOpen((prev) => !prev)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search......" />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/* Right side */}
                <FlexBetween gap="1rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <IconButton>
                        <Settings />
                    </IconButton>
                    <FlexBetween>
                        <Button
                            onClick={clickHandler}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                component="img"
                                alt="profile"
                                src={profileImg}
                                height="30px"
                                width="30px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{
                                        color: theme.palette.secondary[100],
                                    }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.75rem"
                                    sx={{
                                        color: theme.palette.secondary[200],
                                    }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <ArrowDropDownCircleOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px",
                                }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={closeHandler}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
