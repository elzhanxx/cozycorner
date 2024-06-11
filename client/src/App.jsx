import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from "react-i18next"
import Layout from './components/Layout/Layout.jsx';
import IndexPage from '@/pages/IndexPage/IndexPage.jsx';
import { UserProvider } from './providers/UserProvider';
import { PlaceProvider } from './providers/PlaceProvider';
import NotFoundPage from './pages/NotFound/NotFoundPage.jsx';
import {
  MAIN_PAGE_ROUTE,
  PLACE_PAGE_ROUTE,
  PROFILE_BOOKINGS_PAGE, PROFILE_FAVORITES_PAGE,
  PROFILE_PAGE_ROUTE,
  PROFILE_PLACES_NEW_PAGE,
  PROFILE_PLACES_ONE_PAGE,
  PROFILE_PLACES_PAGE,
  PROFILE_SINGLBOOKING_PAGE,
  PROFILE_START_PAGE,
  SIGN_IN_PAGE_ROUTE,
  SIGN_UP_PAGE_ROUTE,
  START_PAGE
} from "@/utils/routes.js";
import PagesWithSearch from "@/pages/PagesWithSearch/PagesWithSearch.jsx";
import LoginPage from "@/pages/SignInPage/LoginPage.jsx";
import RegisterPage from "@/pages/SignUp/RegisterPage.jsx";
import BookingsPage from "@/pages/Booking/BookingsPage.jsx";
import PlacePage from "@/pages/PlaceAll/PlacePage.jsx"
import ProfilePage from "@/pages/Profile/ProfilePage.jsx";
import {useAuth, useProvideAuth} from "../hooks/index.js";
import ProfileLayout from "@/components/ProfileLayout/ProfileLayout.jsx";
import SingleBookedPlace from "@/pages/SingleBookedPlace/SingleBookedPlace.jsx";
import PlacesFormPage from "@/pages/PlacesFormPage/PlacesFormPage.jsx";
import PlacesAccountPage from "@/pages/Place/PlacesAccountPage.jsx";
import FavoritePage from "@/pages/Favorite/FavoritePage.jsx";

function App() {
  const { user, setUser } = useProvideAuth();
  const auth = useAuth();

  useEffect(() => {
    // let token = getItemFromLocalStorage('user');
    // let parsedToken = JSON.parse(token);
    // if(parsedToken){
    //   setUser(parsedToken)
    // }
  }, []);


  return (
      <UserProvider>
        <PlaceProvider>
          <Routes>
            <Route path={START_PAGE} element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path={MAIN_PAGE_ROUTE} element={<PagesWithSearch />} />
              <Route path={SIGN_IN_PAGE_ROUTE} element={<LoginPage />} />
              <Route path={SIGN_UP_PAGE_ROUTE} element={<RegisterPage />} />
              <Route path={PLACE_PAGE_ROUTE} element={<PlacePage />} />
              <Route path={PROFILE_PAGE_ROUTE} element={<ProfileLayout />} >
                <Route index path={PROFILE_START_PAGE} element={<ProfilePage />} />
                <Route path={PROFILE_PLACES_NEW_PAGE} element={<PlacesFormPage />} />
                <Route path={PROFILE_PLACES_PAGE} element={<PlacesAccountPage />} />
                <Route path={PROFILE_PLACES_ONE_PAGE} element={<PlacesFormPage />} />
                <Route path={PROFILE_BOOKINGS_PAGE} element={<BookingsPage />} />
                <Route path={PROFILE_FAVORITES_PAGE} element={<FavoritePage />} />
                <Route path={PROFILE_SINGLBOOKING_PAGE} element={<SingleBookedPlace />}/>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <ToastContainer autoClose={2000} transition={Slide} />
        </PlaceProvider>
      </UserProvider>
  );
}

export default App;
