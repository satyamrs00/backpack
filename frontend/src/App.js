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
import ProductDetails from './components/ProductDetails';
import { AuthProvider } from "./context/AuthContext";
import Home from './components/Home';
import { ProductProvider } from './context/ProductContext';

function App() {
  const myStyle = {
    background: 'rgb(5 182 195)'
  }

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div style={{ ...myStyle, minHeight: '100vh', padding: "1rem 0" }}>
            {/* <ProductProvider> */}
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/product' element={<Product />} />
                <Route exact path='/product/details' element={<ProductDetails />} />
              </Routes>
            {/* </ProductProvider> */}
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
