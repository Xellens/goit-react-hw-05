import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieCast.module.css";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzkxMDMzZTdlNGM4MmYyYTFmOTNmYmFhNmY3N2U4YyIsIm5iZiI6MTczODgxODE3MS42MDcsInN1YiI6IjY3YTQ0MjdiZWE0OWRlN2FjMDJmYzcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BdXxdgzWUWAngOF1k5uUqlBluo3H9nXrqyLWprv0ZOU";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w200";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const resp = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        setCast(resp.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };
    fetchCast();
  }, [movieId]);

  if (!cast || cast.length === 0) {
    return <p>No cast info</p>;
  }

  return (
    <ul className={s.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={s.item}>
          {actor.profile_path && (
            <img
              src={`${IMG_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
              className={s.photo}
            />
          )}
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
