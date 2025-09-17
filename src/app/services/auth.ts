import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  // login
  login(username: string, password: string): Observable<any> {
    return this.http
      .post('https://dummyjson.com/auth/login', {
        username,
        password,
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem(this.tokenKey, res.accessToken);
          this.saveUser(res);
        })
      );
  }

    // register
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`https://dummyjson.com/users/add`, {
      username,
      email,
      password
    })
    .pipe(
      tap((res: any) => {
        this.saveUser(res);
      })
    );
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem(this.tokenKey)) {
      return true;
    }
    return false;
  }

  // saveUser
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // getUser
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
