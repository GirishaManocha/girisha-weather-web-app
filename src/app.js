//import the express module
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//create a new instance
const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const herokuPath = path.join(__dirname,'../heroku/bin')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
app.set('heroku',herokuPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))



//app.com app.com/help app.com/about app.com/weather 
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'girisha'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'this is a helpfull text',
        name:'girisha'
    })
    
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About app',
        name:'girisha'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must enter an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
     
         forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                return res.send(error)
            } 
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
     
         })
         
     })

})

// app.get('/product',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'you must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         product:[]
//     })
// })

// app.get('/help/*',(req,res)=>{
//     res.send('Help article not found')
// })

// app.get('*',(req,res)=>{
//     res.send('my 404 page')
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'girisha',
        errorMessage:'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'girisha',
        errorMessage:'Page not found!'
    })
})


app.listen(3000,()=>{
    console.log('server is up on port 3000')
})



// how to deploy a project on heroku i m trying to do it but