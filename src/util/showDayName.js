const showDayName = (date) => {
  const dayOFWeek = new Date(Date.parse(date)).getDay();
  return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][dayOFWeek];
};

export default showDayName;