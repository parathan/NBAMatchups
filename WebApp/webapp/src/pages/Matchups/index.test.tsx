import { render, screen } from '@testing-library/react'
import Matchups from '.'
import { BrowserRouter } from 'react-router-dom'
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
            <BrowserRouter>
                <Matchups />
            </BrowserRouter>
        )
        const header = await screen.findAllByText(/Team Matchups/i);
        expect(header.length).toBe(3);
    })

    it('renders team dropdowns', async () => {
        render(
            <BrowserRouter>
                <Matchups />
            </BrowserRouter>
        )
        const teamDropdowns = await screen.findAllByText(/Pick a Team/i);
        expect(teamDropdowns.length).toBe(2);
    })

    it('renders year dropdown', async () => {
        render(
            <BrowserRouter>
                <Matchups />
            </BrowserRouter>
        )
        const yearDropdown = await screen.findByText(/Pick a Year/i);
        expect(yearDropdown).toBeInTheDocument();
    })

    it('renders check matchups button', async () => {
        render(
            <BrowserRouter>
                <Matchups />
            </BrowserRouter>
        )
        const matchupButton = await screen.findByText(/Check Matchup/i);
        expect(matchupButton).toBeInTheDocument();
    })

    it('correct number of team dropdowns exist for team1', async () => {
        render(
            <BrowserRouter>
                <Matchups />
            </BrowserRouter>
        )
        const team1Dropdowns = await screen.findAllByTestId('team1-options');
        expect(team1Dropdowns.length).toBe(30);
    })

    it('correct number of team dropdowns exist for team2', async () => {
        render(
            <BrowserRouter>
                <Matchups />
            </BrowserRouter>
        )
        const team2Dropdowns = await screen.findAllByTestId('team2-options');
        expect(team2Dropdowns.length).toBe(30);
    })

    it('correct number of year dropdowns exist for team2', async () => {
        render(
            <BrowserRouter>
                <Matchups />
            </BrowserRouter>
        )
        const yearDropdowns = await screen.findAllByTestId('year-options');
        expect(yearDropdowns.length).toBe(5);
    })

})