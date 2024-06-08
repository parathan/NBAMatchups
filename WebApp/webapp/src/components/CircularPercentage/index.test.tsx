import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CircularPercentage from '.';

describe('MatchupSlider', () => {

    it('renders component with correct state', async () => {
        render(<CircularPercentage percentage={53} />);

        await waitFor(() => {
            const percentage = screen.getByText('53%');
            expect(percentage).toBeInTheDocument();
        });
    })
})