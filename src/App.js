import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import { Menu } from './components/Menu';
import { Language } from './components/Language';
import { Account } from './components/Account';
import { About } from './components/About';
import { TranslatorProvider, useTranslate } from "react-translate"

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
