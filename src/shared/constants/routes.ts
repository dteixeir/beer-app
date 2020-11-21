import { IRoute } from '@shared/interfaces';

export const enum ROUTE_NAMES {
  Signup = '/signup'
  , Login = '/login'
  , SignOut = '/login'
  , Brewery = '/brewery'
  , Beer = '/beer'
}

export const ROUTES: IRoute[] = [
  {
    url: '/signup'
    , name: 'Sign Up'
    , iconName: 'face'
    , showIfAuthenticated: false
    , dontShowIfAuthenticated: true
  },
  {
    url: '/login'
    , name: 'Login'
    , iconName: 'input'
    , showIfAuthenticated: false
    , dontShowIfAuthenticated: true
  },
  {
    url: '/login'
    , name: 'Sign Out'
    , iconName: 'eject'
    , showIfAuthenticated: true
    , dontShowIfAuthenticated: false
  },
  {
    url: '/brewery'
    , name: 'Brewery'
    , iconName: 'location_city'
    , showIfAuthenticated: true
    , dontShowIfAuthenticated: false
  },
  {
    url: '/beer'
    , name: 'Beer'
    , iconName: ''
    , showIfAuthenticated: true
    , dontShowIfAuthenticated: false
  }
];
