import React, { useState, useEffect } from "react";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import axios from 'axios';

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button 
        onClick={() => {
            props.ondelete(props.id)
            axios({
              url:"/tododata",
              method: "POST",
              headers: {
                "content-Type": "application/json"
              },
              data: JSON.stringify({
                  id: props.id
              })
            })
        }}
      >
      <DeleteSweepIcon />
      </button>
    </div>
  );
}

export default Note;
