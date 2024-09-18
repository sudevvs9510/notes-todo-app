import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const existData = JSON.parse(localStorage.getItem('todos')) || [];
  console.log(existData);
  
    const [notes, setNotes] = useState(existData);
    

    function addNote(newNote) {

      const existingNotes = JSON.parse(localStorage.getItem('todos')) || [];
      const noteExists = existingNotes.some(note => note.title === newNote.title && note.content === newNote.content);

  if (noteExists) {
    alert("This note already exists.");
    return;
  }

      const newData = [...notes, newNote]
        setNotes(newData)
        localStorage.setItem('todos',JSON.stringify(newData)) 
    }

    function deleteNote(id) {
     const newNotes =  notes.filter((noteItem, index) =>  index !== id)
        setNotes(newNotes)
        localStorage.setItem("todos", JSON.stringify(newNotes));
    }


    function editNote(id, editedTitle, editedContent) {
      const updatedNotes = notes.map((noteItem, index) => {
        if (index === id) {
          return { ...noteItem, title: editedTitle, content: editedContent };
        }
        return noteItem;
      });
      setNotes(updatedNotes);
      localStorage.setItem("todos", JSON.stringify(updatedNotes));
    }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
            <Note
            key={index}
            id={index}
            title={noteItem.title} 
            content={noteItem.content} 
            onDelete={deleteNote} 
            onEdit={editNote}
            /> 
        );
      })}
      <Footer />
    </div>
  );
}

export default App;