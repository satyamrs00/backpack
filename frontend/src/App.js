import './App.css';
import './styles.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Hero from './components/Hero';


function App() {
  const myStyle = {
    background: 'rgb(5 182 195)'
  }

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <div style={{ ...myStyle,minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Routes>
          <Route exact path='/' element={<Hero />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/product' element={<Product/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
