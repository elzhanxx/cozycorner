import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Search.scss';
import dateImg from '../../../assets/images/Union.png';
import {useTranslation} from "react-i18next";

const Search = ({ placeholder, onChange, style, districts }) => {
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {t, i18n} = useTranslation()
    const changeLanguage = (language) =>{
        i18n.changeLanguage(language)
    }

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(selectedDistrict);
        } else {
            console.error('onChange не является функцией');
        }
    }, [selectedDistrict, onChange]);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
        setIsDropdownOpen(false);
    };

    return (
        <div className="search-box" style={style}>
            <p className="search-box__text">{placeholder}</p>
            <div className="datepicker-container flex">
                <img src={dateImg} alt="Calendar" />
                <input
                    type="text"
                    value={selectedDistrict}
                    onClick={handleDropdownToggle}
                    readOnly
                    className="district-input"
                    placeholder={t("chooseArea")}
                />
                {isDropdownOpen && (
                    <ul className="dropdown">
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
    );
};

Search.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    districts: PropTypes.arrayOf(PropTypes.string)
};

Search.defaultProps = {
    placeholder: '',
    onChange: () => {},
    style: {},
    districts: []
};

export default Search;
