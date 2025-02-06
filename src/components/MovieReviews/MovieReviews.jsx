import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieReviews.module.css";

const API_TOKEN = "3c91033e7e4c82f2a1f93fbaa6f77e8c";

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
