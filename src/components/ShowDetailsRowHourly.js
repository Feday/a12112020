import React from 'react';
import { string, number, object } from 'prop-types';
import showDayLocal from '../util/showDayLocal';
import showTimeAMPM from '../util/showTimeAMPM';
import round from '../util/round';
import imgIcon from '../util/imgIcon';

const defaultTimeZone = 'EST';
const ShowDetailsRowHourly = ( { day } ) => {
  const wind_spd = round(day.wind_spd );
  const wind_cdir = day.wind_cdir;
  const description = day.weather.description;
  const precip = round( day.precip, 1);
  const timestamp_local = showDayLocal( day.timestamp_local );
  const temp = round(day.temp);
  const feels_like = round(day.app_temp);
  const ts = day.ts;
  const timeZone = day.timeZone;
  const key = day.key;
  const weather_icon = imgIcon(day.weather.icon);
  const pressure = round(day.pres);
  const hideFromMobile = (key) => {
    if (key > 11) return 'big-screen-only';
    if (key > 7) return 'not-on-mobile';
    return '';
  };
  const tz = timeZone === '' ? defaultTimeZone : timeZone;
  return (
    <tr className={ hideFromMobile(key) }>
      <td>&nbsp;&nbsp; { timestamp_local } </td>
      <td>  { showTimeAMPM( ts, tz ) } &nbsp;&nbsp; </td>
      <td className="high-temperature"> { temp }° </td>
      <td>&nbsp;&nbsp; <img className="daily-image-icon" width="33%" height="33%" src= { weather_icon } /> </td>
      <td style={{textAlign: "right"}} className="not-on-mobile"> { description } &nbsp; </td>
      <td className="big-screen-only" align="right"> {wind_cdir}@{ wind_spd} <small>mph</small> </td>
      <td className="bigger-screen-only"> { feels_like }° </td>
      <td className="not-on-mobile"> { precip } </td>
      <td className="bigger-screen-only" align="right"> {pressure } </td>
    </tr>
  );
};

ShowDetailsRowHourly.propTypes = {
  idx: number,
  day: object,
  timestamp_local: string,
  ts: number,
  temp: number,
  wind_cdir: string,
  wind_spd: number,
  weather: object,
  precip: number,
  timeZone: string
};

export { ShowDetailsRowHourly as default };