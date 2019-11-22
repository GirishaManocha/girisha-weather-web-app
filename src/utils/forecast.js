const request = require('request')

const forecast = (latitude,longitude,callback)=>{

    const url= 'https://api.darksky.net/forecast/48b833ca6eaaced03e5ec593dd6cbdf9/37.8267,-122.4233?'

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to weather services',undefined)
        }else if(response.body.error){
            callback.log('unabla to find location',undefined)
        }else{
             //console.log(response.body.currently)
        callback(undefined,response.body.daily.data[0].summary +'It is currently '+response.body.currently.temperature +' degree out.There is a '+response.body.currently.precipProbability+ '% chance of rain.')
        }
    
    })

}

module.exports= forecast



