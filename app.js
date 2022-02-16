const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const apiKey = "76ef3b44b1364389bc480394115044cf"
let dailyCals = 2300
let diet = '&diet='

let url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${dailyCals}`



app.set('view enjine', 'ejs')
app.use (bodyParser.urlencoded({extended: true}));
app.use (express.static('public'));



const port = 5000
app.listen(port, () => {
    console.log(`this server is running on ${port}`)
})