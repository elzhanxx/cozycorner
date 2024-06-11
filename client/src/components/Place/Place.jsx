import React, { useEffect, useState } from 'react';
import './Place.scss';
import { Link } from "react-router-dom";
import { PLACE_PAGE_ROUTE } from "@/utils/routes.js";
import starImg from '../../assets/images/star.png';
import favImg from '../../assets/images/favImg.png';
import {useTranslation} from "react-i18next";

const Place = ({ data, Change }) => {
    const {t, i18n} = useTranslation()
    const changeLanguage = (language) =>{
        i18n.changeLanguage(language)
    }
    const [image, setImage] = useState('');
    let [item, setItem] = useState(data)

    useEffect(() => {
        setImage(data.image);
    }, [data.image]);

    useEffect(()=>{
        setItem(data)
    },[data])

    const handleImageError = (e) => {
        console.error('Image failed to load:', e);
        setImage(null);
    };

    return (
        <Link to={PLACE_PAGE_ROUTE.replace(':id', item.id)} className="card-e">
            {image && (
                <img
                    src={image}
                    alt="Apartment"
                    className="card-image"
                    onError={handleImageError}
                />
            )}
            <div className="card-details">
                <p className="card-price">{item.price}</p>
                <p className="card-name">{item.name}</p>
                <p className="card-address">{item.address}</p>
                {item.floor ?      <p className="card-info">{item.floor}</p> : '' }
                <p className="card-info">{item.area}</p>
                <p className="card-info">{item.rooms}</p>
                <div className={`card-bot ${item.isFav === null ? 'card-bot-wf' : ''}`}>
                    <p className="card-rating"><img src={starImg} alt="Rating"/>{(item.rating)}</p>
                    {item.isFav === null ? '' :
                        <button className="card-button" onClick={(e)=>{
                            e.stopPropagation();
                            e.preventDefault();
                            Change(item.id, item.isFav)

                        }}>{item.isFav ? <p>{t("deleteFromFav")}</p> : <p>{t("addToFav")}</p>}   <svg
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
                            className={`fav ${item.isFav ? 'fav-a' : ''}`}
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
                    }
                </div>
            </div>
        </Link>
    );
};

export default Place;
