import React from 'react';

const Today = () => {
  function format(date) {
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ][dayOfWeek % 7];
    const month = date.getMonth();
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec'][month -1];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours ? hours % 12 : 12; // hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strDate = `${dayName} ${monthName} ${dayOfMonth}`;
    const strTime = `${hours }:${ minutes }${ ampm }`;
    return [strDate, strTime];
  }
  const date = new Date();
  return (
    <div>
      &nbsp;
      { format( date )[0] }
      &nbsp;&nbsp;
      { format( date )[1] }
    </div>
  );
};

export default Today;