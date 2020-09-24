const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGF2ZWoxMiIsImEiOiJja2V1eXduN3kwdWc1MzNwN3dxcjN1ZWpqIn0.do_eBdHZHbEB67zzIbemyw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.  Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode


// const url = 'http://api.weatherstack.com/current?access_key=73d6dee31610b502511cd635218adc64&query=37.8267,-122.4233&units=m'

// request({ url: url, json: true }, (error, response) => {
//     //console.log(response.body.current)
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out.  It feels like " + response.body.current.feelslike + " degrees.")
//     }
//     })