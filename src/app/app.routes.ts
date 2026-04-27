import {Routes} from '@angular/router';
import {Home} from './home';
import {Services} from './services';
import {ServiceDetail} from './service-detail';
import {About} from './about';
import {FAQ} from './faq';
import {Products} from './products';
import {ProductDetail} from './product-detail';
import {Contact} from './contact';
import {AdminLogin} from './admin-login';
import {AdminDashboard} from './admin-dashboard';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'services', component: Services},
  {path: 'services/:id', component: ServiceDetail},
  {path: 'about', component: About},
  {path: 'faq', component: FAQ},
  {path: 'products', component: Products},
  {path: 'products/:id', component: ProductDetail},
  {path: 'contact', component: Contact},
  {path: 'adminlogin', component: AdminLogin},
  {path: 'admindashboard', component: AdminDashboard},
  {path: '**', redirectTo: ''}
];
