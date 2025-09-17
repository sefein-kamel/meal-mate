import { Icategory } from './../../models/icategory';
import { Component, OnInit } from '@angular/core';
import { MealsService } from '../../services/meals-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
 categories: Icategory[] = [];
  loading = true;

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.mealsService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.categories;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.loading = false;
      }
    });
  }
}
