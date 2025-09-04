import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";
import { getNotes, createNote, updateNote, deleteNote } from "../api";

export default function NoteList() {
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

  useEffect(() => { fetchNotes(); }, []);

  const handleAddOrUpdate = async (note) => {
    if (editingNote) {
      await updateNote(editingNote.id, note);
      setEditingNote(null);
    } else {
      await createNote(note);
    }
    fetchNotes();
  };

  const handleEdit = (note) => setEditingNote(note);
  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  return (
    <div className="notes-wrapper">
      <NoteForm onSubmit={handleAddOrUpdate} note={editingNote} />
      <h2>Your Notes</h2>
      <div className="notes-grid">
        {notes.length === 0 && <p className="no-notes">No notes yet</p>}
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
