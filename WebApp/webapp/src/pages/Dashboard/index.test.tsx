// import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import Dashboard from '.'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import axios from 'axios'
import { statsArray } from '../../constants/statArray'
import { allTeamsMockData } from '../../constants/mockData'

jest.mock('react-chartjs-2', () => ({ Line: () => null })) // mocks chart in dashboard
jest.mock('axios', () => ({
    post: jest.fn()
}));


describe('Dashboard Page elements render correctly', () => {

    beforeEach(() => {
        (axios.post as jest.Mock).mockResolvedValue({
            data: allTeamsMockData
        });
    });

    it('renders dashboard header', async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        const headerArray = await screen.findAllByText(/Dashboard/i);
        expect(headerArray.length).toBe(2); // One in the page and one in navbar
    });

    it('renders team dropdown', async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        const teamDropdown = await screen.findByText(/Pick a Team/i);
        expect(teamDropdown).toBeInTheDocument();
    });

    it('renders field dropdown', async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        const fieldDropdown = await screen.findByText(/Pick a Field/i);
        expect(fieldDropdown).toBeInTheDocument();
    });

    it('correct number of team dropdowns exist', async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        const teamDropdowns = await screen.findAllByTestId('team-options')
        expect(teamDropdowns.length).toBe(30); // 30 teams
    })

    it('correct number of field dropdowns exist', async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        const fieldDropdowns = await screen.findAllByTestId('field-options');
        expect(fieldDropdowns.length).toBe(statsArray.length)
    })
})

//TODO #7
