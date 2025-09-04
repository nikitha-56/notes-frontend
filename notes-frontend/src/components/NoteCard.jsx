import React from "react";

export default function NoteCard({ note, onEdit, onDelete }) {
  const handleShare = () => {
    const shareURL = `https://notes-backend-production-d5f1.up.railway.app/api/notes/share/${note.shareId}`;
    navigator.clipboard.writeText(shareURL);
    alert("Share link copied to clipboard!");
  };

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-actions">
        <button className="edit-btn" onClick={() => onEdit(note)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(note.id)}>Delete</button>
        <button className="share-btn" onClick={handleShare}>Share</button>
      </div>
    </div>
  );
}
