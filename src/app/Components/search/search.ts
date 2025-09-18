import { MealsService } from './../../services/meals-service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImealsList } from '../../models/imeals-list';
import { FavStorageService } from '../../services/fav-storage-service';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  searchTerm = '';
  meals: ImealsList[] = [];
  loading = false;
  noResults = false;

  constructor(
    private MealsService: MealsService,
    private favService: FavStorageService
  ) {}

  onSearch() {
    if (!this.searchTerm.trim()) return;

    this.loading = true;
    this.noResults = false;

    this.MealsService.searchMealsByName(this.searchTerm).subscribe({
      next: (res) => {
        this.meals = res.meals || [];
        this.noResults = this.meals.length === 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error searching meals:', err);
        this.loading = false;
      }
    });
  }

  isFavorite(id: string): boolean {
    return this.favService.isFavorite(id);
  }

  toggleFavorite(meal: ImealsList) {
    if (this.isFavorite(meal.idMeal)) {
      this.favService.removeFavorite(meal.idMeal);
    } else {
      this.favService.addFavorite(meal);
    }
  }

}