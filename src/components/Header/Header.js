import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useSelector } from "react-redux";

const Header = () => {
  const watchedMoviesLength = useSelector(
    (state) => state.movie.watchedMovies.length
  );

  return (
    <div className="header_section">
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            MovieApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link position-relative" to="/watchList">
                  Watch List
                  {watchedMoviesLength ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {watchedMoviesLength}
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">
                  Movie List
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
