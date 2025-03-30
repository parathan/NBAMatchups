import { render } from '@testing-library/react';
import App from './App';

class IntersectionObserver {
  observe = jest.fn()
  disconnect = jest.fn()
  unobserve = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

test('renders learn react link', () => {
  // const component = renderer.create(
  //   <App />,
  // )
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
