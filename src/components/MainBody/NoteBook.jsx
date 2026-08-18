import './NoteBook.css';
import { useEffect, useState } from 'react';
import trashicon from '../../assets/notebookpng/trash.png'
import checkicon from '../../assets/notebookpng/check.png'


export function NoteBook() {

    const [input, setInput] = useState("");
    const [notes, setNotes] = useState([]);

    const storage =
        typeof chrome !== "undefined" &&
            chrome.storage &&
            chrome.storage.local
            ? {
                get: (key, cb) => chrome.storage.local.get(key, cb),
                set: data => chrome.storage.local.set(data)
            }
            : {
                get: (key, cb) =>
                    cb({
                        [key]: JSON.parse(
                            localStorage.getItem(key) || "[]"
                        )
                    }),
                set: data => {
                    for (const key in data) {
                        localStorage.setItem(
                            key,
                            JSON.stringify(data[key])
                        );
                    }
                }
            };


    function saveNotes(updatedNotes) {
        storage.set({ notes: updatedNotes });
    }


    function addNote() {
        const text = input.trim();

        if (!text) return;

        const newNote = {
            text: text,
            completed: false
        };

        const updatedNotes = [
            newNote,
            ...notes
        ];

        setNotes(updatedNotes);
        saveNotes(updatedNotes);

        setInput("");
    }


    function toggleNote(index) {
        const updatedNotes = notes.map((note, i) =>
            i === index
                ? {
                    ...note,
                    completed: !note.completed
                }
                : note
        );

        setNotes(updatedNotes);
        saveNotes(updatedNotes);
    }


    function deleteNote(index) {
        const updatedNotes = notes.filter(
            (_, i) => i !== index
        );

        setNotes(updatedNotes);
        saveNotes(updatedNotes);
    }


    useEffect(() => {

        storage.get("notes", ({ notes = [] }) => {
            setNotes(notes);
        });

    }, []);


    return (
        <div className="notebook">

            <input
                type="text"
                id="noteInput"
                placeholder="Add a note"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addNote();
                    }
                }}
            />

            <button
                id="addBtn"
                onClick={addNote}
            >
                +
            </button>


            <div
                className="notes"
                id="notesContainer"
            >

                {notes.map((note, index) => (

                    <div
                        className="note"
                        key={index}
                    >

                        <img
                            className={`check ${note.completed ? "completed" : ""}`}
                            src={checkicon}
                            alt="check"
                            onClick={() => toggleNote(index)}
                        />

                        <p
                            className={
                                note.completed
                                    ? "completed"
                                    : ""
                            }
                        >
                            {note.text}
                        </p>

                        <img
                            className="delete"
                            src={trashicon}
                            alt="delete"
                            onClick={() => deleteNote(index)}
                        />

                    </div>

                ))}

            </div>

        </div>
    );
}