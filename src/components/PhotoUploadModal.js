import CloseIcon from "@mui/icons-material/Close";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import UploadIcon from "@mui/icons-material/Upload";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckBox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import axios from "../axios/axiosInstance";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const useStyles = makeStyles(() => ({
  selectProductAvatar: {
    width: "100px",
    height: "65px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    border: "1px solid #c0c0c0",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ddd",
    },
  },
  selectedProductAvatar_hover: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "#afafaf54",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#4e4e4e",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
  },
  selectedProductAvatar: {
    position: "relative",
    width: "100px",
    height: "65px",
    borderRadius: "5px",
    border: "1px solid #c0c0c0",
    cursor: "pointer",
    "&:hover": {
      "& $selectedProductAvatar_hover": {
        opacity: 1,
        visibility: "visible",
      },
    },
  },
  checkBoxStyle: {
    position: "absolute",
    top: "0",
    right: "0",
  },
  photos: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    justifyContent: "space-between",
    gap: "10px",
    "@media (max-width: 600px)": {
      gridTemplateColumns: "auto auto",
    },
  },
  dialogContentStyle: {
    minWidth: "500px",
    "@media (max-width: 600px)": {
      minWidth: "300px",
    },
  },
  actionButton: {
    position: "absolute",
    top: "0",
    left: "0",
    display: "none",
  },
  avatar: {
    "&:hover": {
      "& $actionButton": {
        display: "block",
      },
      "& $checkBoxStyle": {
        display: "block !important",
      },
    },
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function PhotoUploadModal({ children, selectLength,  updateState, name }) {
  const fileInputRef = useRef(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");
  const [productImages, setProductImages] = React.useState([]);
  const [selectedAvatar, setSelectedAvatar] = React.useState([]);

  // get product avatar
  useEffect(() => {
    const getProductAvatar = async () => {
      const { data } = await axios.get("/productavatars");
      setProductImages(data.data);
    };

    getProductAvatar();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSuccess("");
    setError("");
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files;
    setLoading(true);
    setUploadProgress(0);
    setSuccess("");
    setError("");

    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append("avater", file[i]);
    }

    try {
      const { data } = await axios.post("/products/avater", formData, {
        onUploadProgress: (progressEvent) => {
          // Calculate and update the upload progress
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });

      const copyProductImages = [...productImages];
      data.data.forEach((info) => copyProductImages.unshift(info.filename));
      setProductImages(copyProductImages);

      setLoading(false);
      setSuccess(data?.msg);
    } catch ({ response }) {
      if (response.data.errors) {
        setError(response.data.errors.avatar.msg);
      } else {
        setError(response.data.msg);
      }

      setLoading(false);
    }
    setSelectedFile(file);
  };

  const avatarSelectController = (e, path) => {
    const copySelectedpath = [...selectedAvatar];
    if (e.target.checked) {
      if (selectedAvatar.length < selectLength) {
        copySelectedpath.push(path);
        setSelectedAvatar(copySelectedpath);
        updateState({name, data: copySelectedpath});
      } else {
        alert(`You are not able to add image more then ${selectLength}`);
      }
    } else {
      const newpath = copySelectedpath.filter((item) => item !== path);
      setSelectedAvatar(newpath);
      updateState({name, data: newpath});
    }
  };

  const displayStyle = (path) => {
    if (selectedAvatar.includes(path)) {
      return { display: "block" };
    } else {
      return { display: "none" };
    }
  };

  return (
    <div>
      {selectedAvatar.length === 0 && (
        <div onClick={handleClickOpen} className={classes.selectProductAvatar}>
          {children}
        </div>
      )}
      {selectedAvatar.length > 0 && (
        <Box sx={{ display: "flex", gap: "10px" }}>
          {selectedAvatar.map((item) => (
            <div
              onClick={handleClickOpen}
              className={classes.selectedProductAvatar}
              style={{
                backgroundImage: `url("http://localhost:5000/uploads/products/${item}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className={classes.selectedProductAvatar_hover}>
                {children}
              </div>
            </div>
          ))}
          {selectedAvatar.length < selectLength && (
            <div
              onClick={handleClickOpen}
              className={classes.selectProductAvatar}
            >
              {children}
            </div>
          )}
        </Box>
      )}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Uploaded Photos
          {loading && (
            <Box sx={{ width: "100%", marginBottom: "-7px" }}>
              <LinearProgressWithLabel value={uploadProgress} />
            </Box>
          )}
        </BootstrapDialogTitle>
        <DialogContent dividers className={classes.dialogContentStyle}>
          {success && (
            <Alert
              severity="success"
              sx={{ width: "100%", marginBottom: "10px" }}
            >
              {success}
            </Alert>
          )}
          {error && (
            <Alert
              severity="error"
              sx={{ width: "100%", marginBottom: "10px" }}
            >
              {error}
            </Alert>
          )}
          <Box className={classes.photos}>
            {productImages.map((img) => (
              <Box
                sx={{
                  width: "150px",
                  position: "relative",
                  minHeight: "40px",
                  display: "flex",
                  alignItems: "center",
                  maxHeight: "200px",
                  border: "1px solid rgb(110 110 110 / 10%)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                key={img}
                className={classes.avatar}
              >
                <img
                  src={`http://localhost:5000/uploads/products/${img}`}
                  alt="images"
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    maxHeight: "200px",
                  }}
                />
                <div
                  className={classes.checkBoxStyle}
                  style={displayStyle(img)}
                >
                  <CheckBox
                    id="checkbox"
                    checked={selectedAvatar.includes(img)}
                    onChange={(e) => avatarSelectController(e, img)}
                  />
                </div>
                <div className={classes.actionButton}>
                  <IconButton aria-label="delete">
                    <LinearScaleIcon />
                  </IconButton>
                </div>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          {selectedAvatar.length > 0 && <Button>Save</Button>}
          <Button autoFocus onClick={handleButtonClick}>
            Upload Photo <UploadIcon />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
            multiple
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
