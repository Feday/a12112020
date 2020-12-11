import moment from 'moment';
const defaultTimeZone = 'EST';

const showTimeAMPM = ( date, timeZone) => {
  const tz = timeZone === '' ? defaultTimeZone : timeZone;
  const time24hours = Number(moment.unix(date).toLocaleString(tz).substring(16, 18));
  const time12hours = time24hours % 12 === 0 ? 12 : time24hours % 12;
  const AMPM = time24hours < 12 ? 'AM' : 'PM';
  const result = time12hours + AMPM;
  const time = result === "0PM" ? "12PM" : result;
  return time;
};

export default showTimeAMPM;