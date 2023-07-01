import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Avatar,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0e0e069 0%, #f5f5f540 100%)",
        padding: "20px 0",
        marginTop: "50px",
        marginBottom: "20px",
    },
    avatar: {
        backgroundColor: 50,
    },
    form: {
        width: "100%",
    },
    submit: {},
}));

const Login = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_API_URL}/login`,
                { userName: username, password }
            );

            localStorage.setItem("Auth", data?.token);
            setLoading(false);
            navigate("/");
        } catch ({ response }) {
            setError(response.data.msg);
            setLoading(false);
        }
    };

    return (
        <>
            <Container
                component="main"
                maxWidth="xs"
                className={classes.container}
            >
                <div>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Admin Dashboard Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
            {/* error alert */}
            {error && (
                <Alert severity="error" sx={{ width: 400, margin: "auto" }}>
                    {error}
                </Alert>
            )}
        </>
    );
};

export default Login;
