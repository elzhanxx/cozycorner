import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlaceImg from "@/components/AdditionalComponnets/PlaceImg.jsx";
import BookingDates from "@/components/AdditionalComponnets/BookingDates.jsx";
import {MAIN_PAGE_ROUTE, PLACE_PAGE_ROUTE, PROFILE_SINGLBOOKING_PAGE, START_PAGE} from "@/utils/routes.js";
import {getBookings} from "@/HTTP/Bookings.js";
import './BookingsPage.scss';
import {useTranslation} from "react-i18next";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
    const {t, i18n} = useTranslation()
    const changeLanguage = (language) =>{
        i18n.changeLanguage(language)
    }

    useEffect(() => {
        try {
             getBookings().then((response)=>{
                 if(response.data.booking ){
                     setBookings(response.data.booking);
                 }
             }).catch((error)=>{
             })

        } catch (error) {
            console.log('Error: ', error);
        }
    }, []);


  return (
    <div className="flex flex-col items-center">
      <div style={{width: '100%'}}>
        {bookings?.length > 0 ? (
          bookings.map((booking) => (
            <Link
              to={PROFILE_SINGLBOOKING_PAGE.replace(':id', booking._id)}
              className="mx-4 my-8 flex h-28 gap-4 overflow-hidden rounded-2xl bg-gray-200 md:h-40 lg:mx-0"
              key={booking._id}
            >
              <div className="w-2/6 md:w-1/6">
                {booking?.place?.photos[0] && (
                  <PlaceImg
                    place={booking?.place}
                    className={'h-full w-full object-cover'}
                  />
                )}
              </div>
              <div className="grow py-3 pr-3">
                <h2 className="bookings-text">{booking?.place?.title}</h2>
                <div className="md:text-xl">
                  <div className="flex gap-2 border-t "></div>
                  <div className="md:text-xl">
                    <BookingDates
                      booking={booking}
                      className="mb-2 mt-4 hidden items-center text-gray-600  md:flex"
                    />

                    <div className="my-2 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-7 w-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      <span className="text-xl bookings-text">
                        {t("fullPrice")}: {booking.price}₸
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="">
            <div className="flex flex-col justify-start">
              <h1 className="my-6 text-3xl font-semibold">{t("oops")}</h1>
              <hr className="border border-gray-300" />
              <h3 className="pt-6 text-2xl font-semibold">
                  {t("noPlaces")}
              </h3>
              <p>
                  {t("itsTime")}
              </p>
              <Link to={START_PAGE} className="my-4">
                <div className="flex w-40 justify-center rounded-lg border border-black p-3 text-lg font-semibold hover:bg-gray-50">
                    {t("startToSearch")}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
