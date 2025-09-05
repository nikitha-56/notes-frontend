import React, { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote ,generateShareId } from "../api";
import NoteForm from "./NoteForm";

export default function NoteList({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

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
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

 const handleShare = async (note) => {
  try {
    let shareId = note.shareId;
    if (!shareId) {
      const updatedNote = await generateShareId(note.id);
      shareId = updatedNote.shareId;
    }
    const shareUrl = `${window.location.origin}/share/${shareId}`;
    await navigator.clipboard.writeText(shareUrl);
    alert("Share link copied: " + shareUrl);
  } catch (err) {
    console.error(err);
    alert("Failed to generate share link");
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
      <button onClick={onLogout} style={{ float: "right" }}>Logout</button>

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
                  <button
                    className="share-btn"
                    onClick={() => handleShare(note)}
                  >
                    Share
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
