export const parseGeoJson = (data = []) => { //this is your geojson parser, I tailored it to match how yelp's api data structure
  if (!data.length) return [];
  const features = data.map(item => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordindates: [item.coordinates.longitude, item.coordinates.latitude],
    },
    properties: { ...item },
  }))
  return { type: 'FeatureCollection', features }
}
