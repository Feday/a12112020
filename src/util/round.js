const round = (num, decimals = 0) => {
  if (typeof num === 'number') return num.toFixed(decimals);
  return '-';
};

export default round;