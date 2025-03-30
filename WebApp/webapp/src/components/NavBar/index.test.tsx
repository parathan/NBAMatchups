import { render, screen, fireEvent } from '@testing-library/react'
import NavBar from '.'
import { MemoryRouter, Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Navbar', () => {
    it('navbar renders', async () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        )

        expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Matchups').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Predictions').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    })

    it('navigates to correct routes when clicked', async () => {
        const history = createMemoryHistory()
        history.push = jest.fn();

        render(
            <Router location={history.location} navigator={history}>
                <NavBar />
            </Router>
        )

        fireEvent.click(screen.getAllByText('Matchups')[0]);  
        expect(history.push).toHaveBeenCalledWith(
            {
                hash: '',
                pathname: '/matchups',
                search: ''
            }, 
            undefined, 
            expect.anything()
        );

        fireEvent.click(screen.getAllByText('Predictions')[0]);
        expect(history.push).toHaveBeenCalledWith(
            {
                hash: '',
                pathname: '/predictions',
                search: ''
            }, 
            undefined, 
            expect.anything()
        );

        fireEvent.click(screen.getAllByText('Dashboard')[0]);
        expect(history.push).toHaveBeenCalledWith(
            {
                hash: '',
                pathname: '/dashboard',
                search: ''
            }, 
            undefined, 
            expect.anything()
        );
        
        // TODO #8
        // TODO #9
    })
})