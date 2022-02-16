const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.set('view enjine', 'ejs')
app.use (bodyParser.urlencoded({extended: true}));
app.use (express.static('public'));



const port = 5000
app.listen(port, () => {
    console.log(`this server is running on ${port}`)
})