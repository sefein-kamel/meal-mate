import { Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./Components/navbar/navbar";
import { Footer } from "./Components/footer/footer";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('meal-mate');

  isShow = false;
  topPosToStartShowing = 500;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset 
      || document.documentElement.scrollTop 
      || document.body.scrollTop 
      || 0;

    this.isShow = scrollPosition >= this.topPosToStartShowing;
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  hideFooter = false;
  
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const hiddenRoutes = ['/login', '/register', '/contact'];
      this.hideFooter = hiddenRoutes.includes(this.router.url) || !this.router.config.some(r => '/' + r.path === this.router.url);
    });
  }
}
