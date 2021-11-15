import { lazy } from 'react';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const ListLeaners = lazy(() => import('../pages/Leaners/Lists'));
const LeanerForm = lazy(() => import('../pages/Leaners/LeanerForm'));

const Forms = lazy(() => import('../pages/Forms'));
const Cards = lazy(() => import('../pages/Cards'));
const Charts = lazy(() => import('../pages/Charts'));
const Buttons = lazy(() => import('../pages/Buttons'));
const Modals = lazy(() => import('../pages/Modals'));
const Tables = lazy(() => import('../pages/Tables'));
const Page404 = lazy(() => import('../pages/404'));
const Blank = lazy(() => import('../pages/Blank'));

const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    isPrivate: true 
  },
  {
    path: '/leaners', 
    component: ListLeaners,
    isPrivate: true 
  },
  {
    path: '/leaner', 
    component: LeanerForm,
    isPrivate: true 
  },
  {
    path: '/leaner/:id', 
    component: LeanerForm,
    isPrivate: true 
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  }
];

export default routes;
