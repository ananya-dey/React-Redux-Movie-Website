import React, { useEffect } from "react";
import moment from "moment";
import "./MovieDetail.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import commonConstants from "../../common/apis/CommonConstants";
import RelatedMovies from "../../components/RelatedMovies/RelatedMovies";
import Slider from "react-slick";
import female from "../../images/avatar-female.jpg";
import male from "../../images/avatar-male.jpg";
import {
  fetchSingleMovieDetail,
  getSingleMovie,
  fetchMovieCastCrew,
  getMovieCastCrew,
  saveWatchedMovies,
} from "../../features/Movies/MovieSlice";
import {
  BiBookmark,
  BiSolidBookmark,
  BiSolidStar,
  BiLinkExternal,
  BiSolidRightArrowAlt,
} from "react-icons/bi";

const MovieDetail = () => {
  const movieId = useParams().movieId;
  const movieItem = useSelector(getSingleMovie);
  const movieCastCrew = useSelector(getMovieCastCrew);
  const dispatch = useDispatch();
  const {
    id,
    title,
    overview,
    poster_path,
    backdrop_path,
    genres,
    imdb_id,
    release_date,
    tagline,
    vote_average,
    production_countries,
    runtime,
  } = movieItem;

  const bg_img = {
    background: `url(${commonConstants.BG_IMG_780}${backdrop_path})`,
  };

  const runTime = moment
    .utc(moment.duration(runtime, "minutes").asMilliseconds())
    .format("h[h] mm[m]");

  const addWatchedMovies = () => dispatch(saveWatchedMovies(movieItem));
  const watchedMovies = useSelector((state) => state.movie.watchedMovies);
  const matchedItem = watchedMovies?.find((value) => value.id === id);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(fetchSingleMovieDetail(movieId));
  }, [dispatch, movieId]);

  useEffect(() => {
    dispatch(fetchMovieCastCrew(movieId));
  }, [dispatch, movieId]);

  return (
    <div className="movie_detail_section">
      <div className="container">
        <div className="movie_card">
          <div className="info_section">
            <div className="movie_header">
              <img
                className="movie_image"
                src={
                  poster_path
                    ? `${commonConstants.POSTER_IMG_342}${poster_path}`
                    : commonConstants.NOT_FOUND_IMG
                }
                alt="movie-poster"
              />
              <h1>
                {title} ({moment(release_date).format("YYYY")})
              </h1>
              <span>{moment(release_date).format("MM/DD/YYYY")}</span>
              <span className="seperator">•</span>
              {production_countries?.map((value, key) => (
                <span key={key}>{value.iso_3166_1},</span>
              ))}
              <span className="seperator">•</span>
              <span>{runTime}</span>
              <h4>{tagline}</h4>
              {vote_average ? (
                <span className="rating">
                  <BiSolidStar />
                  <span className="rating_text">
                    {Math.round(vote_average * 10) / 10}
                  </span>
                </span>
              ) : (
                ""
              )}
              {genres?.map((value) => (
                <span className="status" key={value.id}>
                  {value.name}
                </span>
              ))}
            </div>
            <div className="movie_desc">
              <p className="text">{overview}</p>
            </div>
            <div className="movie_social">
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
                    to={`https://www.imdb.com/title/${imdb_id}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="IMDB Site"
                    target="_blank"
                  >
                    <BiLinkExternal />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="blur_back_img" style={bg_img}></div>
        </div>
        <div className="top_cast_section">
          <h3>Top Cast</h3>
          <Slider {...settings}>
            {movieCastCrew?.cast?.map((value, key) => (
              <div className="top_cast_box" key={key}>
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
                <div className="top_cast_content">
                  <h5>{value.original_name}</h5>
                  <span>{value.character}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="all_cast_crew">
          <Link to={`/movies/${movieId}/fullcredits`}>
            All Cast & Crew <BiSolidRightArrowAlt />
          </Link>
        </div>
        <div className="related_movies">
          <RelatedMovies movieId={movieId} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
