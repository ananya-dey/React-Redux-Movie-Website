import React, { useEffect } from "react";
import "./Slider.scss";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector,useDispatch } from "react-redux";
import {
  fetchNowPlayingMovies,
  getNowPlayingMovies,
} from "../../features/Movies/MovieSlice";
import commonConstants from "../../common/apis/CommonConstants";

const Slider = () => {
  const dispatch = useDispatch();
  const playingMovies = useSelector(getNowPlayingMovies);

  useEffect(() => {
    dispatch(fetchNowPlayingMovies(1));
  }, [dispatch]);

  return (
    <div className="slider_section">
      <Carousel
        showArrows
        showThumbs={false}
        showStatus={false}
        autoPlay
        axis="horizontal"
        transitionTime="3000"
        infiniteLoop
        centerMode
      >
        {playingMovies?.results?.map((value) => (
          <div key={value.id}>
            <img
              src={
                value.backdrop_path
                  ? `${commonConstants.BG_IMG_780}${value.backdrop_path}`
                  : commonConstants.NOT_FOUND_IMG
              }
              loading="lazy"
              className="img_responsive"
              alt={value.title}
            />
            <div className="carousel-caption">
              <h3>
                <Link to={`/movies/${value.id}`}>{value.title}</Link>
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
