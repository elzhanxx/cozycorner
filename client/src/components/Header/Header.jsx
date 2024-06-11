import React from 'react';
import { Link } from 'react-router-dom';
import {
    MAIN_PAGE_ROUTE, PROFILE_PLACES_PAGE,
    PROFILE_START_PAGE,
    SIGN_IN_PAGE_ROUTE,
    SIGN_UP_PAGE_ROUTE,
    START_PAGE
} from '@/utils/routes.js';
import logoImg from '../../assets/images/Logo.png';
import profileImg from '../../assets/images/profileLogo.svg';
import './Header.scss';
import { useAuth } from '../../../hooks/index.js';
import {useTranslation} from "react-i18next";

const Header = () => {
    const auth = useAuth();
    const {t, i18n} = useTranslation()
    const changeLanguage = (language) =>{
        i18n.changeLanguage(language)
    }
    return (
        <header className="flex justify-between items-center bg-white shadow-md">
            <div className="container flex justify-between items-center bg-white p-5">
                <Link to={START_PAGE} className="text-2xl font-bold"><img src={logoImg} alt="Logo" /></Link>
                <div className="flex space-x-2 ml-auto mr-10">
                    <button onClick={() => changeLanguage("en")} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">EN</button>
                    <button onClick={() => changeLanguage("ru")} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">RU</button>
                    <button onClick={() => changeLanguage("kk")} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300">KK</button>
                </div>
                <div className="flex space-x-4">
                    {auth.user ? (
                        <div className="active-profile-container">
                            <Link to={PROFILE_START_PAGE}><img src={profileImg} className="profile-img img-active" alt="Profile img" /></Link>
                            <Link to={PROFILE_PLACES_PAGE} className="px-4 py-2 bg-red-500 text-white rounded">{t("to rent")}</Link>
                        </div>
                    ) : (
                        <div>
                            <Link to={SIGN_IN_PAGE_ROUTE} className="px-4 py-2 bg-gray-200 rounded">{t("signIn")}</Link>
                            <Link to={SIGN_UP_PAGE_ROUTE} className="px-4 py-2 bg-gray-200 rounded" style={{marginLeft: 15}}>{t("signUp")}</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
