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
    <div className='height-100'>
      <div className="display-flex space-between purple-opacity width-full height-60">
        <div className='width-90 display-flex space-around align-center'><div className='hover font-size-24 purple-color' onClick={(e) => navigate("/about")}><IonIcon name='information-circle'/></div></div>
        <div className='display-flex space-around align-center width-140'><img className='width-60' src="icon.png" alt="" /></div>
        <div className='width-90 display-flex space-around align-center'><div className='hover font-size-24 purple-color' onClick={(e) => navigate("/account")}><IonIcon name='person'/></div></div>
      </div>
      <a href="https://www.paypal.com/paypalme/albedim">
        <div className='hover display-flex space-around align-center yellow-background height-40'>
          <span className='yellow-color font-family font-weight-400'>Supportaci per migliorare questo progetto!</span>
        </div>
      </a>
    </div>
  );
}