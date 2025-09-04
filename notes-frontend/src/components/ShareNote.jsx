import React, { useEffect, useState } from "react";
import { getNoteById } from "../api";
import { useParams } from "react-router-dom";

export default function ShareNote() {
  const { shareId } = useParams(); // must match the route param
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(shareId); // pass shareId
        setNote(data);
      } catch (err) {
        console.error(err);
        setNote(null); // handle not found
      }
    };
    fetchNote();
  }, [shareId]);

  if (!note) return <p>Loading note...</p>;

  return (
    <div className="app-container">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}
