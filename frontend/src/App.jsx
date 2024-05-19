import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import {AppWrapper} from './pages/AppWrapper'
function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppWrapper/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
