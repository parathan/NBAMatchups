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
        const header = await screen.findByText(/About/i);
        expect(header).toBeInTheDocument();
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