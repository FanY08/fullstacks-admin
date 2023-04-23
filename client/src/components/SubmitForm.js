import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, IconButton, Stack, useTheme } from "@mui/material";
import { setMode } from "store/slice/globalSlice";
import { useDispatch } from "react-redux";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const SubmitForm = ({
    title,
    handleSubmit,
    path,
    slogan,
    isLogin,
    errInfo = undefined,
    email,
    pwd,
    setEmail,
    setPwd,
    signupInfo = undefined,
}) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <>
            <Box width="90%" textAlign="end" margin="2rem 0">
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlined sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightModeOutlined sx={{ fontSize: "25px" }} />
                    )}
                </IconButton>
            </Box>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                        {title}
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                        {!isLogin && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    type="text"
                                    id="name"
                                    value={signupInfo.name}
                                    onChange={(e) =>
                                        signupInfo.setName(e.target.value)
                                    }
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="city"
                                    label="city"
                                    type="text"
                                    id="city"
                                    value={signupInfo.city}
                                    onChange={(e) =>
                                        signupInfo.setCity(e.target.value)
                                    }
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="country"
                                    label="country"
                                    type="text"
                                    id="country"
                                    value={signupInfo.country}
                                    onChange={(e) =>
                                        signupInfo.setCountry(e.target.value)
                                    }
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="phoneNumber"
                                    label="phoneNumber"
                                    type="number"
                                    id="phoneNumber"
                                    value={signupInfo.phoneNumber}
                                    onChange={(e) =>
                                        signupInfo.setPhoneNumber(
                                            e.target.value
                                        )
                                    }
                                />
                            </>
                        )}
                        {errInfo.message !== "" && (
                            <Alert severity="error">{errInfo.message}</Alert>
                        )}
                        {isLogin && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                        )}
                        <Stack direction="row" justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    width: "50%",
                                }}
                            >
                                {title}
                            </Button>
                        </Stack>
                        <Grid container>
                            <Grid item xs>
                                {isLogin && (
                                    <Link
                                        href="#"
                                        variant="body2"
                                        color={theme.palette.primary[100]}
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </Grid>
                            <Grid item>
                                <Link
                                    href={path}
                                    variant="body2"
                                    color={theme.palette.primary[100]}
                                >
                                    {slogan}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};
export default SubmitForm;
