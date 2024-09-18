
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from "react-hot-toast"

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [errorMessage, setErrorMessage] = useState("");
  const [createdDate, setCreatedDate] = useState(new Date().toLocaleDateString());

  function handleDelete() {
    props.onDelete(props.id);
    toast.success("Note deleted successfully!"); 
  }

  function handleEdit() {
    setIsEditing(true);
    
  }

  function handleSave() {
    if (!editedTitle.trim() || !editedContent.trim()) {
      setErrorMessage("Please fill out both title and content fields.");
      return;
    }

    setErrorMessage("");
    setIsEditing(false);
    props.onEdit(props.id, editedTitle, editedContent);
    toast.success("Note edited successfully!"); 
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title") {
      setEditedTitle(value);
    } else {
      setEditedContent(value);
    }
  }

  return (
    <div className={"note" + (isEditing ? " editing" : "")}>
      {!isEditing ? (
        <div>
          <h1 className="title">{props.title} <span className="date">{createdDate}</span></h1>
          <p className="note-content">{props.content}</p>
          <p className="created-date "> </p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={handleChange}
            name="title"
            className={"edit-input" + (isEditing ? " editing" : "")}
            placeholder="Title"
          />
          <textarea
            value={editedContent}
            onChange={handleChange}
            name="content"
            rows={3}
            className={"edit-textarea" + (isEditing ? " editing" : "")}
            placeholder="Take a note..."
          />
        </div>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {!isEditing ? (
        <button onClick={handleEdit}>
          <EditIcon />
        </button>
      ) : (
        <button onClick={handleSave}>
          Save
        </button>
      )}
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;





