import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchupSlider from '.';

describe('MatchupSlider', () => {
    const defaultProps = {
        team1Percentile1: 40,
        team2Percentile_Op: 60,
        field1: 'fg3',
        field2: 'opp_fg3',
        team1Trad: 50,
        team2Trad_Op: 60,
        mean1: 55,
        mean2: 65,
        absPercentileDifference: 0.2,
        TraditionalDifference: "10",
        PercentileDifference: "20"
    };

    it('renders component with correct state', async () => {
        render(<MatchupSlider {...defaultProps}/>)

        const field1 = await screen.findByText('3-Point Field Goals');
        expect(field1).toBeInTheDocument();

        const field2 = await screen.findByText('Opponent 3-Point Field Goals');
        expect(field2).toBeInTheDocument();

        const teamStat1 = await screen.findByText('Team Stat: 50');
        expect(teamStat1).toBeInTheDocument();

        const teamStat2 = await screen.findByText('Team Stat: 60');
        expect(teamStat2).toBeInTheDocument();

        const average1 = await screen.findByText('League Average: 55');
        expect(average1).toBeInTheDocument();

        const average2 = await screen.findByText('League Average: 65');
        expect(average2).toBeInTheDocument();
        // expect(screen.getByText('Field 1')).toBeInTheDocument();
        // expect(screen.getByText('Field 2')).toBeInTheDocument();
        // expect(screen.getByText('Team Stat: 50')).toBeInTheDocument(); // Assuming initial team stats are 50
        // expect(screen.getByText('Team Stat: 60')).toBeInTheDocument(); // Assuming initial team stats are 60
        // expect(screen.getByText('League Average: 55')).toBeInTheDocument();
        // expect(screen.getByText('League Average: 65')).toBeInTheDocument();
    })
})