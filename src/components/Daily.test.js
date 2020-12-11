import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailsRow from './ShowDetailsRowDaily';

describe('Tests of hourly component', () => {

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });  // TODO Due to unresolved error about tr, however test passes.

  it('renders page', () => {
    const day = {"valid_date": "12-20-2020", "weather": {}};
    render(<DetailsRow day = { day } />);
    const windLabelMPH = screen.getByText(/mph/i);
    expect(windLabelMPH).toBeInTheDocument();
  });
});