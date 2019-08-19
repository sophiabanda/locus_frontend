var axios = require('axios');

const APIcall = ({ address1, address2, city1, city2, setter }) => {
    console.log(address1, address2, city1, city2)
var state = 'FL'
    let API_KEY = '41150c82c3014e3a87abb252f65ef0bb'
    let ADDRESS_TO_COORDINATES_URL_TEMPLATE = `https://ssll.dokku-hosted.thruhere.net/?api_key=${API_KEY}&`
    let COORDINATES_TO_MIDPOINT_URL_TEMPLATE = `https://miim.dokku-hosted.thruhere.net/midpoint?api_key=${API_KEY}&`
var addressA = {street: address1, city: city1, state},
    addressB = {street: address2, city: city2, state},
    addresses = [addressA, addressB];  // these come from the form

// convert object to encoded params
function toParams(obj){
    return encodeURI(Object.entries(obj)
    .map(items => items.join('=')).join('&'))
}
var urls = addresses
    .map(address => `${ADDRESS_TO_COORDINATES_URL_TEMPLATE}${toParams(address)}`)
// console.log(urls)

var keys = ['a_point', 'b_point'];

axios.all(urls.map(url => axios.get(url)))
    .then(results => results.map(({data}) => {
        return data.data.coordinates;
    }))
    .then(coordinates => {
       return coordinates
            .map(coordinate => Object.values(coordinate))
            .map(values => values.join())
            .reduce((obj, v, i) => {
                obj[keys[i]] = v;
            return obj;
        }, {});
    })
    .then(coordinates => {
        return toParams(coordinates)
    })
    .then(params => {
        //nested axios call
        axios.get(`${COORDINATES_TO_MIDPOINT_URL_TEMPLATE}${params}`)
            .then(({data}) => {console.log(data.response.midpoint.lat, data.response.midpoint.lon)
                axios.get(`https://in-between-back-end.herokuapp.com/places_choices/?lat=${data.response.midpoint.lat}&lon=${data.response.midpoint.lon}`, 
                { headers: { 'Authorization': sessionStorage.getItem('TOKEN') } })
                    .then((response) => setter(response.data[0].data))
            })
            .catch(e => console.error(e.message))
    })
    .catch(e => console.error(e.message))

}

export default APIcall
