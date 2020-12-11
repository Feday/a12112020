import round from './round';

const getCompassDirection = (windDirection) => {
  if ( isNaN(windDirection)) return '-';
  const direction = round(Number.parseInt(windDirection) / 45);
  return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'][direction];
};

export default getCompassDirection;