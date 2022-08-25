import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { setupStore } from '../redux/configureStore';
import Missions from '../components/missions/missions';

const handlers = [
  rest.get('https://api.spacexdata.com/v3/missions', (req, res, ctx) => res(ctx.json(
    {
      id: 1,
      name: 'My mission',
      description: 'Moving to sky',
      reserved: false,
    },
  ), ctx.delay(150))),
];

export default handlers;
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithRedux(
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderMissions
  } = {},
) {
  const Wrapper = () => (
    <Provider store={store}>
      <Missions />
    </Provider>
  );
  return { store, ...render(ui, { wrapper: Wrapper, ...renderMissions }) };
}

describe('Testing for Mission components', () => {
  test('fetches missions data from external API', async () => {
    renderWithRedux(<Missions />);
    expect(screen.queryByText(/Missions\.\./i)).not.toBeInTheDocument();
  });
});

//  Integrated testing for redux actions, reducers and redux thunk
// first creat a middleware function
const thunkMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
};

// The invoke function runs our middleware in the same way Redux does.
const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => thunkMiddleware(store)(next)(action);

  return { store, next, invoke };
};

//   perform test
describe('testing for Middleware', () => {
  test('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'GET_MISSIONS_SUCCESS' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test('calls the function', () => {
    const { invoke } = create();
    const fn = jest.fn();
    invoke(fn);
    expect(fn).toHaveBeenCalled();
  });

  test('passes dispatch and getState', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch('TEST DISPATCH');
      getState();
    });
    expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
    expect(store.getState).toHaveBeenCalled();
  });
});
