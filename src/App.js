import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
import Home from './Components/Home/Home';
import Navbar from './Components/Shared/Navbar';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
