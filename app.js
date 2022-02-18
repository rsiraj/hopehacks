const request = require("request");
const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')


const apiKey = process.env.APIKEY
const apiKey2 = process.env.APIKEY2

app.set('view engine', 'ejs')
app.use (bodyParser.urlencoded({extended: true}));
app.use (express.static("public"));


app.get('/', (req, res)=> {
    res.render('index')
})

app.get('/meals', (req, res)=> {
    res.render('mealsPage')
})

app.get('/contact', (req, res)=> {
    res.render('contact')
})

mealText = ""
mealImages = ""
mealUrls = ""
nutrition = ""
error = ""
activityVariable = ""
value = ""
activity = ""

app.post('/meals', (req, res)=> {
    let dailyCals = req.body.dailyCals
    let diet = req.body.diet

    let url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${dailyCals}&diet=${diet}`

    request (url, function(err, response, body){
        if(err){
            console.log(`Error: ${err}`)

            res.render('mealsPage', {mealText:null, error: err})
        }else {
            // console.log(`Body: ${body}`)
    
            let mealPlan = JSON.parse(body)
    
            if(mealPlan.meals == undefined){
                res.render('mealsPage', {mealText:null, error: "Enter a valid number of calories."})

            } else {
                let mealText = [
                breakfastText = `Your breakfast today is ${mealPlan.meals[0].title}. Servings: ${mealPlan.meals[0].servings}. Time to prepare: ${mealPlan.meals[0].readyInMinutes} minutes.`,
                lunchText = `Your lunch today is ${mealPlan.meals[1].title}. Servings: ${mealPlan.meals[1].servings}. Time to prepare: ${mealPlan.meals[1].readyInMinutes} minutes.`,
                dinnerText = `Your dinner today is ${mealPlan.meals[2].title}. Servings: ${mealPlan.meals[2].servings}. Time to prepare: ${mealPlan.meals[2].readyInMinutes} minutes.`
                ]
                let mealImages = [
                breakfastImage = `https://spoonacular.com/recipeImages/${mealPlan.meals[0].id}-312x231.jpg`,
                lunchImage = `https://spoonacular.com/recipeImages/${mealPlan.meals[1].id}-312x231.jpg`,
                dinnerImage = `https://spoonacular.com/recipeImages/${mealPlan.meals[2].id}-312x231.jpg`
                ]
                let mealUrls = [
                breakfastURL = mealPlan.meals[0].sourceUrl,
                lunchURL = mealPlan.meals[1].sourceUrl,
                dinnerURL = mealPlan.meals[2].sourceUrl,
                ]
                let nutrition = `Your meals today add up to a total of ${mealPlan.nutrients.calories} calories. Your macros are Protein: ${mealPlan.nutrients.protein}g, Fat: ${mealPlan.nutrients.fat}g, Carbs: ${mealPlan.nutrients.carbohydrates}g.`
                
                res.render('mealsPage', { mealText, mealImages, mealUrls, nutrition,  error:null})
            }
        }
    })
})

app.get('/:activity', (req, res)=> {
    let userActivity = req.params.activity
    let url = `https://www.google.com/maps/embed/v1/search?q=${userActivity}%20near%20me&key=${apiKey2}`
    res.render('map', {url})
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`this server is running on ${port}`)
})