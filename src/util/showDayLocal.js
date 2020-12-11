const showDayLocal = (date) => {
  const dayOFWeek = new Date(Date.parse(date)).getDay();
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOFWeek];
};

export default showDayLocal;