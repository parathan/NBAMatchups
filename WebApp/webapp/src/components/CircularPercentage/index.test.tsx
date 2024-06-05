import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CircularPercentage from '.';

describe('MatchupSlider', () => {
    const percentage = 53

    it('renders component with correct state', async () => {
        render(<CircularPercentage percentage={percentage}/>)
    })
})