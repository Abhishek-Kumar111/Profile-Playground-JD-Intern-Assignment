import './App.css'
import Header from './Components/Header/header'
import {Route,Routes} from 'react-router-dom';
import Home from './Pages/Home/home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Footer from './Components/Footer/footer';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
