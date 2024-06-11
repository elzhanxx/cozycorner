import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RoomComponent.scss';
import houseIcon from '../../assets/images/home-4--home-house-roof-shelter.png';

const RoomComponents = ({ minRooms, maxRooms, placeholder, OnChange }) => {
    const [roomCount, setRoomCount] = useState();

    const handleChange = (event) => {
        let value = parseInt(event.target.value, 10);
        if (isNaN(value)) {
            value = minRooms;
        }
        if (value < minRooms) {
            value = minRooms;
        }
        if (value > maxRooms) {
            value = maxRooms;
        }
        setRoomCount(value);
        OnChange(value)
    };

    return (
        <div className="room-components">
            <p className="room-components__text">{placeholder}</p>
            <div className="room-components__input-container">
                <img src={houseIcon} alt="House Icon" className="room-components__icon" />
                <input
                    type="number"
                    value={roomCount}
                    onChange={handleChange}
                    className="room-components__input"
                    min={minRooms}
                    max={maxRooms}
                />
            </div>
        </div>
    );
};

RoomComponents.propTypes = {
    minRooms: PropTypes.number,
    maxRooms: PropTypes.number,
    placeholder: PropTypes.string
};

RoomComponents.defaultProps = {
    minRooms: 1,
    maxRooms: 5,
    placeholder: 'Кол-во комнат'
};

export default RoomComponents;
