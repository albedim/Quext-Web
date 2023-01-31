import { useEffect } from 'react';
import { IonIcon } from 'react-ion-icon';
import { useNavigate } from 'react-router-dom';
import './styles/styles.css';

export const Menu = () => {

  const navigate = useNavigate();

  const quit = () => {
    if(!window.localStorage.getItem('language')){
      navigate("/");
    }
  }

  useEffect(() => {
    quit();
  })

  return(
    <div className='border-smaller height-130'>
      <div className="display-flex space-between purple-background width-full height-60">
        <div className='width-140 display-flex space-around align-center'><div className='hover font-size-24 white-color' onClick={(e) => navigate("/about")}><IonIcon name='information-circle'/></div></div>
        <div className='width-140 display-flex space-around align-center'><div className='hover font-size-24 white-color' onClick={(e) => navigate("/account")}><IonIcon name='person'/></div></div>
      </div>
      <div className='display-flex space-around align-center red-background height-30'>
        <span className='red-color font-family font-weight-400'>Not working on iPhone? We are fixing that!</span>
      </div>
      <a href="https://www.paypal.com/paypalme/albedim">
        <div className='hover display-flex space-around align-center yellow-background height-40'>
          <span className='yellow-color font-family font-weight-400'>Donate to support this project!</span>
        </div>
      </a>
    </div>
  );
}