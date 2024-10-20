import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { getSunrise, getSunset } from 'sunrise-sunset-js'; 
import date from 'date-and-time';
import moment from "moment";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  const city = req.body["city"];
  const c_code = req.body["country_code"];
  const options = {
    method: 'GET',
    url: 'https://open-weather13.p.rapidapi.com' + `/city/${city}/${c_code}/`,
    headers: {
      'x-rapidapi-key': process.env.API_KEY,
      'x-rapidapi-host': process.env.HOST
    }
    };
  try {
   const response = await axios.request(options);
/**  
 * getting the time of sunrise and sunset......
*/
const timezone = response.data.timezone;
const sunrise = response.data.sys.sunrise;
const sunset = response.data.sys.sunset;
const x = moment.utc(sunrise,'X').add(timezone,'seconds').format('HH:mm a');
const y = moment.utc(sunset,'X').add(timezone,'seconds').format('HH:mm a');

   const now = new Date();
   const Today = date.format(now, 'ddd, MMM DD YYYY');
   const temperature = response.data.main.temp;
   const icon = response.data.weather[0].icon;
   const weth_para = response.data.weather[0].description;
   const humidity = response.data.main.humidity;
   const wind_speed = response.data.wind.speed;
   const visibility = response.data.visibility;
   
  
    res.render("index.ejs", { temp: temperature , image: icon , city_: city, code:c_code, weth_message:weth_para ,
       humid:humidity , wind:wind_speed , vission:visibility , sunr:x , suns:y , today: Today});
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
