import { render, screen, fireEvent } from '@testing-library/react';
import Unknown from '.';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Unknown Page', () => {
    it('renders unknown page header', () => {
        render(
            <MemoryRouter>
                <Unknown />
            </MemoryRouter>
        )
        const header = screen.getByText('404 Error Page');
        expect(header).toBeInTheDocument();
    })

    it('navigates to Home page when "Go Home" button is clicked', async () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
        
        render(
          <MemoryRouter>
            <Unknown />
          </MemoryRouter>
        );
        
    
        fireEvent.click(await screen.findByText('Go Home'));
        expect(navigate).toHaveBeenCalledWith('/');
    });
})