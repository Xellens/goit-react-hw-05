import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieReviews.module.css";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzkxMDMzZTdlNGM4MmYyYTFmOTNmYmFhNmY3N2U4YyIsIm5iZiI6MTczODgxODE3MS42MDcsInN1YiI6IjY3YTQ0MjdiZWE0OWRlN2FjMDJmYzcxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BdXxdgzWUWAngOF1k5uUqlBluo3H9nXrqyLWprv0ZOU";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const resp = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        setReviews(resp.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (!reviews || reviews.length === 0) {
    return <p>No reviews found</p>;
  }

  return (
    <ul className={s.list}>
      {reviews.map((r) => (
        <li key={r.id} className={s.item}>
          <h4>Author: {r.author}</h4>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;
