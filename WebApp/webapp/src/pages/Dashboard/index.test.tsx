// import renderer from 'react-test-renderer'
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from '.'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import axios from 'axios'
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
        const headerArray = await waitFor(() => screen.findAllByText(/Dashboard/i));
        expect(headerArray.length).toBe(3); // One in the page and one in navbar
    });
})

//TODO #7
