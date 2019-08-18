import React from "react";
import Burger from "../Burger/burger";
import './about.css'

export default class About extends React.Component {
  render() {
    return (
      <React.Fragment>
      <div className="baby-got-back" img src>
      <div><Burger /></div>
      <div className="why">
        <h2>Why In Between?</h2>
      </div>  
      <div className="info">
        <p>In Between was born of a desire for friends to spend more quality time together, 
          regardless of the distance they may find between them. In Between makes it easy for  
          you to explore new restaurants, yoga studios, museums, or anything you'd like to 
          experience that exists outside of your neighborhood.</p>
      </div>
      <div className="ch2">
        <h2>Contact</h2>
      </div>
      </div>
        </React.Fragment>
    );
  }
}
