import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './containers/Navbar';
import Questionary from './pages/Questionary';
import Login from './pages/Login';
import Singup from './pages/Singup';
import {AuthProvider} from './context/AuthContext';

function App() {
  return (
    
        <Router>
          
          <AuthProvider>
                <Navbar/>
                <div className="w-full h-full flex justify-center items-center">
                  <Routes>
                    <Route path="login" element={<Login/>} />
                    <Route path="singup" element={<Singup/>} />
                    <Route path="home" element={<Home/>} />
                    <Route path="questionary" element={<Questionary/>} />
                    <Route path="ranking" element={<Home/>} />
                    <Route path="" element={<Home/>} />
                  </Routes>
                </div>
          </AuthProvider>

        </Router>
        
  );
}

export default App;
