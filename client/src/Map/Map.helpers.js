import mapMarker from '../images/map_marker.png';


export const parseGeoJson = (data = []) => { //this is your geojson parser, I tailored it to match how yelp's api data structure
  if (!data.length) return [];
  const features = data.map(item => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [item.coordinates.longitude, item.coordinates.latitude],
    },
    properties: { ...item, address: item.location.display_address.join(', ') },
  }))
  return { type: 'FeatureCollection', features }
}

export const flyToProps = { speed: 0.3, zoom: 14, bearing: 20, pitch: 20 };

export const popupRenderer = (props = {}) => {
  const { title: category } = (JSON.parse(props.categories) || [])[0] || {}
  console.log('foo', category)
  const { price, rating, address, phone, image_url } = props;
  console.log('props', props)
  return `
  <div class="popup">
    <h1 class="card-title">${props.name}</h1>
    <p class="card-items">Category: ${category}</p>
    <p class="card-items">${price}</p>
    <p class="card-items">${rating} <span id="stars">Stars</span></p>
    <a class="card-items" target="_blank" href='https://www.google.com/maps?q=${props.address}'>${address}</a>
    <p class="card-items"><a href=${phone}> ${phone}</a></p>
    <img class="popup-image" src=${image_url} />
  </div>
`}

export const geolocationOptions = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 10000
};

export const markerLayer   = {
  id: 'marker',
  type: 'symbol',
  source: 'marker',
  layout: {
    'icon-image': { mapMarker }
  }
};
