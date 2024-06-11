import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.scss';
import dateImg from '../../assets/images/blank-calendar--blank-calendar-date-day-month-empty.svg';
import CustomInput from '@/components/ui/Search/CustomInput.jsx';

const CustomDatePicker = ({ placeholder, onChange, style }) => {
    const [date, setDate] = useState(null);
    const today = new Date();

    useEffect(() => {
        onChange(date);
    }, [date, onChange]);

    return (
        <div className="datepicker" style={style}>
            <p className="datepicker__text">
                {placeholder}
            </p>
            <div className="datepicker-container flex">
                <img src={dateImg} alt="Calendar" />
                <DatePicker
                    selected={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    className="datepicker__input"
                    customInput={<CustomInput />}
                    dateFormat="dd/MM/yyyy"
                    minDate={today}
                />
            </div>
        </div>
    );
};

CustomDatePicker.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object
};

CustomDatePicker.defaultProps = {
    placeholder: '',
    onChange: () => {},
    style: {}
};

export default CustomDatePicker;
