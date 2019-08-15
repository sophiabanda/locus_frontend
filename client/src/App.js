import React from "react";
import "./App.css";
import Home from './home/Home/home';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

const HOST = "localhost", // TODO Calculate host.
  URL = `http://${HOST}:3000`,
  [PING, AUTHENTICATE] = ["ping", "authenticate"].map(item => `${URL}/${item}`),
  CREDENTIALS = { mobile: "5555555555", password: "asdfasdf" };

class App extends React.Component {
  componentDidMount() {
    function setToken() {
      axios
        .get(PING, { headers: { Authorization: window.TOKEN } })
        .then(({ data }) => {
          console.log("Token is valid.");
        })
        .catch(e => {
          //Probably not authorized so set a token
          axios
            .post(AUTHENTICATE, CREDENTIALS)
            .then(({ data }) => {
              console.log({ data });
              window.TOKEN = data.auth_token;
            })
            .catch(e => {
              console.error(e.message);
            });
        });
    }
    let attempts = 0;
    const WAIT = 500;
    const interval = setInterval(() => {
      console.log({ interval: window.TOKEN != null });
      if (attempts === 5 || window.TOKEN != null) {
        clearInterval(interval);
      } else {
        setToken();
      }
      attempts += 1;
    }, WAIT);
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
