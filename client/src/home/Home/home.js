import React from 'react'
import Burger from '../Burger/burger'
import Search from '../Search/search'
import './home.css'

export default class Home extends React.Component {
  
    render (){
      return (
      <div>
         < Burger />
          <header className="header-back">
            <div>
            <h1 id="title">In Between</h1>
            </div>
          </header>
        <div id="main-back">
          <div className="home-search-div">
          < Search />
          < Search />
          <button type="submit" className="home-button">Let's Go</button>
          </div>
        </div>
      </div>
        
    
     )
  }
}
