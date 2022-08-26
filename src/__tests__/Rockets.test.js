import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userEvent from '@testing-library/user-event';
import missionsReducer from '../redux/missions/missions';
import rocketsReducer from '../redux/rockets/rockets';
import Rockets from '../components/rockets/Rockets';

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

describe('Rockets Component', () => {
  it('renders Rocket with name Fast Rocket', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const nameElement = screen.getByText('Fast Rocket');
    expect(nameElement).toBeInTheDocument();
  });

  it('renders "Reserved" badge if the button was clicked', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    const outputElement = screen.getByText('Reserved');
    expect(outputElement).toBeInTheDocument();
  });

  it('changes button text from Cancel Reservation to Reserve Rocket', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    const outputElement = screen.queryByText('Cancel Reservation');
    expect(outputElement).not.toBeInTheDocument();
  });
});
