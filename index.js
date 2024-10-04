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
      'x-rapidapi-key': '8bab53d324msh2b1ea315288eeb7p1c88b3jsn13afa91bfef5',
      'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
   const temperature = response.data.main.temp;
   /*
   const humidity = response.data.main.humidity;
   const weth_para = response.data.weather.main;
   const c_code = response.data.sys.country;
   const icon = response.data.weather.icon;
   const wind_speed = response.data.wind.speed;
   const visibility = response.data.visibility;
   const sunrise = response.data.sys.sunrise;
   const sunset = response.data.sys.sunset;
   */
    console.log(response.data);
    res.render("index.ejs", { temp: temperature});
  } catch (error) {
    console.error(error);
  }
 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
