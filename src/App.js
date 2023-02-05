import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import { Menu } from './components/Menu';
import { About } from './components/About';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';

function App() {

  return (
    <BrowserRouter basename='/Quext-Web'>
      <Routes>
        <Route 
          path='/home' 
          element={
            <>
              <Menu/>
              <Home/>
            </>
          }
        />
        <Route 
          path='/about' 
          element={
            <>
              <Menu/>
              <About/>
              <Home/>
            </>
          }
        />
        <Route 
          path='/' 
          element={
            <>
              <SignIn/>
            </>
          }
        />
        <Route 
          path='/signup' 
          element={
            <>
              <SignUp/>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
