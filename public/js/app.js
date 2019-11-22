//console.log('javascript')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    //console.log(location)

    messageOne.textContent='loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{

//to get the parsed data
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

    })

})
})






// fetch('https://puzzle.mead.io/puzzle').then((response)=>{

// //to get the parsed data
//     response.json().then((data)=>{
//         console.log(data)

//     })

// })