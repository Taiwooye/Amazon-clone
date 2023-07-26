import React, { useState } from "react";
import logo from "./images/logo.png";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignIn = (e) => {
    //e.preventDefualt();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    // e.preventDefualt();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img src={logo} alt="" className="login__logo" />
      </Link>

      <div className="login__container">
        <h1 className="login__h1">Sign-in</h1>

        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={(e) => SignIn()}
            className="login__siginButton"
          >
            Sign-in
          </button>
        </form>

        <p>
          By sigining-in you agree to AMAZON CLONE condition of use & sale.
          Please se our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="button"
           onClick={(e)=>register()} 
           className="login__registerButton">
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;
