import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Tests of App rendering', () => {
  it('renders main page sections regardless of API content', () => {
    render(<App />);
    const windLabelMPH = screen.getByText(/mph/i);
    expect(windLabelMPH).toBeInTheDocument();
    const lookupTown = screen.getByText(/Daily/i);
    expect(lookupTown).toBeInTheDocument();
  });
});