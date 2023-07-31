// import React, { useState } from "react";

// function CreateArea(props) {
//   const [Title, setTitle] = useState({
//     title: "",
//     content: ""
//   });

//   const [tracktitle, settitle] = useState([]);
//   const [trackcontent, setcontent] = useState([]);

//   function takinginput(event) {
//     const { name, value } = event.target;

//     setTitle((prevalue) => {
//       return {
//         ...prevalue,
//         [name]: value
//       };
//     });
//   }

//   function onaddbuttion(event) {
//     event.preventDefault();
//     settitle((pre) => {
//       return [...pre, Title.title];
//     });
//     setcontent((pre) => {
//       return [...pre, Title.content];
//     });
//     setTitle({
//       title: "",
//       content: ""
//     });
//   }

//   return (
//     <div>
//       <form onSubmit={onaddbuttion} >
//         <input onChange={takinginput} name="title" placeholder="Title" />
//         <textarea
//           onChange={takinginput}
//           name="content"
//           placeholder="Take a note..."
//           rows="3"
//         />
//         <button
//         onClick={() => {
//           props.onAddlist(tracktitle, trackcontent)
//         }}
//         type="submit">Add</button>
//       </form>
//     </div>
//   );
// }

// export default CreateArea;

import React, { useEffect, useState } from "react";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from 'axios';

function CreateArea(props) {
  const [tracktitle, setTracktitle] = useState("");
  const [trackcontent, setTrackcontent] = useState("");

  const [enimation, setenimation] = useState(false);
  

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title") {
      setTracktitle(value);
    } else if (name === "content") {
      setTrackcontent(value);
    }
  }

  function handleClick(event) {
    event.preventDefault();
    props.onAddlist(tracktitle, trackcontent);
    setTracktitle("");
    setTrackcontent("");

    axios({
      url: "/todo",
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      data: JSON.stringify({
        todoTitle: tracktitle,
        todoContent: trackcontent
      })
    })
  }

  return (
    <form className="create-note">
    <div>
      {enimation && <input 
      name="title" 
      onChange={handleChange} 
      value={tracktitle} 
      placeholder="Title" 
      />}
      <textarea 
      name="content"
      onClick={()=>{
            setenimation(true)
          }} 
      onChange={handleChange} 
      value={trackcontent} 
      placeholder="Take a note..." 
      rows={enimation ? "3" : "1"} 
      />
      <Zoom in={enimation}>
      <Fab onClick={handleClick}>
      <NoteAddIcon />
      </Fab>
      </Zoom>
    </div>
    </form>
  );
}

export default CreateArea;
