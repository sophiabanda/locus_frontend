import React, { Component } from 'react'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'

class Map extends Component {
  state = { locations: [] }

  componentDidMount() {
    this.initializeMap()
  }
  render() {
    return ( <div id="map" />
    )
  }
}

export default Map
