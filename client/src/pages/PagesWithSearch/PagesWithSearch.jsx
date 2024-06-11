import React, { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Place from "@/components/Place/Place.jsx";
import Pagination from "@/components/Pagination/Pagination.jsx";
import { getFilteredPlaces } from "@/HTTP/Places.js";
import { useNavigate } from "react-router-dom";
import { START_PAGE } from "@/utils/routes.js";
import { usePlaces } from '../../../hooks/index.js';
import './PagesWithSearch.scss';
import { addFav, removeFav } from "@/HTTP/Favourites.js";
import { useTranslation } from "react-i18next";

const PagesWithSearch = () => {
    const { place, setPlace } = usePlaces();
    const [data, setData] = useState([]);
    const [maxPages, setMaxPages] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [toggleBtn, setToggleBtn] = useState([
        { id: 1, name: 'new', active: true },
        { id: 2, name: 'cheap', active: false },
        { id: 3, name: 'expensive', active: false },
    ]);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const updateCurrentSlider = (id) => {
        const newArr = toggleBtn.map((el) => {
            el.active = el.id === id;
            return el;
        });
        setToggleBtn(newArr);
        if (id === 1) {
            const sortedArray = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setData(sortedArray);
        } else if (id === 2) {
            const sortedArray = data.sort((a, b) => {
                const priceA = parseFloat(a.price.split(' ')[1]);
                const priceB = parseFloat(b.price.split(' ')[1]);
                return priceA - priceB;
            });
            setData(sortedArray);
        } else if (id === 3) {
            const sortedArray = data.sort((a, b) => {
                const priceA = parseFloat(a.price.split(' ')[1]);
                const priceB = parseFloat(b.price.split(' ')[1]);
                return priceB - priceA;
            });
            setData(sortedArray);
        }
    };

    useEffect(() => {
        if (place && (place.area || place.count || place.perks)) {
            getFilteredPlaces(place.area, place.count, currentPage, place.perks).then((response) => {
                console.log(response.data);
                setMaxPages(response.data.totalPages);
                console.log(response.data.places);
                if (response.data.places) {
                    const newArr = response.data.places.map((el) => ({
                        id: el._id,
                        name: el.title,
                        price: `${t("pricePrefix")} ${el.price} ${t("tg")} ${t("perNight")}`,
                        address: el.address,
                        floor: `${t('floor')}: ${el.floor}`,
                        area: `${t('quadrature')}: ${el.quadrature}`,
                        rooms: `${t('rooms')}: ${el.rooms}`,
                        rating: `${el.averageRating} ${el.reviewCounter}`,
                        image: el.photos[0],
                        isFav: el.isFavorite,
                        date: el.date,
                    }));
                    setData(newArr);
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [place, navigate, currentPage, t]);

    function updateFav(id, status) {
        if (status === false) {
            addFav(id).then(r => {
                let newArr = data.map(el => {
                    if (el.id === id) {
                        el.isFav = true;
                        return el;
                    }
                    return el;
                });
                setData(newArr);
            }).catch(error => {});
        } else {
            removeFav(id).then(r => {
                let newArr = data.map(el => {
                    if (el.id === id) {
                        el.isFav = false;
                        return el;
                    }
                    return el;
                });
                setData(newArr);
            }).catch(error => {});
        }
    }

    return (
        <section>
            <section className="place-section place-section-s">
                <div className="place-container">
                    <p className="place-section-title">{t('resultsOfSearch')}</p>
                    <div className="search-page-top">
                        <div className="search-page-top-l">{t('found')} {data.length} {t('announcements')}</div>
                        <div className="search-page-top-r">
                            <p className="search-page-top-r__text">{t('showFirst')}: </p>
                            {toggleBtn.map((el, index) => (
                                <button
                                    className={`toggleBtn ${el.active ? 'toggleBtn-a' : ''}`}
                                    key={index}
                                    onClick={() => updateCurrentSlider(el.id)}
                                >
                                    {t(el.name)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="place-box">
                        {data.map((el, index) => (
                            <Place data={el} Change={updateFav} key={index} />
                        ))}
                    </div>
                    <div className="pag-container">
                        <Pagination maxPages={maxPages} currentPage={currentPage} onPageChange={handlePageChange} />
                    </div>
                </div>
            </section>
        </section>
    );
};

export default PagesWithSearch;
