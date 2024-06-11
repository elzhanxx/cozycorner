import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../../components/AdditionalComponnets/AddressLink';
import BookingDates from '../../components/AdditionalComponnets/BookingDates';
import PlaceGallery from '../../components/AdditionalComponnets/PlaceGallery';
import Spinner from '../../components/AdditionalComponnets/Spinner';
import { $bearer } from "@/HTTP/axios.js";
import CommentForm from "@/components/CommentForm/CommentsForm.jsx";
import {addFav, removeFav} from "@/HTTP/Favourites.js";
import PerksWidget from "@/components/AdditionalComponnets/PerksWidget.jsx";
import {useTranslation} from "react-i18next";

const SingleBookedPlace = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [placeInfo, setPlaceInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [placeId, setPlaceId] = useState('')
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await $bearer.get('/bookings');
      setPlaceInfo(data.place);
      const filteredBooking = data.booking.filter(
          (booking) => booking._id === id,
      );
      console.log(booking.place)

      setBooking(filteredBooking[0]);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const renderBookingTable = () => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Key
            </th>
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Value
            </th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(booking).map(([key, value]) => (
              <tr key={key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {key}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof value === 'object' ? JSON.stringify(value) : value}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
    );
  };

  return (
      <div>
        {booking?.place ? (
            <div className="p-4">
              <h1 className="text-3xl">{booking?.place?.title}</h1>

              <AddressLink
                  className="my-2 block"
                  placeAddress={booking.place?.address}
              />
              <div className="my-6 flex flex-col items-center justify-between rounded-2xl bg-gray-200 p-6 sm:flex-row">
                <div className=" ">
                  <BookingDates booking={booking} />
                </div>
                <div className="mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto">
                  <div className="hidden md:block">{t("totalPrice")}</div>
                  <div className="flex justify-center text-3xl">
                    <span>₸{booking?.price}</span>
                  </div>
                </div>
              </div>
              <PlaceGallery place={booking?.place} />

              {/*{renderBookingTable()}*/}
              <div className="my-4 ">
                <h2 className="text-2xl font-semibold">{t("description")}</h2>
                {booking.place.description}
              </div>
              <div className="my-4 ">
                <h2 className="text-2xl font-semibold">{t("extraInfo")}</h2>
                {booking.place.extraInfo}
              </div>
                {booking?.place?.floor && <p>{t("floor")}: {booking.place.floor}</p>}
              <p>{t("maxNumberOfGuests")}: {booking?.place.maxGuests}</p>
              <p>{t("quadrature")}: {booking?.place.quadrature}</p>
              <p>{t("area")}: {booking?.place.area}</p>
              <PerksWidget perks={booking?.place?.perks} />
              <CommentForm id={booking?.place._id} />
            </div>
        ) : (
            <h1>No data</h1>
        )}
      </div>
  );
};

export default SingleBookedPlace;
