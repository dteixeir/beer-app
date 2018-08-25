import { Route } from './model.index';

const enum RouteNames {
  Signup = '/signup',
  Login = '/login',
  SignOut = '/login',
  Breweries = '/brewery'
}

const Routes: Route[] = [
  {
    url: '/signup',
    name: 'Sign Up',
    iconName: 'face',
    showIfAuthenticated: false,
    dontShowIfAuthenticated: true
  },
  {
    url: '/login',
    name: 'Login',
    iconName: 'input',
    showIfAuthenticated: false,
    dontShowIfAuthenticated: true
  },
  {
    url: '/login',
    name: 'Sign Out',
    iconName: 'eject',
    showIfAuthenticated: true,
    dontShowIfAuthenticated: false
  },
  {
    url: '/brewery',
    name: 'Breweries',
    iconName: 'location_city',
    showIfAuthenticated: false,
    dontShowIfAuthenticated: false
  }
];

export { RouteNames, Routes };
