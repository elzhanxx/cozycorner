import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {MAIN_PAGE_ROUTE, SIGN_UP_PAGE_ROUTE, START_PAGE} from '@/utils/routes.js';
import { loginUser } from '@/HTTP/User.js';
import { setItemsInLocalStorage } from '@/utils/index.js';
import { useAuth, useProvideAuth } from '../../../hooks/index.js';
import {useTranslation} from "react-i18next";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
  const navigate = useNavigate();
  const auth = useAuth();
  const { user, setUser } = useProvideAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password)
        .then((response) => {
          setItemsInLocalStorage('token', response.data.token);
          setItemsInLocalStorage('role', response.data.user.role);
          auth.setUser(response.data.token);
          setUser(response.data.token)
          toast.success('Вход успешен');
          navigate(START_PAGE);
        })
        .catch((error) => {
          console.error('Error logging in user', error);
          toast.error('Ошибка входа');
        });
  };

  return (
      <div className="mt-12 flex grow items-center justify-around p-4 md:p-0">
        <div className="mb-40">
          <h1 className="mb-4 text-center text-4xl">{t("signingIn")}</h1>
          <div className="mx-auto max-w-md">
            <input
                name="email"
                type="email"
                placeholder={t("yourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                name="password"
                type="password"
                placeholder={t("yourPassword")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="custom-btn" onClick={handleLogin}>
                {t("signIn")}
            </button>
          </div>

          <div className="mb-4 flex w-full items-center gap-5">
            <div className="h-0 w-1/2 border-[1px]"></div>
            <p className="small -mt-1">{t("or")}</p>
            <div className="h-0 w-1/2 border-[1px]"></div>
          </div>

          <div className="py-2 text-center text-gray-500">
              {t("noAccountYet")}{' '}
            <Link className="text-black underline" to={SIGN_UP_PAGE_ROUTE}>
                {t("signUp")}
            </Link>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
