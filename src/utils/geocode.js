const request = require('request')

const geocode = (address,callback)=>{

    const geoUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZ2lyaXNoYW1hbm9jaGEiLCJhIjoiY2p4NzdtMmJoMDIxcjNvcDM3cnp5MTV6NSJ9.5Y0qEOdizcLgn1J8RNrCCw&limit=1'

    request({url:geoUrl,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }else if(response.body.features.length === 0){
            callback('unable to find location',undefined)
        }else{
             //console.log(response.body.currently)
        callback(undefined,{
            latitude : response.body.features[0].center[1],
            longitude : response.body.features[0].center[0],
            location : response.body.features[0].place_name
        })

        }
    
    })
    
}


module.exports= geocode

