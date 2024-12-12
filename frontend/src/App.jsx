import { useState } from 'react'
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import LogIn from './screens/LogIn';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReduce';
import MyOrder from './screens/MyOrder';


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<LogIn />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path="/myorder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;


