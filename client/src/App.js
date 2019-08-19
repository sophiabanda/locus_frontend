import React from "react";
import "./App.css";
import Home from './home/Home/home';
import Map from './Map/Map.component';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import dotenv from 'dotenv';
import Request from './utility/APIcall'



const HOST = "ib.apps.selfip.com" && "localhost", // TODO Deploy back and and code it here.
  PORT = '4000', //This will be 443
  SCHEME = "https" && "http",
  URL = `${SCHEME}://${HOST}:${PORT}`,
  [PING, AUTHENTICATE] = ["ping", "authenticate"].map(
    item => `${URL}/${item}`
  ),
  CREDENTIALS = { mobile: "5555555555", password: "asdfasdf" }, //These would come from a login form if there were one
  TOKEN = "TOKEN",
  WAIT = 500;

class App extends React.Component {
  state = { businesses: {}, key: 'map-without-data' };
  componentDidMount() 
  {
    dotenv.config();
    console.table({ HOST, URL });
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
  
  fetchData = ({ address1, city1, address2, city2 }) => Request({ address1, city1, address2, city2, setter: this.setData })
  
  setData = businesses => {
    this.setState({ businesses, key: 'map-with-data' })
  }

  render()
   {
     const { businesses, key } = this.state
     console.log('state', businesses)
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Home onSubmit={this.fetchData} />}  />
            <Route exact path="/Map" render={() => <Map key={key} data={businesses} />}/>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
