import { Link, useLocation } from 'react-router-dom';
import {
    PROFILE_BOOKINGS_PAGE,
    PROFILE_FAVORITES_PAGE,
    PROFILE_PLACES_PAGE,
    PROFILE_START_PAGE
} from "@/utils/routes.js";
import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";

const AccountNav = () => {
  const { pathname } = useLocation();
  let page = pathname.split('localhost:5173');
    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

  return (
    <nav className=" mb-8 flex w-full flex-col justify-center gap-2 p-8 md:flex-row md:p-0">
      <Link className={`flex justify-center mx-10 md:mx-0 gap-1 py-2 px-6 rounded-full bg-gray-200 ${page[0].includes(PROFILE_START_PAGE)  ? 'bg-primary text-white' : ''}`} to={PROFILE_START_PAGE}>
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
          {t("myProfile")}
      </Link>
      <Link className={`flex justify-center mx-10 md:mx-0 gap-1 py-2 px-6 rounded-full bg-gray-200 ${page[0].includes(PROFILE_BOOKINGS_PAGE) ? 'bg-primary text-white' : ''}`} to={PROFILE_BOOKINGS_PAGE}>
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
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
          {t("myRentedPlaces")}
      </Link>
      <Link className={`flex justify-center mx-10 md:mx-0 gap-1 py-2 px-6 rounded-full bg-gray-200 ${page[0].includes(PROFILE_PLACES_PAGE) ? 'bg-primary text-white' : ''}`} to={PROFILE_PLACES_PAGE}>
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
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
          />
        </svg>
          {t("myPlaces")}
      </Link>
      <Link className={`flex justify-center mx-10 md:mx-0 gap-1 py-2 px-6 rounded-full bg-gray-200 ${page[0].includes(PROFILE_FAVORITES_PAGE) ? 'bg-primary text-white' : ''}`} to={PROFILE_FAVORITES_PAGE}>
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
              className={`fav ${page[0].includes(PROFILE_FAVORITES_PAGE) ? 'bg-primary text-white text-white-fav' : ''}`}
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
          {t("favorites")}
      </Link>
    </nav>
  );
};

export default AccountNav;
