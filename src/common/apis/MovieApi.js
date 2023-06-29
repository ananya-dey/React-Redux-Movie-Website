import axios from "axios";
import commonConstants from "../../common/apis/CommonConstants";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Accept: "application/json",
  },
  params: {
    api_key: commonConstants.API_KEY,
    language: commonConstants.DEFAULT_LANG,
  },
});
