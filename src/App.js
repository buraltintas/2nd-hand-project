import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ProductDetail from './pages/ProductDetail';
import PrivateRoutes from './router/PrivateRoutes';
import MyAccount from './pages/MyAccount';
import NewProduct from './pages/NewProduct';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/products/:id' element={<ProductDetail />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/myAccount' element={<MyAccount />} />
        <Route path='/newProduct' element={<NewProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
