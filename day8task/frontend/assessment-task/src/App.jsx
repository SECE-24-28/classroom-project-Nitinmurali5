import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  return (
    <div className="container">
      <h1>Movies Collection</h1>

      <div className="movie-grid">
        {movies.map((m) => (
          <div key={m.id} className="movie-card">
            <h3>{m.title}</h3>
            <p>Rating: {m.rating}</p>
            <img src={m.image} alt=""></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
