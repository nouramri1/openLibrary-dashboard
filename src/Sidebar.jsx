import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#111",
      color: "#eee",
      padding: "20px",
      height: "100vh"
    }}>
      <h2>📚 Dashboard</h2>
      <nav>
        <Link to="/" style={{ color: "#8ab4ff", textDecoration: "none" }}>
          Home
        </Link>
      </nav>
    </div>
  );
}
