import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;

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
    url: 'https://open-weather13.p.rapidapi.com' + `/city/${city}/${c_code}`,
    headers: {
      'x-rapidapi-key': 'd3c07fd49emsh33fc5de0867d95fp111100jsneb1ea9c5347e',
      'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    }
    };
  try {
    
   const response = await axios.request(options);
   const temperature = response.data.main.temp;
   const icon = response.data.weather[0].icon;
   const weth_para = response.data.weather[0].main;
   const humidity = response.data.main.humidity;
   const wind_speed = response.data.wind.speed;
   const visibility = response.data.visibility;
   /*
   
   const img_url = `https://openweather.site/img/wn/01d.png`
   const c_code = response.data.sys.country;
   const sunrise = response.data.sys.sunrise;
   const sunset = response.data.sys.sunset;
   */
    res.render("index.ejs", { temp: temperature , image: icon , city_: city, code:c_code, weth_message:weth_para , humid:humidity , wind:wind_speed , vission:visibility});
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
