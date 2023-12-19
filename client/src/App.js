import './App.css';
import Header from './components/Header';
import {BrowserRouter , Route, Link, Routes} from 'react-router-dom';
import Home from './screens/Home';
import Booking from './screens/Booking';
import Register from './screens/Register';
import Loginscreen from './screens/Loginscreen';
import ProfileScreen from './screens/ProfileScreen';
import LandingScreen from './screens/LandingScreen'
function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <Routes>
      <Route path="/home"  element ={<Home />} />
      <Route path="/book/:roomid/:fromdate/:todate/" element={<Booking/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Loginscreen/>}/>
      <Route path="/profile" element = { <ProfileScreen />}/>
      <Route path="/" element = { <LandingScreen />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
