import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/MovieApi";

const watchedMovies =
  localStorage.getItem("WatchedMovieList") !== null
    ? JSON.parse(localStorage.getItem("WatchedMovieList"))
    : [];

export const fetchNowPlayingMovies = createAsyncThunk(
  "movie/fetchNowPlayingMovies",
  async (page_no) => {
    const response = await movieApi.get(`movie/now_playing?page=${page_no}`);
    if (response.status === 200) return response.data;
  }
);

export const fetchAllGenres = createAsyncThunk(
  "movie/fetchAllGenres",
  async () => {
    const response = await movieApi.get("genre/movie/list?page=1");
    if (response.status === 200) return response.data?.genres;
  }
);

export const fetchAllMovies = createAsyncThunk(
  "movie/fetchAllMovies",
  async (data) => {
    const response = await movieApi.get(
      `discover/movie?page=${data.page_no}&release_date.gte=${data.from_date}&release_date.lte=${data.to_date}&sort_by=popularity.desc`
    );
    if (response.status === 200) return response.data;
  }
);

export const fetchGenreBasedMovies = createAsyncThunk(
  "movie/fetchAllMovies",
  async (value) => {
    const response = await movieApi.get(
      `discover/movie?page=${value.page_no}&with_genres=${value.genre_id}`
    );
    if (response.status === 200) return response.data;
  }
);

export const fetchSingleMovieDetail = createAsyncThunk(
  "movie/fetchSingleMovieDetail",
  async (movieId) => {
    const response = await movieApi.get(`movie/${movieId}`);
    if (response.status === 200) return response.data;
  }
);

export const fetchMovieCastCrew = createAsyncThunk(
  "movie/fetchMovieCastCrew",
  async (movieId) => {
    const response = await movieApi.get(`movie/${movieId}/credits`);
    if (response.status === 200) return response.data;
  }
);

export const fetchAllRelatedMovies = createAsyncThunk(
  "movie/fetchAllRelatedMovies",
  async (movieId) => {
    const response = await movieApi.get(`movie/${movieId}/similar`);
    if (response.status === 200) return response.data;
  }
);

const initialState = {
  genres: {},
  movies: {},
  currentPage: 1,
  singleMovie: {},
  relatedMovies: {},
  nowPlayingMovies: {},
  watchedMovies: watchedMovies,
  movieCastCrew: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    saveWatchedMovies: (state, { payload }) => {
      const existingItem = state.watchedMovies.find(
        (item) => item.id === payload.id
      );

      if (existingItem) {
        state.watchedMovies = state.watchedMovies.filter(
          (item) => item.id !== payload.id
        );
      } else {
        state.watchedMovies = [...state.watchedMovies, payload];
      }
      localStorage.setItem(
        "WatchedMovieList",
        JSON.stringify(state.watchedMovies)
      );
    },
    incCurrentPage: (state, { payload }) => {
      state.currentPage = payload + 1;
    },
  },
  extraReducers: {
    [fetchNowPlayingMovies.fulfilled]: (state, { payload }) => {
      return { ...state, nowPlayingMovies: payload };
    },
    [fetchAllGenres.fulfilled]: (state, { payload }) => {
      return { ...state, genres: payload };
    },
    [fetchAllMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload };
    },
    [fetchSingleMovieDetail.fulfilled]: (state, { payload }) => {
      return { ...state, singleMovie: payload };
    },
    [fetchMovieCastCrew.fulfilled]: (state, { payload }) => {
      return { ...state, movieCastCrew: payload };
    },
    [fetchAllRelatedMovies.fulfilled]: (state, { payload }) => {
      return { ...state, relatedMovies: payload };
    },
  },
});

export const { saveWatchedMovies, incCurrentPage } = movieSlice.actions;
export const getNowPlayingMovies = (state) => state.movie.nowPlayingMovies;
export const getAllGenres = (state) => state.movie.genres;
export const getAllMovies = (state) => state.movie.movies;
export const getCurrentPage = (state) => state.movie.currentPage;
export const getSingleMovie = (state) => state.movie.singleMovie;
export const getMovieCastCrew = (state) => state.movie.movieCastCrew;
export const getRelatedMovies = (state) => state.movie.relatedMovies;
export default movieSlice.reducer;
