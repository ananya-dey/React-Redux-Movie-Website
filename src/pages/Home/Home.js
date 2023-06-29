import React from "react";
import Slider from "../../components/Slider/Slider";
import MovieList from "../../components/MovieList/MovieList";
import GenreList from "../../components/GenreList/GenreList";
import Filter from "../../components/Filter/Filter";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home_section">
      <Slider />
      <h2 className="text-center">Movies</h2>
      <div className="container">
        <GenreList />
        <Filter />
        <MovieList />
      </div>
    </div>
  );
};

export default Home;
