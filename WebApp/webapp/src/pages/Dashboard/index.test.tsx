// import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import Dashboard from '.'
import { BrowserRouter } from 'react-router-dom'

jest.mock('react-chartjs-2', () => ({ Line: () => null }))

describe('Dashboard Component', () => {
    it('Dashboard renders', () => {
        render(
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
        )
        // const component = renderer.create(
        //     <BrowserRouter>
        //         <Dashboard/>
        //     </BrowserRouter>,
        // )
        // let tree = component.toJSON();
        // expect(tree).toMatchSnapshot();
    })
})
