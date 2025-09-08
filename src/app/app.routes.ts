import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { Home } from './Components/home/home';
import { About } from './Components/about/about';
import { Contact } from './Components/contact/contact';
import { Navbar } from './Components/navbar/navbar';
import { NotFound } from './Components/not-found/not-found';
import { Registration } from './Components/registration/registration';
import { Login } from './Components/login/login';
import { authGuard } from './guards/auth-guard';
import { preventGuard } from './guards/prevent-guard';
import { Search } from './Components/search/search';
import { MealDetails } from './Components/meal-details/meal-details';
import { MealsList } from './Components/meals-list/meals-list';


export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'registration', component: Registration, canActivate: [preventGuard] },
  { path: 'login', component: Login, canActivate: [preventGuard] },
  { path: 'products', component: MealsList, canActivate: [authGuard] },
  { path: 'products/:id', component: MealDetails, canActivate: [authGuard] }, 
  { path: 'search', component: Search, canActivate: [authGuard] }, 

  // default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // NotFound route
  { path: '**', component: NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), Home, About, Contact, MealDetails, Navbar, NotFound, Registration, MealsList],
  exports: [RouterModule]
})
export class AppRoutingModule {}
