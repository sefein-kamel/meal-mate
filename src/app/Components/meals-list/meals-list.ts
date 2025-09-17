import { MealsService } from './../../services/meals-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ImealsList } from '../../models/imeals-list';
import { FavStorageService } from '../../services/fav-storage-service';

@Component({
  selector: 'app-meals-list',
  imports: [CommonModule, RouterModule ],
  templateUrl: './meals-list.html',
  styleUrl: './meals-list.css'
})
export class MealsList implements OnInit {
  meals: ImealsList[] = [];
  categoryName = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealsService,
    private favService: FavStorageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('name') || '';
      if (this.categoryName) {
        this.loadMeals(this.categoryName);
      }
    });
  }

  loadMeals(category: string) {
    this.loading = true;
    this.mealsService.getMealsByCategory(category).subscribe({
      next: (res) => {
        this.meals = res.meals;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading meals:', err);
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
