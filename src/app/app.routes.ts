import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CarDetailsComponent} from './car-details/car-details.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {SearchComponent} from './search/search.component';
import {BookingFormComponent} from './booking-form/booking-form.component';
import {AdminGuard} from './guard/admin.guard';
import {ManageCarsComponent} from './manage-cars/manage-cars.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';

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
