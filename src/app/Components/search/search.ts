import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
    keyword: string = '';
  products: any[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  searchProducts() {
    if (!this.keyword.trim()) return;

    this.isLoading = true;
    this.http.get<any>(`https://dummyjson.com/products/search?q=${this.keyword}`)
      .subscribe({
        next: (res) => {
          this.products = res.products;
          this.isLoading = false;
        },
        error: () => {
          this.products = [];
          this.isLoading = false;
        }
      });
  }
}