import React, { useEffect, useState } from 'react';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import './PlacesFormPage.scss'
import Perks from '@/components/AdditionalComponnets/Perks';
import PhotosUploader from '@/components/AdditionalComponnets/PhotosUploader';
import Spinner from '@/components/AdditionalComponnets/Spinner.jsx';
import {addNewPlace, updateNewPlace} from "@/HTTP/Places.js";
import Search from "@/components/ui/Search/Search.jsx";
import dateImg from "@/assets/images/Union.png";
import {$bearer} from "@/HTTP/axios.js";
import {PROFILE_PLACES_PAGE} from "@/utils/routes.js";
import {useTranslation} from "react-i18next";

const PlacesFormPage = () => {
  const { id } = useParams();
  const districts = ['Алматинский', 'Сарыаркинский', 'Есильский', 'Байконурский'];
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  let navigator = useNavigate()
  const {t, i18n} = useTranslation()
  const changeLanguage = (language) =>{
    i18n.changeLanguage(language)
  }
  const updateDistrict = (district) => {
    setSelectedDistrict(district);
  };

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    rooms: 10,
    price: 500,
  });
  const [subarea, setArea] = useState('');

  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    rooms,
    price,
      floor,
    quadrature,
  } = formData;

  const isValidPlaceData = () => {
    if (title.trim() === '') {
      toast.error("Название не может быть пустым!");
      return false;
    } else if (address.trim() === '') {
      toast.error("Адрес не может быть пустым!");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error('Загрузите 5 фотографий!');
      return false;
    } else if (description.trim() === '') {
      toast.error("Описание не может быть пустым!");
      return false;
    } else if (rooms < 1) {
      toast.error('Выберите количество гостей!');
      return false;
    } else if (rooms > 10) {
      toast.error("Количество гостей не должно быть больше 10");
      return false;
    } else if (subarea === '') {
      toast.error("Выберите район");
      return false;
    }

    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    if (type !== 'checkbox') {
      setFormData({ ...formData, [name]: value });
      return;
    }



    if(name === rooms){
      let inputValue = parseInt(value);
      if (inputValue > 10 || isNaN(inputValue)) {
        inputValue = 10;
      } else if (inputValue < 1) {
        inputValue = 1;
      }
      setFormData({ ...formData, [name]: inputValue });
    }




    if (type === 'checkbox') {
      const currentPerks = [...perks];
      let updatedPerks = [];

      if (currentPerks.includes(name)) {
        updatedPerks = currentPerks.filter((perk) => perk !== name);
      } else {
        updatedPerks = [...currentPerks, name];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    $bearer.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: place[key],
          }));
        }
      }

      setAddedPhotos([...place.photos]);

      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => {
    return (
      <>
        <h2 className="mt-4 text-2xl">{header}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();

    const formDataIsValid = isValidPlaceData();
    const placeData = { ...formData, addedPhotos };
    placeData.area = subarea;
    if (formDataIsValid) {
      if (id) {
        const { data } = await updateNewPlace()
      } else {
        const { data } = await $bearer.post(
          '/places/add-places',
          placeData,
        );
      }
      navigator(PROFILE_PLACES_PAGE)
    }
  };

  if (redirect) {
    return <Navigate to={PROFILE_PLACES_PAGE} />;
  }

  if (loading) {
    return <Spinner />;
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setIsDropdownOpen(false);
    setArea(district);
  };

  return (
      <div className="p-4">
        <form onSubmit={savePlace}>

          {preInput(t("title"), t("titleDesc"))}
          <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormData}
              placeholder={t('titleExample')}
          />

          {preInput(t("address"), t("addressDesc"))}
          <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleFormData}
              placeholder={t('addressPlaceholder')}
          />

          {preInput(t("photosDesc"), t("photosDesc"))}

          <PhotosUploader
              addedPhotos={addedPhotos}
              setAddedPhotos={setAddedPhotos}
          />

          {preInput(t("description"), t("descriptionDesc"))}
          <textarea
              value={formData.description}
              name="description"
              onChange={handleFormData}
          />

          {preInput(t("perks"), t("perksDesc"))}
          <Perks selected={formData.perks} handleFormData={handleFormData} />

          {preInput(t("extraInfo"), t("extraInfoDesc"))}
          <textarea
              value={formData.extraInfo}
              name="extraInfo"
              onChange={handleFormData}
          />

          {preInput(t('rooms'), t("roomsDesc"))}
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">{t('rooms')}</h3>
              <input
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleFormData}
                  placeholder="1"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">{t('price')}</h3>
              <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormData}
                  placeholder="1"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">{t('quadrature')}</h3>
              <input
                  type="number"
                  name="quadrature"
                  value={formData.quadrature}
                  onChange={handleFormData}
                  placeholder="1"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">{t('floor')}</h3>
              <input
                  type="number"
                  name="floor"
                  value={formData.floor}
                  onChange={handleFormData}
                  placeholder="1"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">{t('area')}</h3>
              <div className="dropdown-container flex">
                <input
                    type="text"
                    name="area"
                    value={selectedDistrict}
                    onClick={handleDropdownToggle}
                    readOnly
                    className="dropdown-input"
                    placeholder={t('chooseArea')}
                />
                {isDropdownOpen && (
                    <ul className="dropdown-list">
                      {districts.map((district) => (
                          <li
                              key={district}
                              onClick={() => handleDistrictSelect(district)}
                              className="dropdown-item"
                          >
                            {district}
                          </li>
                      ))}
                    </ul>
                )}
              </div>
            </div>
          </div>

          <button className="mx-auto my-4 flex rounded-full bg-primary py-3 px-20 text-xl font-semibold text-white">
            {t('saveButton')}
          </button>
        </form>
      </div>
  );
};

export default PlacesFormPage;
