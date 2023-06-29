import React, { useEffect } from "react";
import "./RelatedMovies.scss";
import { useDispatch,useSelector } from "react-redux";
import {
  fetchAllRelatedMovies,
  getRelatedMovies,
} from "../../features/Movies/MovieSlice";
import MovieCard from "../../components/MovieCard/MovieCard";

const RelatedMovies = (props) => {
  const dispatch = useDispatch();
  const relatedMovies = useSelector(getRelatedMovies);
  
  useEffect(() => {
    dispatch(fetchAllRelatedMovies(props.movieId));
  }, [dispatch, props.movieId]);

  return (
    <div className="realted_movie_section">
      <h3>Related Movies</h3>
        {relatedMovies?.results?.length > 0 ? (
          <div className="row">
            {relatedMovies?.results?.map((value, key) => (
              key < 4 ? <MovieCard key={value.id} movieItem={value} /> : []
            ))}
          </div>
        ) : (
          <div className="no_item">
            <p>There is no movie</p>
          </div>
        )}
    </div>
  );
};

export default RelatedMovies;
