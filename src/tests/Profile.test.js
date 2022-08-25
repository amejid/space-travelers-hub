import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userEvent from '@testing-library/user-event';
import missionsReducer from '../redux/missions/missions';
import rocketsReducer from '../redux/rockets/rockets';
import Rockets from '../components/rockets/Rockets';
import Profile from '../components/profile/Profile';

const initialState = {
  rockets: [
    {
      id: 1,
      name: 'Fast Rocket',
      description: 'It is really fast',
      image: '',
      reserved: false,
    },
  ],
  missions: [],
};

const rootReducer = combineReducers({
  rockets: rocketsReducer,
  missions: missionsReducer,
});

const store = configureStore(
  { reducer: rootReducer, preloadedState: initialState },
  applyMiddleware(logger),
);

describe('Profile Component', () => {
  it('adds rocket name to profile', () => {
    render(
      <Provider store={store}>
        <Rockets />
        <Profile />
      </Provider>,
    );

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    const outputElement = screen.queryAllByText('Fast Rocket');
    expect(outputElement).toHaveLength(2);
  });
});
