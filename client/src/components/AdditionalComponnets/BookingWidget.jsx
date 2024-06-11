import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks';
import DatePickerWithRange from './DatePickerWithRange';
import {$bearer} from "@/HTTP/axios.js";
import {PROFILE_BOOKINGS_PAGE} from "@/utils/routes.js";

const BookingWidget = ({ place }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [bookingData, setBookingData] = useState({
    noOfGuests: 1,
    name: '',
    phone: '',
  });
  const [redirect, setRedirect] = useState('');
  const { user } = useAuth();

  const { noOfGuests, name, phone } = bookingData;
  const { _id: id, price } = place;

  useEffect(() => {
    if (user) {
      setBookingData({ ...bookingData, name: user.name });
    }
  }, [user]);

  const numberOfNights =
    dateRange.from && dateRange.to
      ? differenceInDays(
          new Date(dateRange.to).setHours(0, 0, 0, 0),
          new Date(dateRange.from).setHours(0, 0, 0, 0),
        )
      : 0;

  const handleBookingData = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    if (!user) {
      return setRedirect(`/login`);
    }

    if (numberOfNights < 1) {
      return toast.error('Пожалуйста, выберите действительные даты');
    } else if (noOfGuests < 1) {
      return toast.error("Количество гостей не может быть меньше 1\n");
    } else if (noOfGuests > place.rooms) {
      return toast.error(`Разрешено макс. нет. гостей: ${place.rooms}`);
    } else if (name.trim() === '') {
      return toast.error("Имя не может быть пустым.");
    } else if (phone.trim() === '') {
      return toast.error("Поле номера не может быть пустым.");
    }

    try {

      const response = await $bearer.post('/bookings', {
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        noOfGuests,
        name,
        phone,
        place: id,
        price: numberOfNights * price,
      });

      const bookingId = response.data.booking._id;

      setRedirect(PROFILE_BOOKINGS_PAGE);
      toast('Поздравляем! Ваше бронирование подтверждено!');
    } catch (error) {
      toast.error('На это время помещение уже забронировано!Укажите другие даты');
      console.log('Ошибка: ', error);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-xl">
      <div className="text-center text-xl">
        Цена: <span className="font-semibold">&nbsp;{place.price}₸</span> / за ночь
      </div>
      <div className="mt-4 rounded-2xl border">
        <div className="flex w-full ">
          <DatePickerWithRange setDateRange={setDateRange} />
        </div>
        <div className="border-t py-3 px-4">
          <label>Максимальное количество гостей: </label>
          <input
            type="number"
            name="noOfGuests"
            placeholder={`Max. guests: ${place.rooms}`}
            min={1}
            max={place.rooms}
            value={noOfGuests}
            onChange={handleBookingData}
          />
        </div>
        <div className="border-t py-3 px-4">
          <label>Ваше полное имя: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleBookingData}
          />
          <label>Номер телефона: </label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleBookingData}
          />
        </div>
      </div>
      <button onClick={handleBooking} className="primary mt-4">
        Арендовать это место за
        {numberOfNights > 0 && <span> {numberOfNights * place.price}₸</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
