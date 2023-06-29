import React from "react";
import "./WatchList.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useSelector } from "react-redux";

const WatchList = () => {
  const watchedMovies = useSelector((state) => state.movie.watchedMovies);

  return (
    <div className="watch_list_section">
      <div className="container">
        {watchedMovies.length > 0 ? (
          <div className="row">
            {watchedMovies.map((value) => (
              <MovieCard key={value.id} movieItem={value} />
            ))}
          </div>
        ) : (
          <div className="no_item">
            <p>There is no movie</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;
