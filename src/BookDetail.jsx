import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css"; 

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <p className="loading">Loading details...</p>;
  if (!book) return <p className="error">No details found.</p>;

  const coverId = book.covers ? book.covers[0] : null;

  return (
    <div className="container">
      <div className="sidebar">
        <Link to="/" className="sidebar-link">← Back to Dashboard</Link>
      </div>

      <div className="detail-content">
        <h2>{book.title}</h2>

        {coverId && (
          <img
            src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
            alt={book.title}
            className="detail-cover"
          />
        )}

        <div className="detail-info">
          <p>
            <strong>Description: </strong>
            {typeof book.description === "string"
              ? book.description
              : book.description?.value || "No description available."}
          </p>

          <p>
            <strong>First Published:</strong> {book.first_publish_date || "Unknown"}
          </p>

          <p>
            <strong>Subjects:</strong>{" "}
            {(book.subjects || []).length > 0
              ? book.subjects.join(", ")
              : "No subjects listed."}
          </p>

          <p>
            <strong>Number of Editions:</strong> {book.covers?.length || "Unknown"}
          </p>

          <p>
            <strong>Key:</strong> {book.key}
          </p>
        </div>
      </div>
    </div>
  );
}
