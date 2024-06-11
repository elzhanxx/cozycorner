import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import Spinner from '@/components/AdditionalComponnets/Spinner';
import AddressLink from '@/components/AdditionalComponnets/AddressLink';
import BookingWidget from '@/components/AdditionalComponnets/BookingWidget';
import PlaceGallery from '@/components/AdditionalComponnets/PlaceGallery';
import PerksWidget from '@/components/AdditionalComponnets/PerksWidget';

import './PlacePage.scss'
import {$host} from "@/HTTP/axios.js";
import {addFav, removeFav} from "@/HTTP/Favourites.js";
import {getPlaceReviews} from "@/HTTP/Review.js";
import {useTranslation} from "react-i18next";



const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  let [fav, setFav] = useState(false)
  let[comments, setComments] = useState([])
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };


  const getPlace = async () => {
    const { data } = await $host.get(`/places/${id}`);
    setFav(data.place.isFavorite)
    setPlace(data.place);
    getPlaceReviews(data.place._id).then(response=>{
      console.log(response.data)
      let newComArr = response.data.map(el=>{
        const date = new Date(el.date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        let newObj = {
          username: `${el.user.name}`,
          comment: `${el.text}`,
          rating: el.rating,
          date: day + '.' + month + '.' + year
        }
        return newObj
      })

      setComments(newComArr)
    }).catch((error)=>{})
    setTimeout(()=>{setLoading(false)}, 500)
  };

  useEffect(() => {
    if (!id) {
      return '';
    }
    getPlace();

  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return;
  }



  return (
      <div className="mt-4 overflow-x-hidden px-8 pt-20" style={{ width: 1200, margin: '0 auto' }}>
        <h1 className="text-3xl">{place.title}</h1>
        <AddressLink placeAddress={place.address} />
        <PlaceGallery place={place} />

        <div className="mt-8 mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
          <div className="">
            <button
                className="btn-places"
                style={{ background: 'transparent' }}
                onClick={(e) => {
                  if (fav) {
                    removeFav(place._id)
                        .then(() => {
                          setFav(false);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                  } else {
                    addFav(place._id)
                        .then(() => {
                          setFav(true);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                  }
                }}
            >
              <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="25px"
                  height="25px"
                  viewBox="0 0 612 612"
                  xmlSpace="preserve"
                  className={`fav ${fav ? 'fav-a' : ''}`}
              >
                <g>
                  <g id="_x31__39_">
                    <g>
                      <path
                          d="M459,18.075c-63.743,0-111.977,37.409-153,76.5c-39.091-41.482-89.256-76.5-153-76.5c-89.773,0-153,77.188-153,161.358
                        c0,45.154,18.494,77.686,38.747,108.228l237.781,285.077c26.699,28.248,31.729,28.248,58.427,0l238.316-285.077
                        C597.082,257.119,612,224.587,612,179.433C612,95.264,548.772,18.075,459,18.075z M535.5,279.744L306,553.575L76.5,278.615
                        c-27.444-38.154-38.25-63.896-38.25-99.182c0-65.752,46.952-124.944,114.75-125.499c55.769-0.459,118.977,56.495,153,99.431
                        c33.125-41.444,97.231-99.431,153-99.431c66,0,114.75,59.747,114.75,125.499C573.75,214.719,565.201,242.373,535.5,279.744z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </button>
            <div className="my-4">
              <h2 className="text-2xl font-semibold">{t('description')}</h2>
              {place.description}
            </div>
            <p>{t('rooms')}: {place.rooms}</p>
            <p>{t('quadrature')}: {place.quadrature}</p>
            <p>{t('area')}: {place.area}</p>
            {place.floor && <p>{t('floor')}: {place.floor}</p>}
            <PerksWidget perks={place?.perks} />
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>

        <div className="-mx-8 border-t bg-white px-8 py-8">
          <div>
            <h2 className="mt-4 text-2xl font-semibold">{t('extraInfo')}</h2>
          </div>
          <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
            {place.extraInfo}
          </div>
          <p className="text-gray-680 mt-2">{t('averageRating')} {place?.averageRating} ({t('reviewCounter')}: {place?.reviewCounter})</p>

          {comments.length > 0 ? (
              <>
                <p className="mt-4 text-2xl font-semibold pb-4">{t('reviewsTitle')}</p>
                <hr className="mb-5 border" />
              </>
          ) : (
              <p className="mt-4 text-2xl font-semibold">{t('reviewsNoComments')}</p>
          )}

          {comments.length > 0 &&
              comments.map((el, index) => (
                  <div className="bg-white shadow-md rounded-lg p-4 mb-4" key={index}>
                    <h3 className="text-xl font-semibold text-gray-800">{el.username ? el.username : ''}</h3>
                    <p className="text-l font-regular text-gray-600">{el.date}</p>
                    <p className="text-gray-600 mt-2">{el.comment ? el.comment : ''}</p>
                    <div className="mt-4">
                      <span className="text-yellow-500">{Array(el.rating).fill('★').join('')}</span>
                      <span className="text-gray-400">{Array(5 - el.rating).fill('☆').join('')}</span>
                    </div>
                  </div>
              ))}
        </div>
      </div>
  );
};

export default PlacePage;
