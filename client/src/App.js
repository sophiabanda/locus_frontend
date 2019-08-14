import React from 'react'
import './App.css'
import Home from './home/Home/home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
