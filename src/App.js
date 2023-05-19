import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import AllMovies from "./components/AllMovies";
import "../src/styles/App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NoNavbar from "./components/NoNavbar";
import NoTokenAccess from "./components/NoTokenAccess";
import Protected from "./components/Protected";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";
import MovieDetails from "./pages/posts/MovieDetails";

function App() {
  return (
    <>
      <div className="app">
        <Provider store={store}>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          >
            <BrowserRouter>
              <NoNavbar>
                <Navbar />
              </NoNavbar>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/details/:id"
                  element={
                    <Protected>
                      <MovieDetails />
                    </Protected>
                  }
                />
                <Route path="/search" element={<Search />} />
                <Route path="/all-movies" element={<AllMovies />} />
                <Route
                  path="/register"
                  element={
                    <NoTokenAccess>
                      <Register />
                    </NoTokenAccess>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <NoTokenAccess>
                      <Login />
                    </NoTokenAccess>
                  }
                />
              </Routes>
              <Footer />

              <ToastContainer theme="colored" />
            </BrowserRouter>
          </GoogleOAuthProvider>
        </Provider>
      </div>
    </>
  );
}

export default App;
