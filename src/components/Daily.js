import React from 'react';
import { Link } from  'react-router-dom';
import ShowDetailsRowDaily from './ShowDetailsRowDaily';
import { object, string } from 'prop-types';

const Daily = ( { forecast, timeZone } ) => {
  return (

    <section id="forecast">
      <span className="table-heading">
        <span className="current-route">
                  Daily&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <Link to="/hourly">Hourly</Link><br/>
      </span>
      <table align="center">
        {/* <thead> */}
        <tr className="not-on-mobile" id="forecast-header">
          <th>Day</th>
          <th>Date&nbsp;&nbsp;</th>
          <th>Hi&nbsp;&nbsp;Lo</th>
          <th></th>
          <th className="big-screen-only">Precip</th>
          <th className="big-screen-only"></th>
          <th className="not-on-mobile"></th>
          <th className="not-on-mobile">&nbsp;Humidity</th>
          <th className="biggest-screen-only">&nbsp;Snow</th>
          <th className="bigger-screen-only">&nbsp;&nbsp;Sunrise&nbsp;&nbsp;&nbsp;</th>
          <th className="bigger-screen-only">&nbsp;&nbsp;Sunset&nbsp;&nbsp;</th>
          <th className="biggest-screen-only">&nbsp;&nbsp;Moonrise</th>
          <th className="biggest-screen-only">&nbsp;&nbsp;Moonset</th>
        </tr>
        {/* </thead> */}
        <tbody>
          { forecast[0] && Object.values(forecast).map((one_day, index) => {
            return (
              <ShowDetailsRowDaily
                day={ one_day } key={ index } idx={ index } timeZone = { timeZone }
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

Daily.propTypes = {
  forecast: object,
  timeZone: string
};
export default Daily;