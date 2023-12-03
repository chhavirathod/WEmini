import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'Dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Create Campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'Payment',
    imgUrl: payment,
    link: '/payments',
  },
  {
    name: 'Profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'Logout',
    imgUrl: logout,
    link: '/',
    disabled: false,
  },
];
