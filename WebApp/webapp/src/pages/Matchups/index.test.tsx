import { render, screen } from '@testing-library/react'
import Matchups from '.'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import axios from 'axios'
import { orderedPercentileMockData } from '../../constants/mockData'

jest.mock('axios', () => ({
    post: jest.fn()
}));

describe("Matchups Page elements render correctly", () => {
    
    beforeEach(() => {
        (axios.post as jest.Mock).mockResolvedValue({
            data: orderedPercentileMockData
        });
    })

    it('renders matchups header', async () => {
        render(
            <MemoryRouter>
                <Matchups />
            </MemoryRouter>
        )
        const header = await screen.findAllByText(/Team Matchups/i);
        expect(header.length).toBe(3);
    })

    it('renders team dropdowns', async () => {
        render(
            <MemoryRouter>
                <Matchups />
            </MemoryRouter>
        )
        const teamDropdowns = await screen.findAllByText(/Pick a Team/i);
        expect(teamDropdowns.length).toBe(2);
    })

    it('renders year dropdown', async () => {
        render(
            <MemoryRouter>
                <Matchups />
            </MemoryRouter>
        )
        const yearDropdown = await screen.findByText(/Pick a Year/i);
        expect(yearDropdown).toBeInTheDocument();
    })

    it('renders check matchups button', async () => {
        render(
            <MemoryRouter>
                <Matchups />
            </MemoryRouter>
        )
        const matchupButton = await screen.findByText(/Check Matchup/i);
        expect(matchupButton).toBeInTheDocument();
    })

    it('correct number of team dropdowns exist for team1', async () => {
        render(
            <MemoryRouter>
                <Matchups />
            </MemoryRouter>
        )
        const team1Dropdowns = await screen.findAllByTestId('team1-options');
        expect(team1Dropdowns.length).toBe(30);
    })

    it('correct number of team dropdowns exist for team2', async () => {
        render(
            <MemoryRouter>
                <Matchups />
            </MemoryRouter>
        )
        const team2Dropdowns = await screen.findAllByTestId('team2-options');
        expect(team2Dropdowns.length).toBe(30);
    })

    it('correct number of year dropdowns exist for team2', async () => {
        render(
            <MemoryRouter>
                <Matchups />
            </MemoryRouter>
        )
        const yearDropdowns = await screen.findAllByTestId('year-options');
        expect(yearDropdowns.length).toBe(5);
    })

})