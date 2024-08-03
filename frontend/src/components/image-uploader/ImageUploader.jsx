import React, { useRef, useState } from "react";
import { Image } from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

const ImageUploader = ({ formikProps, defaultImage }) => {
  const imageInput = useRef(null);

  const [uploadedImage, setUploadedImage] = useState(
    defaultImage ? "http://127.0.0.1:8000" + defaultImage : null
  );
  const [imageName, setImageName] = useState("");

  const handleImageRemove = (props) => {
    setUploadedImage(null);
    props.values.image_name = null;
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: 3,
        py: 5,
        border: "1px dashed gray",
        bgcolor: "transparent",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "550px",
      }}
      onClick={() => imageInput.current && imageInput.current.click()}
    >
      <Box
        component="input"
        type="file"
        name="image"
        onChange={(event) => {
          if (
            imageInput.current &&
            imageInput.current.files &&
            imageInput.current.files.length > 0
          ) {
            const file = imageInput.current.files[0];
            formikProps.setFieldValue("image_name", file);

            if (
              event.target.files &&
              event.target.files[0] &&
              event.target.files[0].type.startsWith("image/")
            ) {
              setUploadedImage(URL.createObjectURL(event.target.files[0]));
              setImageName(file.name);
            }
          }
        }}
        ref={imageInput}
        style={{ display: "none" }}
      />
      <Box sx={{ width: "100%" }}>
        {!uploadedImage && (
          <Typography sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Image /> Select image to upload (optional)
          </Typography>
        )}
        {uploadedImage && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              width: "100%",
              p: 1,
              borderRadius: "8px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box
                component="img"
                src={uploadedImage}
                alt="uploaded image"
                width={100}
                height={100}
                sx={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                {imageName}
              </Typography>
            </Box>
            <IconButton onClick={() => handleImageRemove(formikProps)}>
              <Close />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageUploader;
