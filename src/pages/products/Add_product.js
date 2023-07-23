import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import axios from "../../axios/axiosInstance";
import Layout from "../../components/Layout";
import PhotoUploadModal from "../../components/PhotoUploadModal";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, categories, theme) {
  return {
    fontWeight:
      categories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Add_product() {
  const theme = useTheme();
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    price: "",
    slag: "",
    thumbnail: "",
    images: [],
  });
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [allCategories, setAllCategories] = React.useState([]);
  const [isMoreImage, setIsMoreImage] = React.useState(false);

  // get all categories
  const populateCategories = async (parentId) => {
    if (parentId) {
      const { data: response } = await axios.get(`/category/i/${parentId}`);

      const filteredCategory = allCategories.filter(
        (item) => categories.includes(item._id) || item._id === parentId
      );

      setAllCategories([...filteredCategory, ...response.data]);
    } else {
      const { data } = await axios.get(`/category`);
      setAllCategories(data);
    }
  };

  useEffect(() => {
    populateCategories();
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;

    setCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    populateCategories(value[value.length - 1]);
  };

  // submit handlear
  const onSubmitHandlear = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors();
    setSuccess(false);

    try {
      const { data } = await axios.post(`/products`, {
        ...values,
        category: categories,
      });
      setSuccess(data.msg);
      setLoading(false);

      // reset state
      setValues({
        title: "",
        description: "",
        price: "",
        slag: "",
        thumbnail: "",
        images: [],
      });
      setCategories([]);
    } catch ({ response }) {
      if (response?.data?.errors) {
        setErrors(response?.data?.errors);
      } else {
        setErrors(response?.data?.msg);
      }

      setLoading(false);
    }
  };

  const productAvatarChangeController = (response) => {
    const { name, data } = response;
    if (name === "thumbnail") {
      setValues({ ...values, thumbnail: data[0] });
    }
    if (name === "productAvatars") {
      setValues({ ...values, images: data });
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
        <Typography variant="h5"> Add a new Product </Typography>
        <TextField
          error={errors?.["title"]}
          label="Title"
          variant="outlined"
          type="text"
          name="title"
          onChange={handleChange("title")}
          required
          helperText={errors?.["title"]?.msg}
        />
        <FormControl>
          <InputLabel id="demo-multiple-name-label">
            Category with Sub-category
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={categories}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Category with Sub-category" />}
            MenuProps={MenuProps}
            required
          >
            {allCategories.map((item) => (
              <MenuItem
                key={item._id}
                value={item._id}
                style={getStyles(item.name, categories, theme)}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          error={errors?.["price"]}
          helperText={errors?.["price"]?.msg}
          label="Price"
          variant="outlined"
          type="number"
          name="price"
          onChange={handleChange("price")}
          required
        />
        <TextField
          error={errors?.["slag"]}
          helperText={errors?.["slag"]?.msg}
          label="Slag"
          variant="outlined"
          type="text"
          name="slag"
          onChange={handleChange("slag")}
          required
        />

        <TextField
          error={errors?.["description"]}
          label="Description"
          variant="outlined"
          type="text"
          name="description"
          onChange={handleChange("description")}
          required
          helperText={errors?.["description"]?.msg}
          rows={4}
          multiline
        />

        <Box>
          <Typography sx={{ marginBottom: "10px" }}>
            Upload Product Thamnel
          </Typography>
          <PhotoUploadModal
            selectLength="1"
            name="thumbnail"
            updateState={productAvatarChangeController}
          >
            <WallpaperIcon />
          </PhotoUploadModal>
        </Box>

        <Box>
          <FormControlLabel
            control={<Checkbox onChange={() => setIsMoreImage(!isMoreImage)} />}
            label="Add more images"
          />
          {isMoreImage && (
            <>
              <Typography sx={{ fontSize: "13px" }}>
                You will be able to add maximum 3 images
              </Typography>
              <PhotoUploadModal
                selectLength="3"
                name="productAvatars"
                updateState={productAvatarChangeController}
              >
                <AddPhotoAlternateIcon />
              </PhotoUploadModal>
            </>
          )}
        </Box>

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
