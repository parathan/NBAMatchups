import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer'

test('renders learn react link', () => {
  const component = renderer.create(
    <App />,
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
