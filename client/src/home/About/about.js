import React from "react";
import Burger from "../Burger/burger";
import './about.css'

export default class About extends React.Component {
  render() {
    return (
      <React.Fragment> 
      <div className="baby-got-back">    
      <div><Burger /></div>
      <div className="info">
        <h2>Why In Between?</h2>
        <p>In Between was born of a desire for friends to spend more quality time together, 
          regardless of the distance they may find between them. In Between makes it easy for  
          you to explore new restaurants, yoga studios, museums, or anything you'd like to 
          experience that exists outside of your neighborhood or usual hang out spots.</p>
      </div>
      <br></br>
      <footer className="footer">
        <h2>Contact</h2>
        <h5><a href="https://www.linkedin.com/in/christopher-menendez-67b7b015b/">Chris Menendez</a></h5>
        <h5><a href="https://www.linkedin.com/in/mixolidia/">Mixolidia Gautreux</a></h5>
        <h5><a href="https://www.linkedin.com/in/sophia-banda-71629821/">Sophia Banda</a></h5>
        <h5><a href="https://www.linkedin.com/in/tushar-poojara-b61b92138/">Tushar Poojara</a></h5>
      </footer>
      </div>
      </React.Fragment>
    );
  }
}
