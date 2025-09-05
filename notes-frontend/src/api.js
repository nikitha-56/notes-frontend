const BASE_URL = "https://notes-backend-production-d5f1.up.railway.app/api/notes";

export const getNotes = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

export const createNote = async (note) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};

export const updateNote = async (id, note) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
};

export const deleteNote = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
};

// Generate shareId for a note (backend creates it if not present)
export const generateShareId = async (id) => {
  const res = await fetch(`https://notes-backend-production-d5f1.up.railway.app/api/notes/${id}/share`, {
    method: "POST"
  });
  if (!res.ok) throw new Error("Failed to generate shareId");
  return await res.json(); // returns note with shareId
};

// Fetch a note by its shareId
export const getNoteByShareId = async (shareId) => {
  const res = await fetch(`https://notes-backend-production-d5f1.up.railway.app/api/notes/share/${shareId}`);
  if (!res.ok) throw new Error("Note not found");
  return await res.json();
};

