import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerLoginWithGoogle } from "../redux/actions/authActions";

function GoogleLogin({ buttonText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(registerLoginWithGoogle(responseGoogle.access_token, navigate)),
  });

  return (
    <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
      <button className="google-btn" onClick={() => loginWithGoogle()}>
        <FcGoogle /> {buttonText}
      </button>
    </IconContext.Provider>
  );
}

export default GoogleLogin;
