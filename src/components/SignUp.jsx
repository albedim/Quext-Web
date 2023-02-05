import './styles/pattern.css';
import './styles/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {IonIcon} from "react-ion-icon";
import { emailValider, API, formValider } from '../utils.ts';
import { SpinnerCircular } from 'spinners-react';
import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 13/01/23
 * Created at: 17:14
 * Version: 1.0.0
 * Description: SignUp Component
 */

export const SignUp = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [languages, setLanguages] = useState({});

  const [language, setLanguage] = useState("eng");

  const [data, setData] = useState({
    'username': null,
    'name': null,
    'email': null,
    'password': null,
    'language': language,
    'API_KEY': 'PCYBL4TYfnVXeDhFZYvT'
  });

  const navigate = useNavigate();

  const getLanguages = async () => {
    await axios.get('https://albedim.pythonanywhere.com/api/v_1_1_5/language/get')
    .then((response) => {
      setLanguages(response.data);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    getLanguages();
  },[])


  const signup = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(data);
    await axios.post(API + '/user/signup', data)
    .then((response) => {
      if(response.data.success)
        navigate("/");
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
    <div className='border-radius-10 white-background height-510 white-backgroundcolor width-350'>
      <div className='display-flex height-90 space-around align-center'><h2 className='font-weight-700 font-family'>SIGN UP</h2></div>
      <div className='display-flex space-around height-300'>
        <form action="post">
          <div className='width-240 height-34 margin-top-10 border-bottom-smaller'>
            <span className='margin-left-10 position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='person-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="text" id='name' className='margin-left-40 height-28 outline-none border-none' placeholder='Name'/>
          </div>
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10 position-absolute margin-top-8 font-size-medium'>
            <IonIcon name='person-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="text" id='username' className='margin-left-40 height-28 outline-none border-none' placeholder='Username'/>
          </div>
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10 position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='mail-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="text" id='email' className='margin-left-40 height-28 outline-none border-none' placeholder='Email'/>
          </div>
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10 position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='globe-outline'></IonIcon>
            </span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="margin-left-40 width-184 height-24 border-radius-5 border-none" name="" id="">
            {
              Object.keys(languages).map((key, i) => (
                <option className="width-140 height-40 border-radius-5 border-none" value={languages[key]}>{key}</option>
              ))
            }
            </select>
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
          formValider(data.username) && formValider(data.name) && emailValider(data.email) && formValider(data.password) ? (
            !isLoading ? (
              <button onClick={(e) => signup(e)} className='purple-background white-color width-200 font-weight-700 font-size-medium white-color border-none button border-radius-5 height-50'>SIGN UP</button>
            ):(
              <>
                <SpinnerCircular className='position-absolute' size={20} color='purple' thickness={200} secondaryColor={'white'} />
                <button className='purple-opacity width-200 font-weight-700 font-size-14 white-color border-none button-clicked border-radius-5 height-50'></button>
              </>
            )
          ):(
            <button className='purple-opacity white-color width-200 font-weight-700 opacity-40 font-size-medium white-color border-none button border-radius-5 height-50'>SIGN UP</button>
          )
        }
      </div>
    </div>
    </div>
  );

}