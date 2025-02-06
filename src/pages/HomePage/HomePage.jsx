import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

const API_TOKEN = "3c91033e7e4c82f2a1f93fbaa6f77e8c";

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
