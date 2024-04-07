// import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import Dashboard from '.'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import axios from 'axios'
import { statsArray } from '../../constants/statArray'

jest.mock('react-chartjs-2', () => ({ Line: () => null })) // mocks chart in dashboard
// jest.mock('axios');


describe('Dashboard Component', () => {
    it('Dashboard renders', () => {
        render(
            <BrowserRouter>
                <Dashboard/>
            </BrowserRouter>
        )
    })
    it('renders team and field dropdowns', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        const team = screen.getByText(/Pick a Team/i);
        expect(team).toBeInTheDocument();

        const field = screen.getByText(/Pick a Field/i);
        expect(field).toBeInTheDocument();
    })
    it('correct number of team dropdowns exist', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        const options = screen.getAllByTestId("team-options");
        expect(options.length).toBe(30); //30 teams
    })
    it('correct number of field dropdowns exist', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        )
        const options = screen.getAllByTestId('field-options');
        expect(options.length).toBe(statsArray.length)
    })
})
