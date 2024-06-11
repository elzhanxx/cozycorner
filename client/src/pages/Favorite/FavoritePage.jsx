import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import InfoCard from '../../components/AdditionalComponnets/InfoCard.jsx';
import Spinner from '../../components/AdditionalComponnets/Spinner.jsx';
import {getUserPlaces} from "@/HTTP/Places.js";
import {START_PAGE} from "@/utils/routes.js";
import {getAllFav} from "@/HTTP/Favourites.js";
import {useTranslation} from "react-i18next";

const PlacesAccountPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
      i18n.changeLanguage(language);
  };
  useEffect(() => {
    const getPlaces = async () => {
      try {
        getAllFav().then((response)=>{
          let newArr= response.data.favorites.map(el=>{
              return el.place
          })
           setPlaces(newArr);
           setLoading(false);
         }).catch((error)=>{})

      } catch (error) {
        console.log(error);
      }
    };
    getPlaces();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
        <div className="text-center ">
        <Link
            className="inline-flex gap-1 rounded-full bg-primary py-2 px-6 text-white"
            to={START_PAGE}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg>
            {t("addNewFavorite")}
        </Link>
        </div>
      <div className="mx-4 mt-4 grid grid-cols-3 gap-4">
        {places.length > 0 &&
          places.map((place) => <InfoCard place={place} key={place._id} />)}
      </div>
    </div>
  );
};

export default PlacesAccountPage;
