const request = require("request");
const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')

const apiKey = process.env.APIKEY
// let dailyCals = 2300
// let diet = 'vegetarian'

// let url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${dailyCals}&diet=${diet}`



app.set('view engine', 'ejs')
app.use (bodyParser.urlencoded({extended: true}));
app.use (express.static('public'));

app.get('/', (req, res)=> {
    res.render('index')
})

mealText = ""
mealImages = ""
mealUrls = ""
nutrition = ""
error = ""

app.post('/', (req, res)=> {
    let dailyCals = req.body.dailyCals
    let diet = req.body.diet

    let url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${dailyCals}&diet=${diet}`

    request (url, function(err, response, body){
        if(err){
            console.log(`Error: ${err}`)

            res.render('index', {mealPlans:null, error: err})
        }else {
            // console.log(`Body: ${body}`)
    
            let mealPlan = JSON.parse(body)
    
            if(mealPlan.meals == undefined){
                res.render('index', {mealPlans:null, error: "Enter a valid number of calories."})
            } else {
                let breakfastText = `Your breakfast today is ${mealPlan.meals[0].title}. Time to prepare: ${mealPlan.meals[0].readyInMinutes} minutes.`
                let lunchText = `Your lunch today is ${mealPlan.meals[1].title}. Time to prepare: ${mealPlan.meals[1].readyInMinutes} minutes.`
                let dinnerText = `Your dinner today is ${mealPlan.meals[2].title}. Time to prepare: ${mealPlan.meals[2].readyInMinutes} minutes.`
                let breakfastImage = `https://spoonacular.com/recipeImages/${mealPlan.meals[0].id}-312x231.jpg`
                let lunchImage = `https://spoonacular.com/recipeImages/${mealPlan.meals[1].id}-312x231.jpg`
                let dinnerImage = `https://spoonacular.com/recipeImages/${mealPlan.meals[2].id}-312x231.jpg`
                let breakfastURL = mealPlan.meals[0].sourceUrl
                let lunchURL = mealPlan.meals[1].sourceUrl
                let dinnerURL = mealPlan.meals[2].sourceUrl
                let mealText = [breakfastText, lunchText, dinnerText]
                let mealImages = [breakfastImage, lunchImage, dinnerImage]
                let mealUrls = [breakfastURL, lunchURL, dinnerURL]
                let nutrition = `Your meals today add up to a total of ${mealPlan.nutrients.calories} calories. Your macros are Protein: ${mealPlan.nutrients.protein}g, Fat: ${mealPlan.nutrients.fat}g, Carbs: ${mealPlan.nutrients.carbohydrates}g.`
                
                res.render('index', { mealText, mealImages, mealUrls, nutrition,  error:null})
            }
        }
    
    
    })

})



// request (url, function(err, res, body){
//     if(err){
//         console.log(`Error: ${err}`)
//     }else {
//         console.log(`Body: ${body}`)

//         let mealPlan = JSON.parse(body)

//         let message = `Your breakfast today is ${mealPlan.meals[0].title}. Time to prepare: ${mealPlan.meals[0].readyInMinutes} minutes. `
//         console.log(mealPlan)
//         console.log(message)
//     }


// })





const port = process.env.PORT
app.listen(port, () => {
    console.log(`this server is running on ${port}`)
})