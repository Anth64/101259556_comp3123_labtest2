import './App.css';
import React, { useEffect, useState } from "react";

function App() {
	const [weatherData, setWeatherData] = useState();

	// Function to get weather data.
	const getWeatherData = async () => {
			const res = await fetch(
				"http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=9096471a31e121a6deed813e0bd55dcc").then((res) => res.json());

		setWeatherData(res);
	};

	useEffect(() => {
		getWeatherData();
	}, []);
	

	function getDayName() {
		let d = new Date().getDay();
		switch(d) {
			case 0:
				return "Sunday";
			case 1:
				return "Monday";
			case 2:
				return "Tuesday";
			case 3:
				return "Wednesday";
			case 4:
				return "Thursday";
			case 5:
				return "Friday";
			case 6:
				return "Saturday";
			default:
				return "NONE";
		}
	}

  return (
    <div className="App">
      <header className="App-header">
				<h1>{ getDayName() }'s Forecast</h1>
				<p> { weatherData && weatherData.name } </p>
				<p> { new Date().toDateString() }</p>
				<img src={ weatherData && "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"} alt="weather icon"/>
				{ weatherData && weatherData.weather[0].description} at { weatherData && (weatherData.main.temp - 273.15).toFixed(1) + "\u00B0C" } <br/>
				<p>feels like {weatherData && (weatherData.main.feels_like - 273.15).toFixed(1) + "\u00B0C"}</p>
				<h3> Raw Data </h3>
				{ weatherData && JSON.stringify(weatherData, null, 2) }
      </header>
    </div>
  );
}

export default App;
