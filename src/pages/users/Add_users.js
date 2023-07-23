import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React from "react";
import Layout from "../../components/Layout";

export default function Add_users() {
    const [values, setValues] = React.useState({
        firstName: "",
        lastName: "",
        userName: "",
        userEmail: "",
        userRole: "",
        avatar: "",
        password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [success, setSuccess] = React.useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const role = [
        {
            value: "Admin",
            label: "admin",
        },
        {
            value: "User",
            label: "user",
        },
    ];

    const Input = styled("input")({
        display: "none",
    });

    const fileHandleChange = (e) => {
        console.log(e.target.files[0]);
        setValues({
            ...values,
            avatar: e.target.files[0],
        });
    };

    const onSubmitHandlear = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess(false);

        if (values.password === values.confirm_password) {
            const formData = new FormData();

            const body = { ...values };
            delete body.confirm_password;

            for (const key in body) {
                formData.append(key, values[key]);
            }

            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_BACKEND_API_URL}/user`,
                    formData
                );
                setSuccess(data.msg);
                setLoading(false);
            } catch ({ response }) {
                setErrors(response?.data?.errors);
                setLoading(false);
                console.log(response?.data?.errors);
            }
        } else {
            alert("Your password is not matched!");
            setLoading(false);
        }
    };

    return (
        <Layout>
            {success && (
                <Alert severity="success" sx={{ width: 500 }}>
                    {success}
                </Alert>
            )}
            {errors?.["avatar"] && (
                <Alert severity="error" sx={{ width: 500 }}>
                    {errors["avatar"]}
                </Alert>
            )}
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "50ch" },
                }}
                noValidate
                autoComplete="off"
                encType="multipart/form-data"
                onSubmit={onSubmitHandlear}
            >
                <Typography variant="h5"> Add a new user </Typography>
                <TextField
                    error={errors?.["firstName"]}
                    label="First Name"
                    variant="outlined"
                    type="text"
                    name="firstName"
                    onChange={handleChange("firstName")}
                    required
                    helperText={errors?.["firstName"]?.msg}
                />
                <TextField
                    error={errors?.["lastName"]}
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    name="lastName"
                    onChange={handleChange("lastName")}
                    required
                    helperText={errors?.["lastName"]?.msg}
                />
                <TextField
                    error={errors?.["userName"]}
                    helperText={errors?.["userName"]?.msg}
                    label="User Name"
                    variant="outlined"
                    type="text"
                    name="userName"
                    onChange={handleChange("userName")}
                    required
                />
                <TextField
                    error={errors?.["userEmail"]}
                    helperText={errors?.["userEmail"]?.msg}
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    name="userEmail"
                    onChange={handleChange("userEmail")}
                    required
                />

                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <TextField
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        error={errors?.["password"]}
                        helperText={errors?.["password"]?.msg}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-comfirm-password">
                        Comfirm Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-comfirm-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.confirm_password}
                        onChange={handleChange("confirm_password")}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Comfirm Password"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        error={errors?.["userRole"]}
                        helperText={errors?.["userRole"]?.msg}
                        defaultValue=""
                        select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="User role"
                        naem="userRole"
                        SelectProps={{
                            native: true,
                        }}
                        onChange={handleChange("userRole")}
                    >
                        <option value="">Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </TextField>
                </FormControl>

                <FormControl>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <label htmlFor="contained-button-file">
                            <Input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                name="avatar"
                                onChange={fileHandleChange}
                            />
                            <Button
                                variant="outlined"
                                component="span"
                                startIcon={<PhotoCamera />}
                            >
                                Upload Photo
                            </Button>
                        </label>
                        {values.avatar && (
                            <>
                                <Avatar
                                    alt="upload pic"
                                    src={URL.createObjectURL(values.avatar)}
                                />
                                <span>{values.avatar?.name}</span>
                            </>
                        )}
                    </Stack>
                </FormControl>

                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={loading}
                >
                    Submit
                </Button>
            </Box>
        </Layout>
    );
}
