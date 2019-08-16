import React, { Component } from 'react'
import mapboxgl, { Map as MapBox, Popup, GeolocateControl } from 'mapbox-gl'
import axios from 'axios'
import './Map.styles.css'
import { sampleMapData } from './mapData';
import { parseGeoJson, flyToProps, popupRenderer, geolocationOptions, markerLayer } from './Map.helpers';
import VenueList from '../VenueList/VeneueList.component';
import mapMarker from '../images/map_marker.png'

const businesses = sampleMapData.businesses;

export default class Map extends Component {
  state = { businesses: parseGeoJson(businesses), activeVenueID: '', currentUserLoc: { lat: this.props.initialLat, lng: this.props.initialLng } }

  componentDidMount() { 
    // this.fetchData();
    this.initializeMap()
  }

  componentWillUnmount() {
    this.map.remove() // precaution to avoid memory leak ,we remove the map when we navigate away
  }

  fetchData = () => {
    const { currentUserLoc } = this.state;
    const { lat, lng } = currentUserLoc
    axios.get(`http://localhost:4000/places_choices/?lat=${lat}&lon=-${lng}`, 
    { headers: { 'Authorization': "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1N…zMDd9.J-SlI6MnkYz09VyvaubL23_R79agJH7cY7CbvoBwV6E" } })
    .then((response) => this.setState({ businesses: parseGeoJson(response.data[0].data.businesses) }));
  }

  initializeMap = () => {
    const  { longitude, latitude } =  sampleMapData.region.center || {}
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const mapOptions = {
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 12,
      center: [longitude, latitude]
    }
    this.createMap(mapOptions)
  }

  createMap = (mapOptions, markerLayer) => {
    this.map = new MapBox(mapOptions) // creating a new map
    const map = this.map
    map.loadImage(mapMarker, (error, pika) => !error && map.addImage('map_marker', pika));
    map.addControl(new GeolocateControl({ positionOptions: geolocationOptions, trackUserLocation: true }));
    const { businesses } = this.state; //grabbing location from state
    map.on('load', () => { // this is important, we are "hooking" onto the map when it loads, similar to lifecycle methods in react, this is a lifecycle of mapbox. When it loads, we will run this function
      map.addSource('businesses', { type: 'geojson', data : businesses }) // we are adding a "source", the first argument is a string for the source id, the second argument is an object for the source "data" ,we have to tell it what type of data as well, in our case we're using geojson
      map.addLayer({ // adding a layer, the id should match the source's id by convention
        id: 'businesses',
        type: 'symbol', // allow you to use images for your markers
        source: 'businesses', // state which source to pull data from
        layout: {
          'icon-image': 'embassy-11', //placeholder image
          'icon-size': 1.5,
          'icon-allow-overlap': true // important for markers close together
        }
      })
      console.log(`%c ${mapMarker}`, 'border: red .1rem solid;')
      this.geocoder = document.querySelector('.mapboxgl-ctrl-geolocate')
      this.geocoder.addEventListener('click', this.handleGeoClick)
      map.on('click', 'businesses', this.handleVenueMarkerClick) //listens to a click on the map, particularly a click on any "location", when clicked, it will call the handleLocationClick function
    })
  }

  handleGeoClick = () => {
    const { lat, lng }= this.map.getCenter()
    // this.setState({ currentUserLoc: [lng, lat] }, this.fetchData)
  }

  handleVenueMarkerClick = e => {
    const { properties, geometry: { coordinates } } = e.features[0]
    this.map.flyTo({ center: coordinates, ...flyToProps })
    new Popup()
    .setLngLat(coordinates)
    .setHTML(popupRenderer(properties))
    .addTo(this.map);
    this.setState({ activeVenueID: properties.id })
  }

  handleVenueClick = venue => () => {
    const { geometry: { coordinates }, properties } = venue;
    this.map.flyTo({ center: coordinates, ...flyToProps })
    this.setState({ activeVenueID: properties.id })
  }

  render() {
    const { businesses, activeVenueID } = this.state;
    return (
      <div>
         <div id="map" ref={element => this.mapContainer = element} />
         <VenueList venues={businesses.features} handleClick={this.handleVenueClick} activeVenueID={activeVenueID}  />
      </div>
    )
  }

 
}
