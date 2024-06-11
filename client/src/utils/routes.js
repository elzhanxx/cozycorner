export const START_PAGE = `/`;
export const MAIN_PAGE_ROUTE = `${START_PAGE}search`;
export const PROFILE_PAGE_ROUTE = `${START_PAGE}profile/`;
export const PROFILE_START_PAGE = `${PROFILE_PAGE_ROUTE}main`;
export const PROFILE_BOOKINGS_PAGE = `${PROFILE_PAGE_ROUTE}bookings`;
export const PROFILE_PLACES_PAGE = `${PROFILE_PAGE_ROUTE}places`;
export const PROFILE_PLACES_NEW_PAGE = `${PROFILE_PLACES_PAGE}/new`;
export const PROFILE_PLACES_ONE_PAGE = `${PROFILE_PLACES_PAGE}/:id`;
export const PROFILE_FAVORITES_PAGE = `${PROFILE_PAGE_ROUTE}favorites`;
export const PROFILE_SINGLBOOKING_PAGE = `${PROFILE_PAGE_ROUTE}signBooking/:id`;
export const PLACE_PAGE_ROUTE = `${START_PAGE}place/:id`;
export const SIGN_IN_PAGE_ROUTE = `${START_PAGE}signIn`;
export const SIGN_UP_PAGE_ROUTE = `${START_PAGE}signUp`;