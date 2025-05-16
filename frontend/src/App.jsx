import { Suspense, lazy } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { CartProvider } from './components/ContextReduce';

// ✅ Directly import Navbar and Footer
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ✅ Keep screens lazy-loaded
const Home = lazy(() => import('./screens/Home'));
const LogIn = lazy(() => import('./screens/LogIn'));
const Signup = lazy(() => import('./screens/Signup'));
const MyOrder = lazy(() => import('./screens/MyOrder'));

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<div className="text-center text-lg p-4">Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/myorder' element={<MyOrder />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;