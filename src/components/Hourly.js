import React from 'react';
import { Link } from 'react-router-dom';
import ShowDetailsRowHourly from './ShowDetailsRowHourly';
import { object, string } from 'prop-types';

const Hourly = ( { forecastHourly, timeZone }) => {
  return (
    <section id="hourly">
      <span className="table-heading" >
        <Link to="/daily">Daily</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="current-route">
        Hourly
        </span>
        <br/>
      </span>
      <table align="center">
        <thead>
          <tr className="not-on-mobile" id="forecast-header">
            <th>&nbsp;&nbsp;</th>
            <th></th>
            <th>Temp</th>
            <th></th>
            <th>&nbsp;</th>
            <th className="big-screen-only">Wind</th>
            <th className="bigger-screen-only">&nbsp;&nbsp;Feels Like</th>
            <th className="not-on-mobile">&nbsp;&nbsp;Precip</th>
            <th className="bigger-screen-only">&nbsp;&nbsp;Pressure</th>
          </tr>
        </thead>
        <tbody>
          { forecastHourly[0] && Object.values(forecastHourly).map((one_day, index) => {
            const a_day = { ...one_day, timezone: timeZone, key: index};
            return <ShowDetailsRowHourly day={ a_day } key={ index } />;
          })}
        </tbody>
      </table>
    </section>
  );
};

Hourly.propTypes = {
  forecastHourly: object,
  timeZone: string
};

export default Hourly;