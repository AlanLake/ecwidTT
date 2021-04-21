import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import Picture from "./Picture";
import Logo from "./Logo";
import { parsingFile, addingPic } from "../util/functions";

export default function Main() {
  const pictures = useSelector((state) => state.pictures);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const activeStyle = {
    style: {
      backgroundColor: "rgb(223, 217, 217)",
      transition: "0.5s",
    },
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) =>
        dispatch({ type: "ADDPIC", value: URL.createObjectURL(file) })
      );
    },
    noClick: true,
  });

  return (
    <div>
      <Logo />
      <div className="uploader">
        <input
          type="text"
          onKeyPress={(event) => addingPic(event, dispatch)}
          placeholder="Paste an url"
          onChange={(event) => setValue(event.target.value)}
        />
        <button
          onClick={function () {
            if (value.match(/^https/)) {
              dispatch({ type: "ADDPIC", value: value });
            } else {
              return;
            }
          }}
        >
          Add picture
        </button>
        <input
          type="file"
          onChange={(event) => parsingFile(event, dispatch)}
          multiple
        />
      </div>
      {pictures.length !== 0 ? (
        <div {...getRootProps(isDragActive ? activeStyle : {})}>
          <input {...getInputProps()}></input>
          <div className="gallery-grid">
            {pictures.map((elem, index) => (
              <Picture url={elem} index={index} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div {...getRootProps(isDragActive ? activeStyle : {})}>
          <input {...getInputProps()}></input>
          <p className="drag-and-drop">Or drop files in here</p>
        </div>
      )}
    </div>
  );
}
