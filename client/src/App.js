import React from 'react'
import './App.css'
import Burger from './home/burger/burger'
import Map from './Map/Map.component.jsx'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import dotenv from 'dotenv'


class App extends React.Component {
  componentDidMount(){
    dotenv.config()
  }
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Map}/>
          <Route exact path="/" component={Burger}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
