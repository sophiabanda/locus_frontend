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

export const popupRenderer = (props = {}) => `
  <div className="popup">
    <a target="_blank" href='https://www.google.com/maps?q=${props.address}'>${props.name}</a>
  </div>
`;

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
