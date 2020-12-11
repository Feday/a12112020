import React from 'react';
import { render, screen } from '@testing-library/react';
import Hourly from './ShowDetailsRowHourly';

describe('Tests of hourly component', () => {

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });  // TODO Due to unresolved error about tr, however test passes.

  it('renders page', () => {
    const day = {"wind_spd": 1, "weather": { description: "clouds"}};
    render(<Hourly day = { day } />);
    const windLabelMPH = screen.getByText(/mph/i);
    expect(windLabelMPH).toBeInTheDocument();
  });
});