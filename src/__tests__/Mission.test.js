import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { rest } from 'msw';
import PropTypes from 'prop-types';
import { setupServer } from 'msw/node';
import { setupStore } from '../redux/configureStore';
import Missions from '../components/missions/Missions';
import MISSIONS_API from '../api/API';

const handlers = [
  rest.post(MISSIONS_API, (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');
    return res(ctx.status(200));
  }),

  rest.get(MISSIONS_API, (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated');
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'My Mission',
        description: 'Moving to sky',
        reserved: false,
      }),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithRedux(
  ui,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderMissions } = {},
) {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderMissions }) };
}

describe('Testing for Mission components', () => {
  test('Should not redner on DOM', async () => {
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
    const action = { type: 'GET_MISSIONS' };
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
