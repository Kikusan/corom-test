import { act, render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the heading', async () => {
    render(<App />);
    await act(async () => {});

    expect(screen.getByText(/corom test/i)).toBeDefined();
  });
});
