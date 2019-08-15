import React, { Component } from 'react'
import axios from 'axios'
import mapboxgl, { Map as MapBox, Popup } from 'mapbox-gl'
import './Map.styles.css'
import {sampleMapData} from './mapData';

const businesses = sampleMapData.businesses;

export default class Map extends Component {
  state = { businesses }

  componentDidMount() {
    // this.fetchLocations() // on component mount, we grab the locations from the yelp api
    // console.log(this.state.businesses[0]);
    this.initializeMap()
  }
  initializeMap = () => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const mapOptions = {
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 12,
      center: ['-80.123168', '26.224963']
    }
    this.map = new mapboxgl.Map(mapOptions);
    console.log(`%c ${this.map}`, 'border: red .1rem solid;')
  }
  
  // map.on('load', function(e) {
  //   // Add the data to your map as a layer
  //   map.addLayer({
  //     id: 'locations',
  //     type: 'symbol',
  //     // Add a GeoJSON source containing place coordinates and information.
  //     source: {
  //       type: 'geojson',
  //       data: stores
  //     },
  //     layout: {
  //       'icon-image': 'restaurant-15',
  //       'icon-allow-overlap': true,
  //     }
  //   });
  // });
  
  // fetchLocations = async () => { //asynchrnous function
  //   try { 
  //     // const response = await axios.get(YELP_URL) 
  //     this.setState({ locations: parseGeoJson(response.data.businesses) }) 
  //   }
  //   catch (error) {
  //     console.log('failed to get data from yelp', error) 
  //   }
  // }

  render() {
    console.log(businesses.length)
    return <div id="map" ref={element => this.mapContainer = element} />
  
  }
  // createMap = () => {
  //   this.map = new MapBox(document.getElementById('map'))
  //   const map = this.map 
  //   const { businesses } = this.state;
  //   map.on('load', () => { 
  //     map.addSource('locations', { type: 'geojson', data: businesses }) 
  //     map.addLayer({ 
  //       id: 'businesses',
  //       type: 'symbol', 
  //       source: 'businesses',
  //       layout: {
  //         'icon-image': 'restaurant-15', 
  //         'icon-size': 1.5,
  //         'icon-allow-overlap': true 
  //       }
  //     })
  //     // map.on('click', 'locations', this.handleLocationClick) 
  //   })
  // }
  
  // handleLocationClick = event => { 
  //   const { properties, geometry = {} } = event.features[0]
  //   new Popup() 
  //     .setLngLat(geometry.coordinates) 
  //     .setHTML('<div>${properties.name}</div>') 
  //     .addTo(this.map) 
  // }
}
