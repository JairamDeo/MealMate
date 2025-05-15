import { Suspense, lazy } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { CartProvider } from './components/ContextReduce';

const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./screens/Home'));
const LogIn = lazy(() => import('./screens/LogIn'));
const Signup = lazy(() => import('./screens/Signup'));
const MyOrder = lazy(() => import('./screens/MyOrder'));

function App() {
  return (
    <CartProvider>
      <Router>
        <Suspense fallback={<div className="text-center text-lg p-4">Loading...</div>}>
          <div>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<LogIn />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/myorder' element={<MyOrder />} />
            </Routes>
            <Footer />
          </div>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;