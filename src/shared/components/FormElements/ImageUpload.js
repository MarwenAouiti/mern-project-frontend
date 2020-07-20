import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setpreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRed = useRef();

  // this function should trigger whenever a file changed
  // so we need to put file as a dependency
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };
  const pickImageHandler = () => {
    filePickerRed.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRed}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={pickedHandler}
      />
      <div className={`img-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
      </div>
      <Button type="button" onClick={pickImageHandler}>
        PICK IMAGE
      </Button>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
