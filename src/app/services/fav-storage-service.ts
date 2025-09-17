import { Injectable } from '@angular/core';
import { ImealsList } from '../models/imeals-list';

@Injectable({
  providedIn: 'root'
})
export class FavStorageService {
  private favoritesKey = 'favorites';

  // get Favorites meal
  getFavorites(): ImealsList[] {
    return JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
  }

  // add Favorite meal
  addFavorite(meal: ImealsList) {
    const favorites = this.getFavorites();
    if (!this.isFavorite(meal.idMeal)) {
      favorites.push(meal);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  // remove Favorite meal
  removeFavorite(idMeal: string) {
    const favorites = this.getFavorites().filter(m => m.idMeal !== idMeal);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  // is Favorite meal
  isFavorite(idMeal: string): boolean {
    return this.getFavorites().some(m => m.idMeal === idMeal);
  }
}
