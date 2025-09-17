import { FavoriteMeal } from './Components/favorite-meal/favorite-meal';
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
import { authGuardeGuard } from './guards/auth-guard';
import { preventGuardeGuard } from './guards/prevent-guard';
import { Search } from './Components/search/search';
import { MealDetails } from './Components/meal-details/meal-details';
import { MealsList } from './Components/meals-list/meals-list';


export const routes: Routes = [
  { path: 'home', component: Home, canActivate: [authGuardeGuard] },
  { path: 'about', component: About },
  { path: 'contact', component: Contact, data: { hideFooter: true } },
  { path: 'registration', component: Registration, canActivate: [preventGuardeGuard], data: { hideFooter: true } },
  { path: 'login', component: Login, canActivate: [preventGuardeGuard], data: { hideFooter: true } },
  { path: 'category/:name', component: MealsList, canActivate: [authGuardeGuard] },
  { path: 'meal/:id', component: MealDetails, canActivate: [authGuardeGuard] }, 
  { path: 'search', component: Search, canActivate: [authGuardeGuard] },
  { path: 'favorite', component: FavoriteMeal, canActivate: [authGuardeGuard] },

  // default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // NotFound route
  { path: '**', component: NotFound, data: { hideFooter: true } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), Home, About, Contact, MealDetails, Navbar, NotFound, Registration, MealsList],
  exports: [RouterModule]
})
export class AppRoutingModule {}
