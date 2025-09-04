import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteList from "./components/NoteList";
import ShareNote from "./components/ShareNote";
import "./App.css";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/share/:shareId" element={<ShareNote />} />
      </Routes>
    </Router>
  );
}

export default App;
