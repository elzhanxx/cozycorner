import React from 'react';
import './Footer.scss'

import logoImg from '../../assets/images/Logo.png';
import {useTranslation} from "react-i18next";
const Footer = () => {
    const {t, i18n} = useTranslation()
    const changeLanguage = (language) =>{
        i18n.changeLanguage(language)
    }
  return(
      <footer className="footer bg-[#f7f3ec]">
          <div className="container">
              <div className=" p-10 flex justify-between text-sm">
                  <div className="flex items-center" style={{width: 320}}>
                      <div>
                          <img src={logoImg} alt="Cozy Corner Logo" className="h-58 w-196 mb-3" />
                          <p className="text-gray-700 w-264">
                              {t("ourDescription")}
                          </p>
                          <div className="text-xs" style={{marginTop: 39}}>
                              <p>{t("design")}</p>
                          </div>
                      </div>
                  </div>
                  <div>
                      <h2 className="text-lg font-semibold ">{t("contacts")}</h2>
                      <p className="text-gray-700">
                          {t("ourAddress")}<br/>
                          8 800 000 00 00<br/>
                          cozycorner@gmail.com
                      </p>
                  </div>

              </div>
          </div>
      </footer>

  );
};

export default Footer;
