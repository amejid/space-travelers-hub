import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import missionsReducer from './missions/missions';
import rocketsReducer from './rockets/rockets';

const rootReducer = combineReducers({
  rockets: rocketsReducer,
  missions: missionsReducer,
});
const store = configureStore({ reducer: rootReducer }, applyMiddleware(logger));

// for performing test
export const setupStore = (preloadedState) => configureStore({ reducer: rootReducer },
  applyMiddleware(logger),
  preloadedState);

export default store;
