export const parsingFile = (event, dispatch) => {
  const reader = new FileReader();
  if(event.target.files.length === 0){
    return;
  }
  if (event.target.files[0].type === "application/json") {
    reader.onload = function ReaderOnLoad(event) {
      const obj = JSON.parse(event.target.result);
      console.log(event.target.result);
      obj.galleryImages.forEach((elem) => {
        if ("url" in elem) {
          dispatch({ type: "ADDPIC", value: elem.url });
        }
      });
    };
    reader.readAsText(event.target.files[0]);
  }
  if (event.target.files[0].type.includes("image/")) {
    Array.from(event.target.files).forEach((file) =>
      dispatch({ type: "ADDPIC", value: URL.createObjectURL(file) })
    );
  } else {
    return;
  }
};


export const addingPic = (event, dispatch) => {
    if (event.target.value.length === 0) {
      return;
    } else if (event.key === "Enter")
      dispatch({ type: "ADDPIC", value: event.target.value });
  };

export  const removePic = (index, dispatch) => {
  dispatch({ type: "REMOVEPIC", value: index });
};