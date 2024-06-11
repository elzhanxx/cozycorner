import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Loader2, Upload } from 'lucide-react';
import { useAuth, useProvideAuth } from '../../../hooks';
import './Profile.scss';
import { deleteUser, getUserInfo, logOut, updateUser } from '@/HTTP/User.js';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN_PAGE_ROUTE } from '@/utils/routes.js';
import { removeItemFromLocalStorage } from '@/utils/index.js';

import exitImg from '../../assets/images/exit-svgrepo-com.svg';
import deleteImg from '../../assets/images/delete-1-svgrepo-com.svg';
import Spinner from "@/components/AdditionalComponnets/Spinner.jsx";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const auth = useAuth();
  const uploadRef = useRef(null);
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    password: '',
    email: '',
    number: '',
    confirm_password: '',
  });
  const [curUser, setCurUser] = useState({
    picture: '',
    name: '',
    email: '',
    number: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  let navigator = useNavigate();
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const { setUser } = useProvideAuth();

  const handleImageClick = () => {
    if (isEditing) {
      uploadRef.current.click();
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (isEditing && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
  };

  const handlePictureChange = (e) => {
    if (isEditing) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUserData = (e) => {
    let { name, value } = e.target;

    if (name === 'number') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 18) {
        value = formatPhoneNumber(cleaned);
      } else {
        value = cleaned.slice(0, 18);
      }
    }

    if (name === 'name') {
      value = value.replace(/\d/g, '');
    }

    setUserData({ ...userData, [name]: value });
  };

  const formatPhoneNumber = (value) => {
    const match = value.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      let formattedValue = '';
      if (match[1]) {
        formattedValue += `+${match[1]}`;
      }
      if (match[2]) {
        formattedValue += ` (${match[2]}`;
      }
      if (match[3]) {
        formattedValue += `) ${match[3]}`;
      }
      if (match[4]) {
        formattedValue += `-${match[4]}`;
      }
      if (match[5]) {
        formattedValue += `-${match[5]}`;
      }
      return formattedValue;
    }
    return value;
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(number);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-zА-Яа-я]+(?: [A-Za-zА-Яа-я]+)*$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const { name, password, confirm_password, number, email } = userData;

    if (!validateName(name)) {
      setLoading(false);
      return toast.error('Имя не должно содержать символов, кроме букв');
    } else if (!validateEmail(email)) {
      setEmailError(true);
      setLoading(false);
      return toast.error('Введите корректный email');
    } else if (password !== confirm_password) {
      setPasswordMatchError(true);
      setLoading(false);
      return toast.error('Пароли не совпадают');
    }

    try {
      let updatedFields = {};
      if (name !== curUser.name) updatedFields.name = name;
      if (number !== curUser.number) updatedFields.number = number;
      if (email !== curUser.email) updatedFields.email = email;
      if (password) updatedFields.password = password;
      if (selectedFile) {
        updatedFields.picture = selectedFile;
      }

      const formData = new FormData();
      Object.keys(updatedFields).forEach((key) => {
        formData.append(key, updatedFields[key]);
      });

      await updateUser(formData)
          .then((response) => {
            setEmailError(false);
            setPasswordMatchError(false);
          })
          .catch((error) => {
            throw new Error('Error updating user');
          });

      const updatedUser = { ...curUser, ...updatedFields };
      if (selectedFile) {
        updatedUser.picture = URL.createObjectURL(selectedFile);
      }

      setCurUser(updatedUser);
      setUserData({ ...userData, password: '', confirm_password: '' });
      setLoading(false);
      toast.success('Данные обновлены!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Ошибка в обновлении данных!');
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    deleteUser()
        .then(() => {
          setUser('');
          auth.setUser('');
          removeItemFromLocalStorage('token');
          removeItemFromLocalStorage('user');
          removeItemFromLocalStorage('role');
          navigator(SIGN_IN_PAGE_ROUTE);
        })
        .catch((error) => {
          toast.error('Ошибка при удалении аккаунта!');
        });
  };

  const handleLogOutAccount = async () => {
    logOut()
        .then(() => {
          setUser('');
          auth.setUser('');
          removeItemFromLocalStorage('token');
          removeItemFromLocalStorage('user');
          removeItemFromLocalStorage('role');
          navigator(SIGN_IN_PAGE_ROUTE);
        })
        .catch((error) => {
          toast.error('Ошибка при выходе из аккаунта!');
        });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSelectedFile(null);
    setEmailError(false);
    setPasswordMatchError(false);
  };

  useEffect(() => {
    setLoading(true);
    getUserInfo()
        .then((response) => {
          const { email, name, number, picture } = response.data;
          setCurUser({ email, name, number, picture });
          setUserData({ email, name, number: formatPhoneNumber(number), password: '', confirm_password: '' });
          setLoading(false);
        })
        .catch((error) => {
          toast.error('Ошибка при загрузке данных пользователя');
        });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
      <div className="profile-container" onDrop={handleFileDrop} onDragOver={handleFileDragOver}>
        <div className="m-4 flex flex-col items-center gap-8 rounded-[10px] p-4 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg: gap-0 lg:pl-32 lg:pr-20">
          <div className="flex justify-center">
            <div
                className="relative overflow-hidden rounded-full bg-gray-200"
                style={{ width: '100px', height: '100px' }}
            >
              {isEditing ? (
                  <>
                    <div
                        className="absolute cursor-pointer flex items-center justify-center w-full h-full hover:z-10"
                        onClick={handleImageClick}
                        style={{ background: 'rgba(0,0,0,0.5)', opacity: selectedFile ? 0 : 1 }}
                    >
                      <input
                          type="file"
                          className="hidden"
                          ref={uploadRef}
                          onChange={handlePictureChange}
                      />
                      <Upload height={50} width={50} color="#4e4646" />
                    </div>
                  </>
              ) : (
                  ''
              )}
              {selectedFile ? (
                  <img
                      src={URL.createObjectURL(selectedFile)}
                      className="aspect-square h-100 w-100"
                      alt="User Avatar"
                  />
              ) : (
                  <img
                      src={curUser.picture}
                      className="aspect-square h-100 w-100"
                      alt="User Avatar"
                  />
              )}
            </div>
          </div>

          <div className="flex grow flex-col items-center gap-10 sm:items-start sm:justify-around sm:gap-0">
            <div className="grid gap-4 py-4 inputs-container">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  {t("name")}
                </label>
                {isEditing ? (
                    <input
                        id="name"
                        name="name"
                        value={userData.name}
                        className="col-span-3"
                        type="text"
                        onChange={handleUserData}
                    />
                ) : (
                    <span className="text-gray-600">{curUser.name}</span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  {t("email")}
                </label>
                {isEditing ? (
                    <input
                        id="email"
                        name="email"
                        value={userData.email}
                        className="col-span-3"
                        type="email"
                        onChange={handleUserData}
                    />
                ) : (
                    <span className="text-gray-600">{curUser.email}</span>
                )}
                {emailError && <span className="text-red-500">{t("emailError")}</span>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="number" className="text-right">
                  {t("phoneNumber")}
                </label>
                {isEditing ? (
                    <input
                        id="number"
                        name="number"
                        value={userData.number}
                        className="col-span-3"
                        type="text"
                        maxLength={18}
                        onChange={handleUserData}
                    />
                ) : (
                    <span className="text-gray-600">{curUser.number}</span>
                )}
              </div>
              {isEditing && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="password" className="text-right">
                      {t("newPassword")}
                    </label>
                    <input
                        id="password"
                        name="password"
                        value={userData.password}
                        className="col-span-3"
                        type="password"
                        onChange={handleUserData}
                    />
                  </div>
              )}
              {isEditing && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="confirm_password" className="text-right">
                      {t("confirmPassword")}
                    </label>
                    <input
                        id="confirm_password"
                        name="confirm_password"
                        value={userData.confirm_password}
                        className="col-span-3"
                        type="password"
                        onChange={handleUserData}
                    />
                    {passwordMatchError && <span className="text-red-500">{t("passwordMatchError")}</span>}
                  </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-4" style={{ width: '100%' }}>
              {loading ? (
                  <Loader2 className="animate-spin" color="#8383FF" />
              ) : (
                  <>
                    <div className={`edit-container`}>
                      {isEditing ? (
                          <button
                              className="rounded-full bg-blue-500 px-6 py-2 text-white"
                              onClick={isEditing ? handleEditToggle : ''}
                          >
                            {t("cancel")}
                          </button>
                      ) : (
                          ''
                      )}
                      <button
                          className="rounded-full bg-blue-500 px-6 py-2 text-white"
                          onClick={isEditing ? handleSaveChanges : handleEditToggle}
                      >
                        {isEditing ? t("saveChanges") : t("edit")}
                      </button>
                    </div>
                    <div className={`exit-container`} style={{ marginTop: 50 }}>
                      <button
                          className="rounded-full bg-gray-500 px-6 py-2 text-white"
                          onClick={handleLogOutAccount}
                      >
                        {t("logOut")}
                      </button>
                    </div>
                    <div className={`delete-container`}>
                      <button
                          className="rounded-full bg-red-500 px-6 py-2 text-white"
                          onClick={handleDeleteAccount}
                      >
                        {t("deleteAccount")}
                      </button>
                    </div>
                  </>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;
