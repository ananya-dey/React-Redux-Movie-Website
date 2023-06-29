import React, { useEffect, useState } from "react";
import "./MovieList.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllMovies,
  getAllMovies,
  getCurrentPage,
  incCurrentPage,
} from "../../features/Movies/MovieSlice";
import commonConstants from "../../common/apis/CommonConstants";
import moment from "moment";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);
  // const [page, setPage] = useState(1);
  const [card, setCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const MONTH2_BEFORE_CURRENT_DATE = moment(commonConstants.CURRENT_DATE)
    .subtract(2, "months")
    .format("YYYY-MM-DD");
  const cPage = useSelector(getCurrentPage);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        // setPage((prev) => prev + 1);
        dispatch(incCurrentPage(cPage));
      }
    } catch (Error) {
      console.log(Error);
    }
  };

  useEffect(() => {
    const dateData = {
      page_no: cPage,
      from_date: MONTH2_BEFORE_CURRENT_DATE,
      to_date: commonConstants.CURRENT_DATE,
    };
    dispatch(fetchAllMovies(dateData));
  }, [dispatch, cPage, MONTH2_BEFORE_CURRENT_DATE]);

  useEffect(() => {
    if (movies && movies.results) {
      let result = [];
      Object.values(movies.results)?.map((value) => result.push(value));
      if (movies.page === 1) {
        setCard(result);
      } else {
        setCard((prev) => [...prev, ...result]);
      }
      setLoading(false);
    }
  }, [movies]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  });

  return (
    <div className="movie_list_section">
      <div className="container">
      {card.length > 0 ? (
          <div className="row">
            {card.map((value, key) => (
              <MovieCard key={key} movieItem={value} />
            ))}
          </div>
        ) : (
          <div className="no_item">
            <p>There is no movie</p>
          </div>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default MovieList;
