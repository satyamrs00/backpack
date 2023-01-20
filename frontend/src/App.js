import { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Product from './components/Product';
import Navbar from './components/Navbar';
import ProductDetails from './components/ProductDetails';
import Home from './components/Home';
import Pagenotfound from './components/Pagenotfound';
import LendBook from './components/LendBook';
import ContactUs from './components/ContactUs';
import Profile from './components/Profile';
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from './context/ProductContext';
import { ThemeProvider } from './context/ThemeContext';
import Transaction from './components/Transaction';

function App() {
  const [appTheme, setAppTheme] = useState('light')
  const toggleAppTheme = () => {
    if (appTheme === 'light') { setAppTheme('dark') }
    else setAppTheme('light')
  }
  const [myStyle, setMyStyle] = useState({ background: 'rgb(5 182 195)' })

  useEffect(() => {
    if (appTheme === 'dark') { setMyStyle({ background: '#050505' }) }
    else { setMyStyle({ background: 'rgb(5 182 195)' }) }
  }, [appTheme])

  
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <ProductProvider>
              <Navbar theme={toggleAppTheme}/>
              <div style={{ ...myStyle,minHeight:`calc(${window.screen.height}px - 9rem - 5.6vw)`, padding: "1rem 0 0 0" }}>
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/product' element={<Product />} />
                  <Route exact path='/product/details' element={<ProductDetails />} />
                  <Route exact path='/lendbook' element={<LendBook />} />
                  <Route exact path='/contactus' element={<ContactUs />} />
                  <Route exact path='/profile' element={<Profile />} />
                  <Route exact path='/transaction' element={<Transaction />} />
                  <Route exact path='*' element={<Pagenotfound />} />
                </Routes>
              </div>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
