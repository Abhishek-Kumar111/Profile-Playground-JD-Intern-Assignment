import './App.css'
import Header from './Components/Header/header'
import {Route,Routes,Navigate} from 'react-router-dom';
import Home from './Pages/Home/home';
import Footer from './Components/Footer/footer';

function App() {

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
