import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import BookDetail from "./BookDetail";
import Sidebar from "./Sidebar";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
