import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import ReduxMissions from './components/missions/ReduxMissions';
import Profile from './components/profile/Profile';
import store from './redux/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/missions" element={<ReduxMissions />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
);
