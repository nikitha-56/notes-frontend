const BASE_URL = "https://notes-backend-production-d5f1.up.railway.app/api/notes";

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email && user.password) {
    const credentials = btoa(`${user.email}:${user.password}`);
    return {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    };
  }
  return {
    "Content-Type": "application/json",
  };
};

export const getNotes = async () => {
  const res = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

export const createNote = async (note) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(note),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create note: ${res.status} ${errorText}`);
  }
  return res.json();
};

export const updateNote = async (id, note) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
};

export const deleteNote = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete note");
};

// Generate shareId for a note (backend creates it if not present)
export const generateShareId = async (id) => {
  const res = await fetch(`https://notes-backend-production-d5f1.up.railway.app/api/notes/${id}/share`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to generate shareId");
  return await res.json(); // returns note with shareId
};

// Fetch a note by its shareId
export const getNoteByShareId = async (shareId) => {
  const res = await fetch(`https://notes-backend-production-d5f1.up.railway.app/api/notes/share/${shareId}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Note not found");
  return await res.json();
};

