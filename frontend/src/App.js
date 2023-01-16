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

function App() {
  const myStyle = {
    background: 'rgb(5 182 195)'
  }

  return (
    <>
      <BrowserRouter>
          <AuthProvider>
            <ProductProvider>
              <Navbar />
              <div style={{ ...myStyle, minHeight: '100vh', padding: "1rem 0 0 0" }}>
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/product' element={<Product />} />
                  <Route exact path='/product/details' element={<ProductDetails />} />
                  <Route exact path='/lendbook' element={<LendBook />} />
                  <Route exact path='/contactus' element={<ContactUs />} />
                  <Route exact path='/profile' element={<Profile />} />
                  <Route exact path='*' element={<Pagenotfound />} />
                </Routes>
              </div>
            </ProductProvider>
          </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
