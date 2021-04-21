import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import {removePic} from '../util/functions'

export default function Picture({url, index}) {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

   useEffect(() => {
     setLoading(false);
   }, []);

  
  return (<> { loading ? <div style={{width:'320px', height:'150px'}}>Loading</div> : 
    <div
      className="gallery-grid__cell"
    >
      <img src={url} alt="" />
      <button onClick={() => removePic(index, dispatch)} className="gallery-grid__cell__delete-button">
        X
      </button>
  </div>}</>
  );
}
