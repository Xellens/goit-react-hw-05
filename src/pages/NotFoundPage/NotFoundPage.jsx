import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={s.container}>
      <h2>404 - Page not found</h2>
      <Link to="/" className={s.link}>
        Go to home
      </Link>
    </div>
  );
}

export default NotFoundPage;
