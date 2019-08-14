import React from 'react'
import './App.css'
import Burger from './home/burger/burger'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Burger}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
