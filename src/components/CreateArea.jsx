import React, { useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import toast from "react-hot-toast"

function CreateArea(props) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    // Create refs for both title and content inputs
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    function handleChange(event) {
        const { name, value } = event.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }



    function submitNote(event) {
        event.preventDefault();



        if (!note.title.trim() || !note.content.trim()) {
            setErrorMessage("Please fill out both title and content fields.");
            return;
        }

        if (note.title && note.content) {

        }

        setErrorMessage("");

        props.onAdd(note);

        setNote({
            title: "",
            content: ""
        });
    }

    function expand() {
        setIsExpanded(true);
        setTimeout(() => {
            if (titleRef.current && !note.title) {
                titleRef.current.focus(); // Focus on title if empty on expand
            } else if (contentRef.current) {
                contentRef.current.focus(); // Focus on content otherwise
            }
            if (isExpanded && !note.title) {
                toast.error("Title required")
            }
        }, 0)

    }


    return (
        <div>
            <form className="create-note">
                {isExpanded &&
                    <input
                        name="title"
                        onChange={handleChange}
                        value={note.title}
                        ref={titleRef}
                        placeholder="Title"
                        className={isExpanded ? "expanded-input" : ""} 
                    />
                }

                <textarea
                    name="content"
                    onClick={expand}
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                    ref={contentRef}
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}


export default CreateArea;
