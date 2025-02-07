import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import s from "./MovieDetailsPage.module.css";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzkxMDMzZTdlNGM4MmYyYTFmOTNmYmFhNmY3N2U4YyIsIm5iZiI6MTczODgxODE3MS42MDcsInN1YiI6IjY3YTQ0MjdiZWE0OWRlN2FjMDJmYzcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BdXxdgzWUWAngOF1k5uUqlBluo3H9nXrqyLWprv0ZOU";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const backLink = location.state?.from ?? "/movies";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const resp = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        setMovie(resp.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  const { title, poster_path, overview, genres } = movie;

  const handleGoBack = () => navigate(backLink);

  return (
    <div className={s.container}>
      <button onClick={handleGoBack} className={s.goBackBtn}>
        Go back
      </button>

      <div className={s.details}>
        {poster_path && (
          <img
            src={`${IMG_BASE_URL}${poster_path}`}
            alt={title}
            className={s.poster}
          />
        )}

        <div>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            Genres: {genres && genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>

      <div className={s.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" className={s.link} state={{ from: backLink }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={s.link} state={{ from: backLink }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
