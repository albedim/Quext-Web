import './styles/pattern.css';
import './styles/styles.css';
import { useState } from 'react';
import axios from 'axios';
import { FORGET_PASSWORD_URL, API, formValider } from '../utils.ts';
import { SpinnerCircular } from 'spinners-react';
import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';
import { IonIcon } from 'react-ion-icon';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 13/01/23
 * Created at: 17:14
 * Version: 1.0.0
 * Description: SignIn Component
 */

export const SignIn = () => {

  const [data, setData] = useState({
    'email': null,
    'password': null,
    'API_KEY': 'PCYBL4TYfnVXeDhFZYvT'
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const signin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await axios.post(API + '/user/signin', data)
    .then((response) => {
      if(response.data.success){
        window.localStorage.setItem('id', response.data.param)
        navigate("/about");
      }
      // console.log(response.data);
    })
    .catch((error) => console.log(error))
    setIsLoading(false);
  }
  
  const handleData = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  return(
    <div className='page-background width-full height-1000 display-flex space-around align-center'>
    <div className='white-background height-410 white-backgroundcolor width-350'>
      <div className='display-flex height-90 space-around align-center'><h2 className='font-weight-700 font-family'>SIGN IN</h2></div>
      <div className='display-flex space-around height-150'>
        <form action="post">
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10 position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='person-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="text" id='email' className='margin-left-40 height-28 outline-none border-none' placeholder='Email'/>
          </div>
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10  position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='lock-closed-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="password" id='password' className='margin-left-40 height-28 outline-none border-none' placeholder='password'/>
          </div>
        </form>
      </div>
      <div className='display-flex align-center space-around height-100'>
        {
          formValider(data.email) && formValider(data.password) ? (
            !isLoading ? (
              <button onClick={(e) => signin(e)} className='hover purple-background white-color width-200 font-weight-700 font-size-14 border-none button border-radius-5 height-50'>SIGN IN</button>
            ):(
              <>
                <button className='purple-opacity width-200 font-weight-700 display-flex space-around align-center font-size-14 border-none button-clicked border-radius-5 height-50'>
                  <SpinnerCircular size={20} color='purple' thickness={200} secondaryColor={'white'} />
                </button>
              </>
            )
          ):(
            <button className='purple-opacity white-color width-200 opacity-40 font-weight-700 font-size-14 white-color border-none button border-radius-5 height-50'>SIGN IN</button>
          )
        }
      </div>
      <div><h5 onClick={(e) => navigate("/signup")} className='margin-left-60 gray-color font-weight-300 font-size-12'>Registrati</h5></div>
    </div>
    </div>
  );

}