import React from 'react'
import Burger from '../Burger/burger'
import Search from '../Search/search'
import APICall from '../../utility/APIcall'
import './home.css'

export default class Home extends React.Component {

  buttonHandler = event => {
    const address1 = document.querySelector(".address1").value
    const city1 = document.querySelector(".city1").value
    const address2 = document.querySelector(".address2").value
    const city2 = document.querySelector(".city2").value
    APICall(address1, address2, city1, city2)
    console.log(address1, city1, address2, city2)

  }
 
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
          <button onClick={this.buttonHandler} className="home-button">Let's Go</button>
          </div>
        </div>
      </div>
        
    
     )
  }
}
