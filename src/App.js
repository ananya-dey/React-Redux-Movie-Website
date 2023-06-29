import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import MovieList from "./components/MovieList/MovieList";
import WatchList from "./pages/WatchList/WatchList";
import CastCrew from "./pages/CastCrew/CastCrew";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="movies/:movieId" element={<MovieDetail />} />
          <Route path="movies/:movieId/fullcredits" element={<CastCrew />} />
          <Route path="watchList" element={<WatchList />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
