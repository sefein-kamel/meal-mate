import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Icategory } from '../models/icategory';
import { ImealsList } from '../models/imeals-list';
import { ImealDetails } from '../models/imeal-details';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  // get Categories
  getCategories(): Observable<{ categories: Icategory[] }> {
    return this.http.get<{ categories: Icategory[] }>(
      `${this.baseUrl}/categories.php`
    );
  }

  // get Meals By Category
  getMealsByCategory(category: string): Observable<{ meals: ImealsList[] }> {
    return this.http.get<{ meals: ImealsList[] }>(
      `${this.baseUrl}/filter.php?c=${category}`
    );
  }

  // get Meal Details
  getMealDetails(id: string): Observable<{ meals: ImealDetails[] }> {
    return this.http.get<{ meals: ImealDetails[] }>(
      `${this.baseUrl}/lookup.php?i=${id}`
    );
  }

  // search Meals By Name
  searchMealsByName(name: string): Observable<{ meals: ImealDetails[] }> {
    return this.http.get<{ meals: ImealDetails[] }>(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
  }
}
