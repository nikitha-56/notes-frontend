import React, { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote , getNoteById} from "../api";
import NoteForm from "./NoteForm";

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (note) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, note);
        setEditingNote(null);
      } else {
        await createNote(note);
      }
      fetchNotes(); // refresh after change
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (id) => {
  try {
    const data = await getNoteById(id);
    const shareUrl = `${window.location.origin}/share/${data.shareId}`;
    await navigator.clipboard.writeText(shareUrl);
    alert("Share link copied: " + shareUrl);
  } catch (err) {
    console.error(err);
    alert("Could not generate share link");
  }
};


  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Notes App</h1>

      <NoteForm onSubmit={handleSubmit} note={editingNote} />

      <div className="notes-wrapper">
        {notes.length === 0 ? (
          <p className="no-notes">No notes yet!</p>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <div key={note.id} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <div className="note-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setEditingNote(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
