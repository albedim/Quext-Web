import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Language = () => {

  const [languages, setLanguages] = useState({})

  const [language, setLanguage] = useState(null);

  const navigate = useNavigate();

  const getLanguages = async () => {
    await axios.get('https://albedim.pythonanywhere.com/api/v_1_1_5/language/get')
    .then((response) => {
      setLanguages(response.data);
      console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    getLanguages()
  },[])

  const changePage = () => {
    if(language != null){
      window.localStorage.setItem('language', language);
      navigate("/home");
    }
  }

  return(
    <div className="width-full height-800 display-flex space-around align-center">
      <div className="height-210 width-240">
        <div className="display-flex space-around align-center height-110">
          <select onChange={(e) => setLanguage(e.target.value)} className="width-140 height-40 border-radius-5 border-none" name="" id="">
            {
              Object.keys(languages).map((key, i) => (
                <option className="width-140 height-40 border-radius-5 border-none" value={languages[key]}>{key}</option>
              ))
            }
          </select>
        </div>
        <div className="display-flex space-around align-center height-110">
          <button onClick={(e) => changePage(e)} className="purple-background font-weight-500 white-color border-radius-5 border-none height-40 width-110">Next</button>
        </div>
      </div>
    </div>
  );
}