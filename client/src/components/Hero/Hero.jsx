import React, {useEffect, useState} from 'react';
import Search from "@/components/ui/Search/Search.jsx";
import CustomDatePicker from "@/components/CustomDatePicker/CustomDatePicker.jsx";
import './Hero.scss';
import RoomComponents from "@/components/RoomComponent/RoomComponents.jsx";
import {useNavigate} from "react-router-dom";
import {MAIN_PAGE_ROUTE} from "@/utils/routes.js";
import {getAllPlaces} from "@/HTTP/Places.js";
import {usePlaces} from "../../../hooks/index.js";
import Perks from "@/components/AdditionalComponnets/Perks.jsx";
import {useTranslation} from "react-i18next";

const districts = ['Алматинский', 'Сарыаркинский', 'Есильский', 'Байконурский'];

const Hero = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [count, setCount] = useState(null);
    const navigator = useNavigate()
    const {place, setPlace } = usePlaces();
    let [perks, setPerks] = useState([])
    const {t, i18n} = useTranslation()
    const changeLanguage = (language) =>{
        i18n.changeLanguage(language)
    }
    const handleFormData = (e) => {
        const { name, value, type } = e.target

        if (type === 'checkbox') {
            const currentPerks = [...perks];
            let updatedPerks = [];

            if (currentPerks.includes(name)) {
                updatedPerks = currentPerks.filter((perk) => perk !== name);
            } else {
                updatedPerks = [...currentPerks, name];
            }
            setPerks(updatedPerks);

        }
    };

    const updateStartDate = (date) => {
        setStartDate(date);
    };

    const updateEndDate = (date) => {
        setEndDate(date);
    };

    const updateDistrict = (district) => {
        setSelectedDistrict(district);
    };

    useEffect(()=>{
        if(count || selectedDistrict || perks){
            const newPlace = { area: selectedDistrict, count: count, perks: perks };
            setPlace(newPlace);

        }

    },[selectedDistrict, count, perks])

    function updateCount (value) {
        setCount(value)
    }
    console.log(place)

    return (
        <div className="flex flex-col items-center justify-center bg-cover hero-img" style={{ backgroundImage: 'url(../../assets/images/mp sb bg 1.png)' }}>
            <div className="text-center text-white mt-8">
                <h1 className="text-4xl font-bold">{t("searchCozyCorner")}</h1>
                <p className="text-lg mt-4" style={{ marginBottom: 66 }}></p>
            </div>
            <div className="hero-inner">
                <Search
                    placeholder={t("desiredArea")}
                    onChange={updateDistrict}
                    districts={districts}
                    style={{ marginRight: 20 }}
                />
                {/*<CustomDatePicker placeholder={'Дата заезда'} onChangeF={updateStartDate} style={{ marginLeft: 20 }} />*/}
                {/*<CustomDatePicker placeholder={'Дата отъезда'} onChangeF={updateEndDate} style={{ marginLeft: 20 }} />*/}
                <RoomComponents minRooms={1} OnChange={updateCount} maxRooms={5} placeholder={t("numberOfRooms")} />
                <button className="search-btn" onClick={(e)=>{
                    navigator(MAIN_PAGE_ROUTE)
                }}>
                    {t("search")}
                </button>
                <br/>
                <div className="hero-bot">
                    <Perks selected={perks} handleFormData={handleFormData} isWhite={true} />
                </div>
            </div>

        </div>
    );
};

export default Hero;
