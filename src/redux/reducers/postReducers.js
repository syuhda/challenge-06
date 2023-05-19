import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  posts: [],
  allMovies: [],
  movieDetails: {},
  genre: [],
  backdropPath: "",
  searchResults: [],
};

// Define the reducers
const postSlicer = createSlice({
  name: "post",
  initialState,
  reducers: {
    setNowPlayingMovies: (state, action) => {
      state.posts = action.payload;
    },
    setPopularMovies: (state, action) => {
      state.posts = action.payload;
    },
    setAllMovies: (state, action) => {
      state.allMovies = action.payload;
    },
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setBackdropPath: (state, action) => {
      state.backdropPath = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

// Export the actions (to set/change the state) => buat ngeset
export const {
  setNowPlayingMovies,
  setPopularMovies,
  setAllMovies,
  setMovieDetails,
  setGenre,
  setBackdropPath,
  setSearchResults,
} = postSlicer.actions;

// Export the reducers (state / store) => buat ngakses
export default postSlicer.reducer;
