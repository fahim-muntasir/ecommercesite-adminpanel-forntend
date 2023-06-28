import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";

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
    setValues({
      ...values,
      avatar: e.target.files[0],
    });
  };

  const onSubmitHandlear = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/user`, {
        ...values,
      });
      console.log("hello");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
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
        label="First Name"
        variant="outlined"
        type="text"
        name="firstName"
        onChange={handleChange("firstName")}
        required
      />
      <TextField
        label="Last Name"
        variant="outlined"
        type="text"
        name="lastName"
        onChange={handleChange("lastName")}
        required
      />
      <TextField
        label="User Name"
        variant="outlined"
        type="text"
        name="userName"
        onChange={handleChange("userName")}
        required
      />
      <TextField
        label="Email Address"
        variant="outlined"
        type="email"
        name="userEmail"
        onChange={handleChange("userEmail")}
        required
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User role</InputLabel>
        <Select
          defaultValue=""
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="User role"
          naem="userRole"
          onChange={handleChange("userRole")}
        >
          <MenuItem value="">Select User Role</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </Select>
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
        </Stack>
      </FormControl>

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Comfirm Password"
        />
      </FormControl>
      <Button variant="contained" type="submit" color="primary">
        Submit
      </Button>
    </Box>
  );
}
