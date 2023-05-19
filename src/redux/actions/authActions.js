import { setIsLoggedIn, setToken, setUser } from "../reducers/authReducers";
import axios from "axios";
import { toast } from "react-toastify";

// for GoogleLogin
export const registerLoginWithGoogle =
  (accessToken, navigate) => async (dispatch) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true));
      dispatch(getMe(null, null, null));
      //   localStorage.setItem("token", token); // in authReducer

      // We will use navigate from react-router-dom by passing the argument because the useNavigate() can only used in component
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

export const logout = (navigate) => (dispatch) => {
  try {
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(null));

    if (navigate) navigate("/");
  } catch (error) {
    toast.error(error?.message);
  }
};

// for NoTokenAccess and Protected
export const getMe =
  (navigate, navigatePath, navigatePathError) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth; // getState cuma bisa dipake di action, selain itu harus pake useSlector

      // console.log(token);

      if (!token) return;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;

      dispatch(setUser(data));

      // if navigatePath params is false/null/undefined, it will not executed
      if (navigatePath) navigate(navigatePath);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If not valid token
        if (error.response.status === 401) {
          dispatch(logout(null));

          // if navigatePathError params is false/null/undefined, it will not executed
          if (navigatePathError) navigate(navigatePathError);
          return;
        }

        toast.error(error.response.data.message);
        return;
      }

      toast.error(error.message);
    }
  };

export const login = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/v1/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(getMe(null, null, null));

    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const register = (data, navigate) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/v1/auth/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    const { token } = response.data.data;

    dispatch(setToken(token));
    dispatch(setIsLoggedIn(true));
    dispatch(getMe(null, null, null));

    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};
