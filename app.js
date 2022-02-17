const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const apiKey = "76ef3b44b1364389bc480394115044cf"
// let dailyCals = 2300
// let diet = 'vegetarian'

// let url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${dailyCals}&diet=${diet}`



app.set('view engine', 'ejs')
app.use (bodyParser.urlencoded({extended: true}));
app.use (express.static('public'));

app.get('/', (req, res)=> {
    res.render('index')
})

app.post('/', (req, res)=> {
    let dailyCals = req.body.calories
    let diet = req.body.diet

    let url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${dailyCals}&diet=${diet}`

    request (url, function(err, res, body){
        if(err){
            console.log(`Error: ${err}`)
        }else {
            // console.log(`Body: ${body}`)
    
            let dailyPlan = JSON.parse(body)
    
            let message = `Your breakfast today is ${dailyPlan.meals[0].title}. Time to prepare: ${dailyPlan.meals[0].readyInMinutes} minutes. Your lunch today is ${dailyPlan.meals[1].title}. Time to prepare: ${dailyPlan.meals[1].readyInMinutes} minutes. Your dinner today is ${dailyPlan.meals[2].title}. Time to prepare: ${dailyPlan.meals[2].readyInMinutes} minutes.`
            console.log(dailyPlan)
            console.log(message)
        }
    
    
    })

})



// request (url, function(err, res, body){
//     if(err){
//         console.log(`Error: ${err}`)
//     }else {
//         console.log(`Body: ${body}`)

//         let dailyPlan = JSON.parse(body)

//         let message = `Your breakfast today is ${dailyPlan.meals[0].title}. Time to prepare: ${dailyPlan.meals[0].readyInMinutes} minutes. `
//         console.log(dailyPlan)
//         console.log(message)
//     }


// })





const port = 5000
app.listen(port, () => {
    console.log(`this server is running on ${port}`)
})