import { useEffect } from 'react';
import { IonIcon } from 'react-ion-icon';
import { useNavigate } from 'react-router-dom';
import './styles/styles.css';

export const Menu = () => {

  const navigate = useNavigate();

  const quit = () => {
    if(window.localStorage.getItem('language') == null){
      navigate("/");
    }
  }

  useEffect(() => {
    quit();
  })

  return(
    <div className="display-flex space-between purple-background width-full height-60">
      <div className='width-140 display-flex space-around align-center'><div><span className='font-weight-500'>About</span><IonIcon name='information-circle'/></div></div>
      <div className='width-140 display-flex space-around align-center'><div onClick={(e) => navigate("/account")}><IonIcon name='person'/><span className='font-weight-500'>Account</span></div></div>
    </div>
  );
}