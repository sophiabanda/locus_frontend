import React from 'react'
import Burger from '../Burger/burger'
import Search from '../Search/search'
import './home.css'

export default class Home extends React.Component {
  
    render (){
      return (
       <div >
          <header className="header-back">
            < Burger />
            <h1 id="title">In Between</h1>
          </header>
        <div id="main-back">
          < Search />
        </div>
        
        </div>
     )
  }
}
