import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzkxMDMzZTdlNGM4MmYyYTFmOTNmYmFhNmY3N2U4YyIsIm5iZiI6MTczODgxODE3MS42MDcsInN1YiI6IjY3YTQ0MjdiZWE0OWRlN2FjMDJmYzcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BdXxdgzWUWAngOF1k5uUqlBluo3H9nXrqyLWprv0ZOU";

function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const resp = await axios.get(
        "https://api.themoviedb.org/3/search/movie?language=en-US&include_adult=false",
        {
          params: {
            query,
          },
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      setMovies(resp.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className={s.container}>
      <h2>Search movies</h2>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={handleChange}
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
