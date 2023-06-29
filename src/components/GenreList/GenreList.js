import React, { useEffect, useState } from "react";
import {
  fetchAllGenres,
  getAllGenres,
  fetchGenreBasedMovies,
  // getCurrentPage
} from "../../features/Movies/MovieSlice";
import { useDispatch,useSelector } from "react-redux";
import "./GenreList.scss";

const GenreList = () => {
  const [edit, setEdit] = useState({
    genre_id: "",
  });
  const dispatch = useDispatch();
  const genres = Object.values(useSelector(getAllGenres));
  // const cPage = useSelector(getCurrentPage);
  const getGenreBasedMovie = (genre_id) => {
    setEdit({
      genre_id: genre_id,
    });
    const data = {
      genre_id: genre_id,
      page_no: 1
    }

    dispatch(fetchGenreBasedMovies(data));
  };

  useEffect(() => {
    dispatch(fetchAllGenres());
  }, [dispatch]);

  return (
    <div className="genre_list_section">
      {genres?.map((value) => (
        <button
          type="button"
          className={
            "genre_button btn " +
            (edit.genre_id === value.id ? "btn-info" : "btn-outline-info")
          }
          key={value.id}
          onClick={() => getGenreBasedMovie(value.id)}
        >
          {value.name}
        </button>
      ))}
    </div>
  );
};

export default GenreList;
