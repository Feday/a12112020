import React from 'react';
import { object, number, string } from 'prop-types';
import round from '../util/round';
import showTemperature from '../util/showTemperature';
import showDate from '../util/showDate';
import showDayName from '../util/showDayName';
import showForecastTime from '../util/showForecastTime';
import imgIcon from '../util/imgIcon';

const ShowDetailsRowDaily = ( { day, idx, timeZone } ) => {
  const dayName = showDayName(day.valid_date).substring(0, 3);
  const restOfDayName = showDayName(day.valid_date).substring(3, 9);
  const valid_date = showDate(day.valid_date);
  const weather_icon = imgIcon(day.weather.icon);
  const description = day.weather.description;
  const high_temp = showTemperature( day.high_temp );
  const low_temp = showTemperature( day.low_temp );
  const rh = day.rh;
  const wind_spd = round(day.wind_spd);
  const wind_cdir = day.wind_cdir;
  const sunrise = showForecastTime( day.sunrise_ts, timeZone );
  const sunset = showForecastTime( day.sunset_ts, timeZone );
  const moonrise = showForecastTime( day.moonrise_ts, timeZone );
  const moonset = showForecastTime( day.moonset_ts, timeZone );
  const snow = round(day.snow, 1);
  const precip = round(day.precip, 1);
  const hideFromMobile = (idx) => {
    if(idx > 11 ) return 'big-screen-only';
    if(idx > 7 ) return 'not-on-mobile';
    return '';
  };
  return (
    <tr className={ hideFromMobile(idx) }>
      <td>&nbsp;&nbsp;{ dayName }
        <span className="big-screen-only">{ restOfDayName } </span>
      </td>
      <td className="forecast-smaller"> { valid_date } &nbsp;&nbsp;&nbsp;&nbsp; </td>
      <td>
        <span className="high-temperature">{ high_temp }</span>°/
        <span className="forecast-smaller">
          { low_temp }°
        </span>
      </td>
      <td>&nbsp;&nbsp;
        <img className="daily-image-icon" width="33%" height="33%" src= { weather_icon } />
      </td>
      <td className="big-screen-only"> { precip } </td>
      <td style={{textAlign: "right"}} className="not-on-mobile">
        { description } &nbsp;
      </td>
      <td className="big-screen-only" style={{textAlign: "right"}}>
        { wind_cdir }<small>@</small>
        { wind_spd }
        <small>mph</small>
        &nbsp; &nbsp;&nbsp;
      </td>
      <td className="not-on-mobile">  { rh } </td>
      <td className="biggest-screen-only"> { snow } </td>
      <td className="bigger-screen-only"><small>↑</small>{ sunrise }</td>
      <td className="bigger-screen-only"><small>↓</small>{ sunset }</td>
      <td className="biggest-screen-only"><small>↑</small>{ moonrise }</td>
      <td className="biggest-screen-only"><small>↓</small>{ moonset }</td>
    </tr>
  );
};

ShowDetailsRowDaily.propTypes = {
  day: object,
  idx: number,
  timeZone: string,
  valid_date: string,
  high_temp: number,
  low_temp: number,
  rh: number,
  wind_spd: number,
  wind_cdir: string,
  sunrise: number,
  sunset: number
};

export { ShowDetailsRowDaily as default, showTemperature, showForecastTime as showTime };