import React from 'react'
import { withRouter } from 'react-router-dom'
import Burger from '../Burger/burger'
import Search from '../Search/search'
// import APICall from '../../utility/APIcall'
import './home.css'

class Home extends React.Component {
  state = { address1: '', city1: '', address2: '', city2: '' }

  handleInputChange = field => event => this.setState({ [field]: event.target.value })

  buttonHandler = () => {
    const { onSubmit, history } = this.props
    onSubmit(this.state)
    history.push('/map')
  }
 
    render (){
      console.log('home props', this.props)
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
          <Search handleChange={this.handleInputChange} state={this.state} />
          <button onClick={this.buttonHandler} className="home-button">Let's Go</button>
          </div>
        </div>
      </div>
        
    
     )
  }
}

export default withRouter(Home)
