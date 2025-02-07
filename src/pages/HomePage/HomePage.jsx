import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzkxMDMzZTdlNGM4MmYyYTFmOTNmYmFhNmY3N2U4YyIsIm5iZiI6MTczODgxODE3MS42MDcsInN1YiI6IjY3YTQ0MjdiZWE0OWRlN2FjMDJmYzcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BdXxdgzWUWAngOF1k5uUqlBluo3H9nXrqyLWprv0ZOU";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div className={s.container}>
      <h2>Trending Today</h2>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
