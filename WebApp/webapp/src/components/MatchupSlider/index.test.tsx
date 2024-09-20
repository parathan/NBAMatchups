import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MatchupSlider from '.';
import { MatchupData } from '../../interfaces/MatchupData';
import { MemoryRouter } from 'react-router-dom';

describe('MatchupSlider Component', () => {
  const mockProps: MatchupData = {
    team1_percentile: 0.7,
    team2_op_percentile: 0.5,
    percentile_difference: 0.2,
    field1: 'fg',
    field2: 'opp_fg',
    team1_trad: 30,
    team2_op_trad: 25,
    trad_difference: 5,
    mean1: 50,
    mean2: 45,
    abs_percentile_difference: 0.2,
  };

  test('renders correctly with given props', async () => {
    render(
      <MemoryRouter>
        <MatchupSlider {...mockProps} />
      </MemoryRouter>
    );

    // Check that the field names are displayed
    expect(screen.getByText('Opponent Field Goals vs Field Goals')).toBeInTheDocument();

    // Check that the team stats and league averages are displayed
    expect(screen.getByText('Team Stat: 30')).toBeInTheDocument();
    expect(screen.getByText('League Avg: 50')).toBeInTheDocument();
    expect(screen.getByText('Team Stat: 25')).toBeInTheDocument();
    expect(screen.getByText('League Avg: 45')).toBeInTheDocument();
  });
})