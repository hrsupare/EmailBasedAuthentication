import './App.css';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './PrivateComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/*' element={<Register />} />
          <Route element={<PrivateComponent />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
