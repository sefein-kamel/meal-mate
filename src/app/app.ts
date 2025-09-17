import { Component, HostListener, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./Components/navbar/navbar";
import { Footer } from "./Components/footer/footer";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        this.hideFooter = child?.snapshot.data?.['hideFooter'] || false;
      });
  }
}
