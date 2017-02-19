import AppComponent from '../components/app.jsx';
import IndexComponent from '../components/index.jsx';
import AboutComponent from '../components/about.jsx';

export const routes = {
  path: '',
  component: AppComponent,
  childRoutes: [
    {
      path: '/',
      component: IndexComponent
    },
    {
      path: '/about',
      component: AboutComponent
    }
  ]
};

