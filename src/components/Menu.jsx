import axios from 'axios';
import { useEffect, useState } from 'react';
import { IonIcon } from 'react-ion-icon';
import { useNavigate } from 'react-router-dom';
import { API } from '../utils.ts';
import './styles/styles.css';

export const Menu = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({});

  const quit = () => {
    if(!window.localStorage.getItem('id')){
      navigate("/");
    }
  }

  const getData = async () => {
    await axios.get(API + '/user/get/' + window.localStorage.getItem('id'))
    .then(response => {
      setData(response.data);
      console.log(response.data)
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    quit();
    getData();
  })

  const logout = () => {
    window.localStorage.removeItem("id");
    navigate("/");
  }

  return(
    <div className='height-100'>
      <div className="display-flex space-between purple-opacity width-full height-60">
        <div className='width-90 display-flex space-around align-center'><div className='hover font-size-24 purple-color' onClick={(e) => navigate("/about")}><IonIcon name='information-circle'/></div></div>
        <div className='display-flex space-around align-center width-140'><img className='width-60' src="icon.png" alt="" /></div>
        <div className='width-124 display-flex space-around align-center'>
          <span className='purple-color font-weight-500 font-family'>{data.username}</span>
          <div className='hover font-size-24 purple-color' onClick={(e) => logout()}><IonIcon name='exit'/></div></div>
      </div>
      <a href="https://streamlabs.com/albedim/tip">
        <div className='hover display-flex space-around align-center green-background height-40'>
          <span className='green-color font-family font-weight-400'>Supportaci per migliorare questo progetto!</span>
        </div>
      </a>
    </div>
  );
}