import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CarDetailsComponent} from './components/car-details/car-details.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {SearchComponent} from './components/search/search.component';
import {BookingFormComponent} from './components/booking-form/booking-form.component';
import {AdminGuard} from './guard/admin.guard';
import {ManageCarsComponent} from './components/manage-cars/manage-cars.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  //{ path: '**', redirectTo: '/' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'manage-cars', component: ManageCarsComponent, canActivate: [AdminGuard] },
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'car-details/:id', component: CarDetailsComponent},
  { path: 'book/:id', component: BookingFormComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];
