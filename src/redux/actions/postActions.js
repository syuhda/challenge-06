import axios from "axios";
import {
  setNowPlayingMovies,
  setPopularMovies,
  setAllMovies,
  setMovieDetails,
  setGenre,
  setBackdropPath,
  setSearchResults,
} from "../reducers/postReducers";
import { toast } from "react-toastify";

//  Function to get Now Playing Movies
export const getNowPlayingMovies = () => async (dispatch) => {
  //sebenernya return tapi bisa disingkat bgini
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=dca3f16902da77f476fae29bef18cfb2`
    );
    dispatch(setNowPlayingMovies(response.data.results)); //here the difference!!
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

//  Function to get Popular Movies
export const getPopularMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=dca3f16902da77f476fae29bef18cfb2`
    );
    dispatch(setPopularMovies(response.data.results)); //here the difference!!
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

//  Function to get All Movies
export const getAllMovies = () => async (dispatch) => {
  try {
    const response = await axios.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=dca3f16902da77f476fae29bef18cfb2&include_adult=false&page=1`
    );
    dispatch(setAllMovies(response.data.results)); //here the difference!!
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

// Function to get the details of a post
export const getMovieDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=dca3f16902da77f476fae29bef18cfb2`
    );

    dispatch(setMovieDetails(response.data)); //here the difference!!
    dispatch(setGenre(response.data.genres));
    dispatch(
      setBackdropPath(
        `https://image.tmdb.org/t/p/original/${response.data.backdrop_path}`
      )
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

//  Function to get Search Results
export const getSearchResults = (query) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=dca3f16902da77f476fae29bef18cfb2&query=${query}&include_adult=false`
    );
    dispatch(setSearchResults(response.data.results)); //here the difference!!
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};
