import { ImealsList } from './../../models/imeals-list';
import { MealsService } from './../../services/meals-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ImealDetails } from '../../models/imeal-details';
import { FavStorageService } from '../../services/fav-storage-service';

@Component({
  selector: 'app-meal-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css'
})
export class MealDetails implements OnInit {
  meal: ImealDetails | null = null;
  loading = true;
  isFav = false;

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealsService,
    private favService: FavStorageService 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMeal(id);
    }
  }

  loadMeal(id: string) {
    this.mealsService.getMealDetails(id).subscribe({
      next: (res) => {
        this.meal = res.meals[0];
        this.loading = false;
        this.isFav = this.favService.isFavorite(this.meal.idMeal);
      },
      error: (err) => {
        console.error('Error loading meal details:', err);
        this.loading = false;
      }
    });
  }

  // helper: رجع المكونات + المقادير
  getIngredients(): string[] {
    if (!this.meal) return [];
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = (this.meal as any)[`strIngredient${i}`];
      const measure = (this.meal as any)[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  }

  toggleFavorite() {
  if (!this.meal) return;
  
  const mealObj: ImealsList = {
    idMeal: this.meal.idMeal,
    strMeal: this.meal.strMeal,
    strMealThumb: this.meal.strMealThumb
  };

  if (this.isFav) {
    this.favService.removeFavorite(this.meal.idMeal);
    this.isFav = false;
  } else {
    this.favService.addFavorite(mealObj);
    this.isFav = true;
  }
}

}
