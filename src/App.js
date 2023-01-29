import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import { Menu } from './components/Menu';
import { Language } from './components/Language';
import { Account } from './components/Account';

function App() {
  return (
    <BrowserRouter>
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
          path='/account' 
          element={
            <>
              <Menu/>
              <Account/>
              <Home/>
            </>
          }
        />
        <Route 
          path='/' 
          element={
            <>
              <Language/>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
