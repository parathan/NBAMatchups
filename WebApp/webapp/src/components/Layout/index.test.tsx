import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout', () => {
    it('renders layout with navbar and children', () => {
        render(
            <MemoryRouter>
                <Layout>
                    <div>Child Component</div>
                </Layout>
            </MemoryRouter>
        )

        const navbarElement = screen.getByTestId('navbar');
        expect(navbarElement).toBeInTheDocument();

        const childElement = screen.getByTestId('child');
        expect(childElement).toBeInTheDocument();
    })
})