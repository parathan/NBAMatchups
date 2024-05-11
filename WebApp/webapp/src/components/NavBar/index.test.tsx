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

        const home = await screen.findByText('Home');
        expect(home).toBeInTheDocument();

        const matchups = await screen.findByText('Team Matchups');
        expect(matchups).toBeInTheDocument();

        const predictions = await screen.findByText('Win/Loss Prediction');
        expect(predictions).toBeInTheDocument();

        const dashboard = await screen.findByText('Dashboard');
        expect(dashboard).toBeInTheDocument();
    })

    it('navigates to correct routes when clicked', async () => {
        const history = createMemoryHistory()
        history.push = jest.fn();

        render(
            <Router location={history.location} navigator={history}>
                <NavBar />
            </Router>
        )

        fireEvent.click(await screen.findByText('Team Matchups'));
        expect(history.push).toHaveBeenCalledWith(
            {
                hash: '',
                pathname: '/matchups',
                search: ''
            }, 
            undefined, 
            expect.anything()
        );

        fireEvent.click(await screen.findByText('Win/Loss Prediction'));
        expect(history.push).toHaveBeenCalledWith(
            {
                hash: '',
                pathname: '/predictions',
                search: ''
            }, 
            undefined, 
            expect.anything()
        );

        fireEvent.click(await screen.findByText('Dashboard'));
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