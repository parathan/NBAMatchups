import { render, screen, fireEvent } from '@testing-library/react'
import Home from '.'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

class IntersectionObserver {
    observe = jest.fn()
    disconnect = jest.fn()
    unobserve = jest.fn()
  }
  
Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Home Page', () => {
    it('renders home page header', async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        const header = await screen.findByText(/Welcome to NBAMatchups/i);
        expect(header).toBeInTheDocument();
    })

    it('contains acknowledgement', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        const acknowledgement = screen.getByText("Acknowledgement");
        expect(acknowledgement).toBeInTheDocument();
    })
    
    it('navigates to matchups page when "Go to Team Matchups" button is clicked', async () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
        
        render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
        
    
        fireEvent.click(await screen.findByText('Go to Team Matchups'));
        expect(navigate).toHaveBeenCalledWith('/matchups');
    });

    it('navigates to prediction page when "Win/Loss Prediction" buton is clicked', async () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        fireEvent.click(await screen.findByText('Go to Win/Loss Prediction'));
        expect(navigate).toHaveBeenCalledWith('/predictions');
    })

    it('navigates to dashboard page when "Dashboard" button is clicked', async () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        fireEvent.click(await screen.findByText('Go to Statistical Dashboard'));
        expect(navigate).toHaveBeenCalledWith('/dashboard');
    })
})