import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import PropTypes from "prop-types";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={s.link}
          >
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
