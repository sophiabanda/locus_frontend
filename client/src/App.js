import React from "react";
import "./App.css";
import Home from './home/Home/home';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

const HOST = "in-between-back-end.herokuapp.com", // TODO Deploy back and and code it here.
  PORT = 443 && 3000, //This will be 443
  SCHEME = "https",
  URL = `${SCHEME}://${HOST}:${PORT}`,
  [PING, AUTHENTICATE] = ["ping", "authenticate"].map(
    item => `${URL}/${item}`
  ),
  CREDENTIALS = { mobile: "5555555555", password: "asdfasdf" }, //These would come from a login form if there were one
  TOKEN = "TOKEN",
  WAIT = 500;

class App extends React.Component {
  state = {
    finished: false
  };
  componentDidMount() {
    function setToken() {
      axios
        .get(PING, {
          headers: { Authorization: sessionStorage.getItem(TOKEN) }
        })
        .then(({ data }) => {
          console.log("Token is valid.");
        })
        .catch(e => {
          //Probably not authorized so set a token
          axios
            .post(AUTHENTICATE, CREDENTIALS)
            .then(({ data }) => {
              console.log({ data });
              sessionStorage.setItem(TOKEN, data.auth_token);
            })
            .catch(e => {
              console.error(e.message);
            });
        });
    }
    let attempts = 0;
    const interval = setInterval(() => {
      const token = sessionStorage.getItem(TOKEN);
      console.log({ token });
      if (attempts === 5 || token != null) {
        this.setState({ finished: true });
        clearInterval(interval);
      } else {
        this.setState({ finished: false });
        setToken();
      }
      attempts += 1;
    }, WAIT);
  }
  loading() {
    return <h1>Loading.</h1>;
  }
  loaded() {
    return <h1>Loaded.</h1>;
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
 
        {this.state.finished ? this.loaded() : this.loading()}
      </>
    );
  }
}

export default App;
