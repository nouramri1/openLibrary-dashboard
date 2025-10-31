import { useEffect, useMemo, useState } from "react";
import "./App.css";

const DEFAULT_SUBJECT = "fantasy";

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://openlibrary.org/subjects/${subject}.json?limit=100`
        );
        const data = await res.json();
        setBooks(Array.isArray(data.works) ? data.works : []);
      } catch (err) {
        console.error("Failed to fetch books", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [subject]);

  const filteredBooks = useMemo(() => {
    return books
      .filter((b) =>
        (b.title || "")
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      )
      .filter((b) =>
        yearMin ? (b.first_publish_year || 0) >= Number(yearMin) : true
      );
  }, [books, search, yearMin]);

  // Summary stats
  const stats = useMemo(() => {
    const years = books.map((b) => b.first_publish_year).filter(Boolean);
    const total = books.length;
    const earliest = years.length ? Math.min(...years) : "—";
    const latest = years.length ? Math.max(...years) : "—";
    const average = years.length
      ? Math.round(years.reduce((a, c) => a + c, 0) / years.length)
      : "—";

    // Compute top author 
    const authorCounts = {};
    books.forEach((b) => {
      (b.authors || []).forEach((a) => {
        if (!a?.name) return;
        authorCounts[a.name] = (authorCounts[a.name] || 0) + 1;
      });
    });

    let topAuthor = "—";
    let maxCount = 0;
    for (const [name, count] of Object.entries(authorCounts)) {
      if (count > maxCount) {
        topAuthor = name;
        maxCount = count;
      }
    }

    return { total, earliest, latest, average, topAuthor };
  }, [books]);

  return (
    <div className="container">
      <Header />

      <Stats {...stats} subject={subject} />

      <Controls
        search={search}
        setSearch={setSearch}
        yearMin={yearMin}
        setYearMin={setYearMin}
        subject={subject}
        setSubject={setSubject}
      />

      {loading ? (
        <p style={{ marginTop: "20px" }}>Loading books…</p>
      ) : (
        <BookList items={filteredBooks} />
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>your favorite library Dashboard</h1>
      <p>Grab a cup of tea and search & explore books by subject and publish trends.</p>
    </div>
  );
}

function Stats({ subject, total, earliest, latest, average, topAuthor }) {
  return (
    <div className="stats-grid">
      <StatCard label="Subject" value={subject} />
      <StatCard label="Total Books" value={total} />
      <StatCard label="Earliest Year" value={earliest} />
      <StatCard label="Latest Year" value={latest} />
      <StatCard label="Average Year" value={average} />
      <StatCard label="Top Author" value={topAuthor} />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function Controls({ search, setSearch, yearMin, setYearMin, subject, setSubject }) {
  return (
    <div className="controls">
      <input
        className="input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search title…"
      />

      <select
        className="select"
        value={yearMin}
        onChange={(e) => setYearMin(e.target.value)}
      >
        <option value="">All Years</option>
        <option value="1950">1950+</option>
        <option value="1980">1980+</option>
        <option value="2000">2000+</option>
        <option value="2010">2010+</option>
      </select>

      <select
        className="select"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="fantasy">fantasy</option>
        <option value="romance">romance</option>
        <option value="mystery">mystery</option>
        <option value="science">science</option>
        <option value="history">history</option>
      </select>
    </div>
  );
}

function BookList({ items }) {
  if (!items.length) {
    return <p>No books found.</p>;
  }

  return (
    <div className="book-container">
      <div className="book-grid">
        {items.map((b) => (
          <BookCard key={b.key} book={b} />
        ))}
      </div>

      <div className="results-count">
        Showing {items.length} result{items.length > 1 ? "s" : ""}
      </div>
    </div>
  );
}

function BookCard({ book }) {
  const author = book.authors?.[0]?.name || "Unknown";
  const year = book.first_publish_year || "—";
  const coverId = book.cover_id;

  return (
    <div className="book-card">
      <div className="book-cover">
        {coverId ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`}
            alt={book.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : null}
      </div>

      <div>
        <div className="book-title">{book.title}</div>
        <div className="book-meta">{author}</div>
        <div className="book-meta" style={{ fontSize: "13px" }}>
          First publish: {year}
        </div>

        <a
          className="book-link"
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
        >
          View →
        </a>
      </div>
    </div>
  );
}
