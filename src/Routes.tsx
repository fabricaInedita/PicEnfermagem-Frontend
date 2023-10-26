
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './containers/Navbar';
import Questionary from './pages/Questionary';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Ranking from './pages/Ranking';
import ConfirmEmail from './pages/ConfirmEmail';
import ChangePassword from './pages/ChangePassword';
import RequireChangePassword from './pages/RequireChangePassword'
import { Fragment, useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function AppRoutes() {

  const {isAuthenticated} = useContext(AuthContext)

  return (
    <Fragment>
      {
        isAuthenticated?
        <div className="w-full h-full flex justify-center items-center">
          <Navbar/>
          <Routes>
              <Route path="home" element={<Home/>} />
              <Route path="questionary" element={<Questionary/>} />
              <Route path="ranking" element={<Ranking/>} />
              <Route path="" element={<Home/>} />
          </Routes>              
        </div>
        :
        <div className="w-full h-full flex justify-center items-center">
          <Routes>
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
            <Route path="confirm-email" element={<ConfirmEmail/>} />         
            <Route path="change-password" element={<ChangePassword/>} />
            <Route path="require-change-password" element={<RequireChangePassword/>} />      
          </Routes>
        </div>
      }
    </Fragment>
  )
}

export default AppRoutes