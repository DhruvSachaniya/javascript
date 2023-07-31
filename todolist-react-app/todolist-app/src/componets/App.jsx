import React, { useState } from "react";
import ToDoItem from "./ToDoitem";
import InputArea from "./inputArea";
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);

  const [newlist, setnewlist] =  useState([]);

  function sendingdata(inputText){
    axios({
      url: 'http://localhost:5000/test',
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      data: JSON.stringify({
        TODODATA: inputText
      })
    })
  }

  function addItem(inputText) {
    setItems(prevItems => {
      return [...prevItems, inputText];
    });
    items.map((todoithem, index)=>{
      //
    })
    sendingdata(items);
  }



  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
