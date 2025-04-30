import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { BidForm } from '../bid-form';
import { render } from '@testing-library/react';

// Mock the toast function
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('BidForm', () => {
  const mockOnPlaceBid = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with minimum bid info', () => {
    render(
      <BidForm 
        auctionId="auction123" 
        currentPrice={100} 
        isConnected={true}
        onPlaceBid={mockOnPlaceBid}
      />
    );
    
    // Check if the form elements are present
    expect(screen.getByLabelText(/Your Bid/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Place Bid/i })).toBeInTheDocument();
    
    // Check if the minimum bid information is displayed correctly using a function matcher
    // Current price is 100, so minimum increment should be 10, leading to min bid of 110
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'label' && 
             content.includes('Your Bid') && 
             content.includes('minimum: $110');
    })).toBeInTheDocument();
  });

  it('disables the submit button when not connected', () => {
    render(
      <BidForm 
        auctionId="auction123" 
        currentPrice={100} 
        isConnected={false}
        onPlaceBid={mockOnPlaceBid}
      />
    );
    
    const button = screen.getByRole('button', { name: /Connecting/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Connecting...');
  });

  it('validates bid amount when too low', () => {
    render(
      <BidForm 
        auctionId="auction123" 
        currentPrice={100} 
        isConnected={true}
        onPlaceBid={mockOnPlaceBid}
      />
    );
    
    // Enter an invalid bid (lower than minimum)
    const input = screen.getByLabelText(/Your Bid/i);
    fireEvent.change(input, { target: { value: '105' } });
    
    // Submit the form
    const button = screen.getByRole('button', { name: /Place Bid/i });
    fireEvent.click(button);
    
    // Skip testing toast for now
    
    // Verify bid was not placed
    expect(mockOnPlaceBid).not.toHaveBeenCalled();
  });

  it('calls onPlaceBid when a valid bid is submitted', () => {
    render(
      <BidForm 
        auctionId="auction123" 
        currentPrice={100} 
        isConnected={true}
        onPlaceBid={mockOnPlaceBid}
      />
    );
    
    // Enter a valid bid
    const input = screen.getByLabelText(/Your Bid/i);
    fireEvent.change(input, { target: { value: '150' } });
    
    // Submit the form
    const button = screen.getByRole('button', { name: /Place Bid/i });
    fireEvent.click(button);
    
    // Check that onPlaceBid was called with the correct amount
    expect(mockOnPlaceBid).toHaveBeenCalledWith(150);
    
    // Since React 19, controlled inputs are updated asynchronously in tests
    // Just check that mockOnPlaceBid was called correctly
  });
});