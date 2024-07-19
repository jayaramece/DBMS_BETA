import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-dashboard';

  constructor(private router: Router) {}

  isAuthRoute(): boolean {
    const authRoutes = ['/login', '/register', '/forgot-password'];
    return authRoutes.includes(this.router.url);
  }


}
