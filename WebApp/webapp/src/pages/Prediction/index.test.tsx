import { render, screen } from '@testing-library/react'
import Prediction from '.'
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
                <Prediction />
            </MemoryRouter>
        )
        const header = await screen.findAllByText(/Win\/Loss Prediction/i);
        expect(header.length).toBe(1);
    })

    it('renders team dropdowns', async () => {
        render(
            <MemoryRouter>
                <Prediction />
            </MemoryRouter>
        )
        const teamDropdowns = await screen.findAllByText(/Choose a Team/i);
        expect(teamDropdowns.length).toBe(2);
    })

    it('renders predict winners button', async () => {
        render(
            <MemoryRouter>
                <Prediction />
            </MemoryRouter>
        )
        const matchupButton = await screen.findByText(/Predict Winner/i);
        expect(matchupButton).toBeInTheDocument();
    })

    it('correct number of team dropdowns exist for team1', async () => {
        render(
            <MemoryRouter>
                <Prediction />
            </MemoryRouter>
        )
        const team1Dropdowns = await screen.findAllByTestId('team1-options');
        expect(team1Dropdowns.length).toBe(30);
    })

    it('correct number of team dropdowns exist for team2', async () => {
        render(
            <MemoryRouter>
                <Prediction />
            </MemoryRouter>
        )
        const team2Dropdowns = await screen.findAllByTestId('team2-options');
        expect(team2Dropdowns.length).toBe(30);
    })

})