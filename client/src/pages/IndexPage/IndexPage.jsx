import {useAuth, usePlaces} from '../../../hooks/index.js';
import Spinner from '@/components/ui/Spinner/Spinner.jsx';
import Hero from "@/components/Hero/Hero.jsx";
import {useEffect, useState} from "react";
import './IndexPage.scss'
import Place from "@/components/Place/Place.jsx";
import {getAllMainPagePlaces, getAllPlaces} from "@/HTTP/Places.js";
import {addFav, removeFav} from "@/HTTP/Favourites.js";
import {useTranslation} from "react-i18next";

const IndexPage = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await getAllMainPagePlaces(auth.user);
                const newArr = response.data.topPlaces.map((el) => ({
                    id: el._id,
                    name: el.title,
                    price: `${t("pricePrefix")} ${el.price} ${t("tg")} ${t("perNight")}`,
                    address: el.address,
                    floor: `${t("floor")}: ${el.floor}`,
                    area: `${t("quadrature")}: ${el.quadrature}`,
                    rooms: `${t("rooms")}: ${el.rooms}`,
                    rating: `${el.averageRating}(${el.reviewCounter})`,
                    image: el.photos[0],
                    isFav: el.isFavorite,
                }));
                setData(newArr);
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };

        fetchPlaces();
    }, [auth.user, t]);

    function updateFav(id, status) {
        const updateFavorite = async (id, status) => {
            try {
                if (status === false) {
                    await addFav(id);
                } else {
                    await removeFav(id);
                }

                const newArr = data.map((el) => {
                    if (el.id === id) {
                        el.isFav = !status;
                    }
                    return el;
                });
                setData(newArr);
            } catch (error) {
                console.error("Error updating favorite:", error);
            }
        };

        updateFavorite(id, status);
    }

    return (
        <section>
            <Hero />
            <section className="place-section">
                <div className="place-container">
                    <p className="place-section-title">{t("offers")}</p>
                    <p className="place-section-subtitle">{t("theBestForYou")}</p>
                    <div className="place-box">
                        {data.map((el, index) => (
                            <Place data={el} Change={updateFav} key={index} />
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
};

export default IndexPage;
