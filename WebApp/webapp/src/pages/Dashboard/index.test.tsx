import renderer from 'react-test-renderer'
import Dashboard from '.'
import { BrowserRouter } from 'react-router-dom'


it('Dashboard renders', () => {
    const component = renderer.create(
        <BrowserRouter>
            <Dashboard/>
        </BrowserRouter>,
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})