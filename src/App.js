import { Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Missions from './routes/Missions';
import Profile from './routes/Profile';
import Rockets from './routes/Rockets';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Rockets />} />
      <Route path="/missions" element={<Missions />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </>
);

export default App;
