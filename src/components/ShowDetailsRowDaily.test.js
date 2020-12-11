import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowDetailsRowDaily, { showTemperature, showTime } from './ShowDetailsRowDaily';
import showDayLocal from '../util/showDayLocal';

describe('Tests of temperature', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });  // TODO Due to unresolved error about tr, however test passes.

  it('renders page', () => {
    const day = {"valid_date": "12-15-2020", "weather": {} };
    render(<ShowDetailsRowDaily day = { day } />);
    const windLabelMPH = screen.getByText(/mph/i);
    expect(windLabelMPH).toBeInTheDocument();
  });
  it('show temperature rounded down to 2 decimal placed', () => {
    const result = showTemperature(1.494949);
    expect(result).toEqual("1");
  });
  it('shows temperature rounded up to 2 decimal placed', () => {
    const result = showTemperature(1.5051);
    expect(result).toEqual("2");
  });
  it('shows time', () => {
    const result = showTime(160719258044, 'EST');
    expect(result).toEqual("09:20");
  });
  it('shows time II', () => {
    const result = showTime(160739258044, 'EST');
    expect(result).toEqual("21:54");
  });
  it('shows day', () => {
    const result = showDayLocal("12-06-2020", 'EST');
    expect(result).toEqual("Sun");
  });
});