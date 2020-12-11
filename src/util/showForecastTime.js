const defaultTimeZone = 'EST';
import moment from 'moment';
const showForecastTime = (date, timeZone) => {
  const tz = timeZone === '' ? defaultTimeZone : timeZone;
  return  moment.unix(date).toLocaleString(tz).substring(16, 21);
};

export default showForecastTime;