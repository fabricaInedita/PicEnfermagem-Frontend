import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import Theme from './components/Theme';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer/>
          <Theme>
            <Routes/>
          </Theme>
      </AuthProvider>
    </Router>
  );
}

export default App;
