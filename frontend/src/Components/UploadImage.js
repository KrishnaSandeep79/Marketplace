import React from "react";
import { Button } from "@mui/material";
import "./UploadImage.css";


const UploadImage = (props) => {

  return (
    <Button  variant="contained" component="label" >
    Upload*
    <input required hidden id="image"  accept="image/*" type="file" onChange={props.handleFileUpload}/>
    </Button>
  );
};
export default UploadImage;
