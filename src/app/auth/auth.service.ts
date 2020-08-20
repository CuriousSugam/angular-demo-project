import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserData {
  fullname: string;
  email: string;
}

export interface ErrorData {
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user$ = new BehaviorSubject<UserData>(null);

  constructor(private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const promise = new Promise((resolve, reject) => {
      // This is to simulate api request delay.
      // To be replaced after api integration.
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
          resolve({
            fullname: 'Sugam Shakya',
            email: 'sugamshakya@lftechnology.com',
          });
        }

        reject({
          message: 'Invalid username or password',
          status: '401 Unauthorized',
        });
      }, 1000);
    });

    return from(promise).pipe(
      tap((userData) => {
        this.user$.next(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
      })
    );
  }

  autoLogin(): void {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    this.user$.next(userData);
  }

  logout(): void {
    this.user$.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
