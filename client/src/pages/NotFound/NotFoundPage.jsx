import React from 'react';
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const NotFoundPage = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
      <div className="px-2 pt-40">
        <div className="text-center">
          <p className="text-base font-semibold text-black">404</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black sm:text-5xl">
            {t('notFoundTitle')}
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            {t('notFoundDescription')}
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-3">
            <Link to="/">
              <button className="rounded-[10px] bg-gray-900 p-2 px-20 hover:bg-gray-700">
                <span className="font-semibold text-white">{t('backToHome')}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default NotFoundPage;
