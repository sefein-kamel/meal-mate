import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post('https://dummyjson.com/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem(this.tokenKey, res.accessToken);
        })
      );
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem(this.tokenKey)) {
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
