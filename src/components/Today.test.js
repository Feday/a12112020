import React from 'react';
import { render, screen } from '@testing-library/react';
import Today from './Today';

describe('Tests of Today component', () => {

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
  });  // TODO Due to unresolved error about tr, however test passes.

  it('renders page', () => {
    render(<Today />);
    const timeSeperator = screen.getByText(/:/);
    expect(timeSeperator).toBeInTheDocument();
  });
});