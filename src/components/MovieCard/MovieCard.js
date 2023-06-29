import React from "react";
import moment from "moment";
import "./MovieCard.scss";
import { Link } from "react-router-dom";
import commonConstants from "../../common/apis/CommonConstants";
import { BiInfoCircle, BiBookmark, BiSolidBookmark } from "react-icons/bi";
import { saveWatchedMovies } from "../../features/Movies/MovieSlice";
import { useDispatch, useSelector } from "react-redux";

const MovieCard = (props) => {
  const dispatch = useDispatch();
  const { title, poster_path, id, release_date } = props.movieItem;
  const addWatchedMovies = () => dispatch(saveWatchedMovies(props.movieItem));
  const watchedMovies = useSelector((state) => state.movie.watchedMovies);
  const matchedItem = watchedMovies?.find(
    (value) => value.id === props.movieItem.id
  );

  return (
    <div className="movie_card_section col-md-3 py-3">
      <div className="movie_card_box">
        <img
          src={
            poster_path
              ? `${commonConstants.POSTER_IMG_342}${poster_path}`
              : commonConstants.NOT_FOUND_IMG
          }
          loading="lazy"
          className="img_responsive"
          alt="movie-card"
        />
        <div className="movie_card_detail">
          <p className="movie_card_title">
            {title?.length > 35 ? title.substring(0, 35) + " ..." : title}
          </p>
          <p className="movie_card_info">
            {moment(release_date).format("MMMM Do, YYYY")}
          </p>
        </div>
        <div className="movie_card_overlay"></div>
        <div className="movie_card_link">
          <ul>
            <li>
              <Link onClick={addWatchedMovies}>
                {id === matchedItem?.id ? (
                  <BiSolidBookmark
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Already Added"
                  />
                ) : (
                  <BiBookmark
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add to Watchlist"
                  />
                )}
              </Link>
            </li>
            <li>
              <Link
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Click for Details"
                to={`/movies/${id}`}
              >
                <BiInfoCircle />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
