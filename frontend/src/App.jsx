import { Suspense, lazy } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { CartProvider } from './components/ContextReduce';

// Lazy loading components
const Home = lazy(() => import('./screens/Home'));
const LogIn = lazy(() => import('./screens/LogIn'));
const Signup = lazy(() => import('./screens/Signup'));
const MyOrder = lazy(() => import('./screens/MyOrder'));

function App() {
  return (
    <CartProvider>
      <Router>
        <Suspense fallback={<div className="text-center text-lg p-4">Loading...</div>}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<LogIn />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/myorder' element={<MyOrder />} />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;