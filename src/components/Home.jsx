import React, { useCallback, useEffect, useRef, useState} from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { SpinnerCircular } from "spinners-react";
import axios from 'axios'
import { animated } from 'react-spring';
import Webcam from "react-webcam";
import './styles/styles.css';
import './styles/pattern.css';
import { IonIcon } from "react-ion-icon";
import Tesseract from "tesseract.js";

export default function Home(){

    const webcamRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const [file, setFile] = useState(null)

    const [summary, setSummary] = useState(null) // Contains the recognized user

    /*
    const sendData = async (image) => {
      setSummary(null)
      setIsLoading(true);
      await axios.post('http://192.168.1.10:5000/api/v_1_1_5/summary/image/get', {
          'encodedImage': image.toString().substring(23),
          'language': window.localStorage.getItem('language'),
          'API_KEY': 'PCYBL4TYfnVXeDhFZYvT'
      })
      .then(response => {
        setIsLoading(false);
        if(response.data.success){
          setSummary(response.data.param);
        }
        setFile(null)
      })
      .catch(error => {
        console.log(error) 
      })
    }
    */

    const sendTextData = async (text) => {
      setSummary(null);
      setIsLoading(true);
      await axios.post('https://albedim.pythonanywhere.com/api/v_1_1_5/summary/text/get', {
          'text': text,
          'language': window.localStorage.getItem('language').substring(0,window.localStorage.getItem('language').length - 1),
          'API_KEY': 'PCYBL4TYfnVXeDhFZYvT'
      })
      .then(response => {
        console.log(response.data)
        setIsLoading(false);
        if(response.data.success){
          setSummary(response.data.param);
        }
        setFile(null);
      })
      .catch(error => {
        console.log(error) 
      })
    }

    const takeFile = (e) => {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setFile({
        'name': e.target.files[0].name,
        'size': e.target.files[0].size
      })
      reader.onload = function () {
        setIsLoading(true);
        // sendData(reader.result);
        toText(e.target.files[0])
        startAnimation();
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
    }

    const startAnimation = () => {
      document.querySelector('.sl').style.width = "224px";
      document.querySelector('.sl').style.transition = "60s";
    }

    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const speak = () => {
      const msg = new SpeechSynthesisUtterance()
      msg.text = summary
      window.speechSynthesis.speak(msg)
    }

    const toText = async (image) => {
      await Tesseract.recognize(image, window.localStorage.getItem('language'), { 
          logger: m => console.log() 
        }
      )
      .then(({data: {text} }) => {
        sendTextData(text)
      })
    }
  
    return (
      <div className="overflow-y-scroll display-flex space-around width-full height-848">
        <div className="overflow-y-scroll mobile-container align-center display-flex space-around height-auto width-1200">
          <div className="width-500 display-flex space-around align-center upload">

            <div className="upload-field">
              <div className="icon-field"><span className="fa fa-file-o"></span>
                <p>Drag your files here</p>
              </div>
            </div>
            
            <div className="border-radius-10 upload-status">
              <div className="margin-left-34 width-240 margin-top-24"><h1>SCAN</h1></div>
              <div className="margin-left-34 width-240 height-80 height-124 margin-top-40">
              {
                file != null ? (
                  <div className="file">
                    <div className="file-description">
                      <div className="file-name">{file.name.substring(0,14) + '...'}</div>
                      <div className="file-size">{(file.size / 1000000).toString().substring(0,3)}MB</div>
                    </div>
                    <div className="file-status">
                      <div className="status-field">
                        <div className="sl status-line"></div>
                      </div>
                    </div>
                  </div>
                ):(
                  <span>No files found</span>
                )
              }
              </div>
              <div className="margin-left-34 width-240 height-60 display-flex space-around align-center">
                { isLoading ? (
                  <div onClick={(e) => e.preventDefault()} className="gray-background border-radius-10 height-40 width-140">
                    <input className="visibility-hidden height-40 width-140 purple-color" id="upload-field" accept={".jpeg, .png, .jpg"} type="file"/>
                    <span className="white-color font-family font-weight-500 position-absolute margin-top-10 margin-left-50">SCAN</span>
                  </div>
                ):(
                  <div className="hover purple-background border-radius-10 height-40 width-140">
                    <input className="visibility-hidden height-40 width-140 purple-color" id="upload-field"  onChange={(e) => takeFile(e)} accept={".jpeg, .png, .jpg"} type="file"/>
                    <span className="white-color font-family font-weight-500 position-absolute margin-top-10 margin-left-50">SCAN</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mobile-summary display-flex space-around align-center height-560 width-540">
            <div className="white-background summary-box border-radius-10 height-484 width-430">
              <div className="display-flex space-around align-center height-60">
                <span className="font-family font-weight-600 font-size-18">SUMMARY</span>
              </div>
              <div className="display-flex space-around align-center height-348">
                <div className="summary overflow-y-scroll height-314 width-314">
                  {summary != null ? (          
                    <span>{summary}</span>
                  ):(
                    <div className='height-140 display-flex align-center space-around'>
                      <div className='width-180 display-flex align-center'>
                        <div><img className='width-80' src="./coffe.png" alt="" /></div>
                        <div className='margin-left-14'><h2 className='font-family font-weight-400 font-size-16'>Nothing found here</h2></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {summary != null ? (
                <div onClick={(e) => speak(e)} className="display-flex space-around align-center height-74">
                  <div className="hover purple-color font-size-24"><IonIcon name="mic"/></div>
                </div>
              ):(
                <div className="display-flex space-around align-center height-74">
                  <div className="gray-color font-size-24"><IonIcon name="mic"/></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };