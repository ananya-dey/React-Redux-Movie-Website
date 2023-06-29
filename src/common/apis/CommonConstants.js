import moment from "moment";

const commonConstants = {
  API_KEY: "12096bea99fd5e0d344aeb79aeb08fad",
  BASE_URL: "https://api.themoviedb.org/3/",
  TMDB_TOKEN:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjA5NmJlYTk5ZmQ1ZTBkMzQ0YWViNzlhZWIwOGZhZCIsInN1YiI6IjY0OTRjOTk2OTdlYWI0MDBjYWU5NjQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ehxItrcrgSizWOtqftQI-0ra1saa-i7tA2TwFwSqEOE",
  POSTER_IMG_342: "https://image.tmdb.org/t/p/w342",
  PROFILE_IMG_185: "https://image.tmdb.org/t/p/w185",
  BG_IMG_780: "https://image.tmdb.org/t/p/w780",
  NOT_FOUND_IMG: "https://www.movienewz.com/img/films/poster-holder.jpg",
  DEFAULT_LANG: "en-US",
  CURRENT_DATE: moment().format("YYYY-MM-DD"),
};

export default commonConstants;
