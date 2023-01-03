const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios').default;
const apiKey = require('dotenv').config();

let api = apiKey.parsed.API_KEY;


app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('/views', path.join(__dirname, 'index'));

app.get('/', (req, res) => {
    res.render('index');
});


app.post('/', (req, res) => {
    let city = req.body.cityName;
    async function getData() {
    
        try {
            const info = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api}`)
            
            temp = await info.data.main.temp;
            feels = await info.data.main.feels_like;
            city1 = await info.data.name;
            humid = await info.data.main.humidity;
            speed = await info.data.wind.speed;
            description = await info.data.weather[0].description;
            icon = await info.data.weather[0].icon;
            
            } catch (err) {
            console.error(err);
            }

            res.render('information');
        }
       
        getData();
    }
    
);


app.listen(3000, (req, res) => {
    console.log('Server listening on port 3000')
});
