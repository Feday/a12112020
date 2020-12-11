import showDayLocal from './showDayLocal';

describe('Tests of hourly component', () => {
  it('renders page', () => {
    const date = '01-jan-2021';
    const result = showDayLocal(date);
    expect(result).toEqual('Fri');
  });
  it('tests day 0 (sunday)', () => {
    const date = '03-jan-2021';
    const result = showDayLocal(date);
    expect(result).toEqual('Sun');
  });
  it('tests day 6 (saturday)', () => {
    const date = '09-jan-2021';
    const result = showDayLocal(date);
    expect(result).toEqual('Sat');
  });
  it('tests day 7 ("day" 1 again (7 % 6) - saturday)', () => {
    const date = '10-jan-2021';
    const result = showDayLocal(date);
    expect(result).toEqual('Sun');
  });
});