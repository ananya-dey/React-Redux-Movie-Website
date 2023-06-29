import React, { useEffect } from "react";
import "./CastCrew.scss";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {
  getMovieCastCrew,
  fetchMovieCastCrew,
  getSingleMovie,
  fetchSingleMovieDetail,
} from "../../features/Movies/MovieSlice";
import commonConstants from "../../common/apis/CommonConstants";
import female from "../../images/avatar-female.jpg";
import male from "../../images/avatar-male.jpg";
import { BiSolidLeftArrowAlt } from "react-icons/bi";

const CastCrew = () => {
  const movieId = useParams().movieId;
  const dispatch = useDispatch();
  const movieItem = useSelector(getSingleMovie);
  const movieCastCrew = useSelector(getMovieCastCrew);
  
  useEffect(() => {
    dispatch(fetchSingleMovieDetail(movieId));
  }, [dispatch, movieId]);
  
  useEffect(() => {
    dispatch(fetchMovieCastCrew(movieId));
  }, [dispatch, movieId]);

  return (
    <div className="all_cast_crew_section">
      <div className="movie_content_section">
        <div className="container">
          <div className="cast_crew_item">
            <img
              src={
                movieItem.poster_path
                  ? `${commonConstants.PROFILE_IMG_185}${movieItem.poster_path}`
                  : commonConstants.NOT_FOUND_IMG
              }
              className="img_responsive"
              alt="profile"
            />
            <div className="cast_crew_item_content">
              <h1>
                {movieItem.title} (
                {moment(movieItem.release_date).format("YYYY")})
              </h1>
              <Link
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Back to main"
                to={`/movies/${movieId}`}
              >
                <BiSolidLeftArrowAlt />
                Back to main
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row cast_crew_section">
          <div className="col-md-6">
            <h3>Cast</h3>
            {movieCastCrew?.cast?.map((value, key) => (
              <div className="cast_crew_item" key={key}>
                <img
                  src={
                    value.profile_path
                      ? `${commonConstants.PROFILE_IMG_185}${value.profile_path}`
                      : value.gender === 0
                      ? male
                      : female
                  }
                  className="img_responsive"
                  alt="profile"
                />
                <div className="cast_crew_item_content">
                  <h4>{value.original_name}</h4>
                  <p>{value.character}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-6">
            <h3>Crew</h3>
            {movieCastCrew?.crew?.map((value, key) => (
              <div className="cast_crew_item" key={key}>
                <img
                  src={
                    value.profile_path
                      ? `${commonConstants.PROFILE_IMG_185}${value.profile_path}`
                      : value.gender === 0
                      ? male
                      : female
                  }
                  className="img_responsive"
                  alt="profile"
                />
                <div className="cast_crew_item_content">
                  <h4>{value.original_name}</h4>
                  <p>{value.character}</p>
                </div>
                <div>
                  <h4>Department: {value.department}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastCrew;
