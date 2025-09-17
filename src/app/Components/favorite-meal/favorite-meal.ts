import { ImealsList } from './../../models/imeals-list';
import { Icategory } from './../../models/icategory';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MealsService } from '../../services/meals-service';
import { FavStorageService } from '../../services/fav-storage-service';

@Component({
  selector: 'app-favorite-meal',
  imports: [CommonModule, RouterModule],
  templateUrl: './favorite-meal.html',
  styleUrl: './favorite-meal.css'
})
export class FavoriteMeal implements OnInit {
favorites: ImealsList[] = [];

  constructor(private favService: FavStorageService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favorites = this.favService.getFavorites();
  }

  removeMeal(id: string) {
    this.favService.removeFavorite(id);
    this.loadFavorites();
  }
}
