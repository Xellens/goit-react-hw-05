import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzkxMDMzZTdlNGM4MmYyYTFmOTNmYmFhNmY3N2U4YyIsIm5iZiI6MTczODgxODE3MS42MDcsInN1YiI6IjY3YTQ0MjdiZWE0OWRlN2FjMDJmYzcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BdXxdgzWUWAngOF1k5uUqlBluo3H9nXrqyLWprv0ZOU";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState(currentQuery);

  useEffect(() => {
    if (!currentQuery.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const resp = await axios.get(
          "https://api.themoviedb.org/3/search/movie?language=en-US&include_adult=false",
          {
            params: { query: currentQuery },
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );

        setMovies(resp.data.results);
      } catch (err) {
        console.error("Error searching movies:", err);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentQuery]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setSearchParams({});
      setMovies([]);
      return;
    }

    setSearchParams({ query: inputValue });
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Search movies</h2>

      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={inputValue}
          onChange={handleChange}
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>

      {error && <p className={s.error}>{error}</p>}

      {loading && (
        <div className={s.loader}>
          <p>Loading...</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
