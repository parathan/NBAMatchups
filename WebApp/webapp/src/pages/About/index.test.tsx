import { render, screen } from '@testing-library/react'
import About from '.'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

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
        const headerArray = screen.getAllByText(/About/i);
        expect(headerArray.length).toBe(2);
    })

    it('contains acknowledgement', () => {
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        )
        const acknowledgement = screen.getByText("Acknowledgement");
        expect(acknowledgement).toBeInTheDocument();
    })
})