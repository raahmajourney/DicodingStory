import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import AddStoryPage from '../pages/addstory/addstory-page';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page';
import DetailPage from '../pages/detailstory/detail-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
 '/addstory': new AddStoryPage(),
 '/login': new LoginPage(),
 '/register': new RegisterPage(),
 '/detail/:id': new DetailPage, //
};

export default routes;
