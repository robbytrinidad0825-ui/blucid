import {Routes} from '@angular/router';
import {Home} from './home';
import {Services} from './services';
import {ServiceDetail} from './service-detail';
import {About} from './about';
import {FAQ} from './faq';
import {Products} from './products';
import {ProductDetail} from './product-detail';
import {Contact} from './contact';
import {Portfolio} from './portfolio';
import {AdminLogin} from './admin-login';
import {AdminDashboard} from './admin-dashboard';
import {SolarCalculator} from './solar-calculator';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'services', component: Services},
  {path: 'services/:id', component: ServiceDetail},
  {path: 'about', component: About},
  {path: 'faq', component: FAQ},
  {path: 'products', component: Products},
  {path: 'products/:id', component: ProductDetail},
  {path: 'portfolio', component: Portfolio},
  {path: 'contact', component: Contact},
  {path: 'solar-calculator', component: SolarCalculator},
  {path: 'adminlogin', component: AdminLogin},
  {path: 'admindashboard', component: AdminDashboard},
  {path: '**', redirectTo: ''}
];
