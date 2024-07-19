import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post(`${this.apiURL}/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.apiURL}/login`, user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('fullname');
    localStorage.removeItem('username');
  }

}
