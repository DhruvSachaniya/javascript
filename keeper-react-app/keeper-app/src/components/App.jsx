import React, { useState, useEffect  } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [trackItems, setTrackItems] = useState([]);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/senddata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => {
      return response.json();
    }).then(jsonData => {
        setNotes(jsonData.tododata)
    }).catch(err => {
      console.log(err);
    })
  })

  function addTrackItem(tracktitle, trackcontent)  {
      setTrackItems((prevItems) => [...prevItems, { tracktitle, trackcontent }]);
  }

  function deleteItem(id) {
    setTrackItems((prevItems) => prevItems.filter((item, index) => index !== id));
  }
  // function deleteItem(id) {
  //   setNotes((prevItems) => prevItems.filter((item, index) => console.log(id)));
  // }

  
  return (

    <div>
      <Header />
      <CreateArea 
      onAddlist={addTrackItem}
      />
      {notes.map((value, index)=> (
        <Note 
        key={value.id} 
        id={value._id} 
        title={value.title} 
        content={value.content}
        ondelete={deleteItem}
        />
      ))}
      <Footer />
    </div>
  );
}


export default App;
