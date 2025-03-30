import { render, screen } from '@testing-library/react'
import About from '.'
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
    it('renders About page header', async () => {
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        )
        const headerArray = screen.getAllByText(/About NBAMatchups/i);
        expect(headerArray.length).toBe(1);
    })

    it('contains acknowledgement', () => {
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        )
        const acknowledgement = screen.getByText("Data Source");
        expect(acknowledgement).toBeInTheDocument();
    })
})