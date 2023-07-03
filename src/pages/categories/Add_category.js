import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React from "react";
import Layout from "../../components/Layout";

export default function Add_category() {
    const [category, setCategory] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const handleChange = (e) => {
        setCategory(e.target.value);
    };

    const onSubmitHandlear = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors("");
        setSuccess(false);

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_API_URL}/category`,
                { category }
            );
            setSuccess(data.msg);
            setLoading(false);
            setCategory("");
        } catch ({ response }) {
            setErrors(response?.data?.msg);
            setLoading(false);
            console.log(response?.data.msg);
        }
    };

    return (
        <Layout>
            {success && (
                <Alert severity="success" sx={{ width: 500 }}>
                    {success}
                </Alert>
            )}

            {errors && (
                <Alert severity="error" sx={{ width: 500 }}>
                    {errors}
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
                <Typography variant="h5"> Add a new category </Typography>
                <TextField
                    // error={errors?.["category"]}
                    label="Category"
                    variant="outlined"
                    type="text"
                    name="category"
                    onChange={handleChange}
                    required
                    value={category}
                    // helperText={errors?.["category"]?.msg}
                />
                <br />
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
