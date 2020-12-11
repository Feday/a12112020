import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Today from './components/Today';
import round from './util/round';
import Hourly from './components/Hourly';
import Daily from './components/Daily';
import getCompassDirection from './util/getCompassDirection';
import {
  openWeatherMapJSONheader,
  weatherBitDailyForecastJSONheader,
  weatherBitHourlyForecastJSONheader,
  redlineJSONheader
} from './JSONheaders';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [city, setCity] = useState();
  const [zip, setZip] = useState('02140');
  // const [zip, setZip] = useState(localStorage.getItem('zip') || '02140');
  const [state, setState] = useState();
  const [timeZone, setTimeZone] = useState();
  const [weatherMain, setWeatherMain] = useState();
  const [weatherTemp, setWeatherTemp] = useState();
  const [windspeed, setWindSpeed] = useState();
  const [windDirection, setWindDirection] = useState();
  const [windCompassDirection, setWindCompassDirection] = useState();
  const [currentIconURL, setCurrentIconURL] = useState( "https://openweathermap.org/img/wn/10d@2x.png");
  const [latLong, setLatLong] = useState([0, 0]);
  const [forecast, setForecast] = useState({});
  const [forecastHourly, setForecastHourly] = useState({});
  const redlineZipcodeLocation  = redlineJSONheader(zip);
  const openWeatherMapConditions = openWeatherMapJSONheader(zip);
  const weatherBitDailyForecast = weatherBitDailyForecastJSONheader (latLong);
  const weatherBitHourlyForecast = weatherBitHourlyForecastJSONheader (latLong);
  const openweathermapICON_URL = 'https://openweathermap.org/img/wn/';
  const resetConditions = () => {
    setWindSpeed('');
    setWindDirection('');
    setWindCompassDirection('');
    setWeatherMain('');
    setWeatherTemp('');
  };
  const resetLocation = () => {
    setCity('');
    setState('');
    setTimeZone('');
  };
  const resetForecast = () => {
    setForecast({});
  };
  const resetConditionsAndForecast = () => {
    resetConditions();
    resetForecast();
  };
  const setDailyForecast = () => {
    axios.request(weatherBitDailyForecast)
      .then(function(response) {
        const responseData = response.data.data;
        const reducedResponse = responseData.reduce((result, item, index) => {
          return { ...result, [index]: item, };
        }, {});
        setForecast({...reducedResponse});
      })
      .catch(function() { resetForecast(); });
  };

  const setHourlyForecast = () => {
    axios.request(weatherBitHourlyForecast)
      .then(function(response) {
        const responseData = response.data.data;
        const reducedResponse = responseData.reduce((result, item, index) => {
          return { ...result, [index]: item, };
        }, {});
        setForecastHourly({...reducedResponse});
      })
      .catch(function() { resetForecast();
      });
  };

  const setLocationDetails = (response) => {
    console.log(`Axios call made ${new Date()}`);
    setCity(response.data.city);
    setState(response.data.state);
    setTimeZone(response.data.timezone.timezone_abbr);
    setLatLong([response.data.lat, response.data.lng]);
  };

  const setConditionsDetails = (response) => {
    setWeatherMain(response.data.weather[0].main);
    setWeatherTemp(round(response.data.main.temp));
    const windSpeed = round(response.data.wind.speed * (5 / 9));
    setWindSpeed(windSpeed);
    setWindDirection(round(response.data.wind.deg));
    setWindCompassDirection( getCompassDirection( windDirection));
    setCurrentIconURL( `${openweathermapICON_URL}${response.data.weather[0].icon}@2x.png` );
  };

  useEffect(() => {
    if (zip.length === 5 && !isNaN(zip)) {
      // Axios call #1 for zip, town, state and Timezone (top header)
      axios.request(redlineZipcodeLocation)
        .then(function(response) {
          setLocationDetails(response);
        })
        .then(function() {
          if( latLong[0] !== 0 && latLong[1] !== 0) {
            // Axios calls #2 and #3 to get the 16 Day and Hourly forecasts
            setDailyForecast();
            setHourlyForecast();
          }
        })
        .catch(function() {
          resetLocation();
          resetConditionsAndForecast();
        });
      // Axios call #4 to get Current Conditions, temp, min temp, max temp, windspeed
      axios.request(openWeatherMapConditions)
        .then(function(response) {
          setConditionsDetails(response);
        })
        .catch(function() {
          resetForecast();
        });
    }
    if (zip.length !== 5 || isNaN(zip)) {
      resetLocation();
      resetConditionsAndForecast();
    }
  }, [ zip, ...latLong ]);

  const updateZip = (event) => {
    setZip(event.target.value);
  };

  return (
    <Router>
      <div className = "app" >
        <span className="flex-container">

          <section id="location">
            <span className = "zip-input-form" >
              <form onSubmit = { updateZip } >
                <span className="reload">
                  <input type = "text"
                    placeholder = "zip"
                    value = { zip }
                    onChange = { updateZip }
                    size = "5" maxLength = "10" className = "zip-input" autoFocus
                  />
                  <a href="http://www.google.com" onClick={() => history.go(0)}>LINK</a>
                  <span
                    className="reload-link"
                    // eslint-disable-next-line no-undef
                    onClick={() => history.go(0) } >
                    <img src="./reload.png" />
                  </span>
                </span>
              </form>
              <span id="location-city-state">
                { city }&nbsp;{ state }
              </span>
              <br/>
              <div className = "timezone" > { timeZone } <br/>
              </div>
            </span>
          </section>
          <section id="conditions">
            <div>
              <span className="section-heading conditions-heading">
                <Today />
              </span>
              <span className="forecast-conditions">
                <img align="center" src={currentIconURL} />&nbsp;
              </span>
              <span className="forecast-temperature">
                { weatherTemp }°
              </span><small>F</small>
            </div>
            { weatherMain }
        &nbsp; { windCompassDirection }<small>@</small>{ windspeed }<span id = "mph">mph</span>
          </section>
        </span>
        <Switch>
          <Route path="/hourly">
            <Hourly forecastHourly = { forecastHourly } timeZone = { timeZone } />
          </Route>
          <Route path="/">
            <Daily forecast = { forecast } timeZone = { timeZone } />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export { App as default, round, getCompassDirection };