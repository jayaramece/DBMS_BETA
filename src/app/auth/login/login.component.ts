import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = { user_name: '', password: '' };
  password: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.router.navigate(['/dashboard']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (this.showPassword) {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }

  login() {
    if(this.user.user_name !=="" && this.user.password !==""){
      this.authService.login(this.user).subscribe({
        next: (res: any) => {
          console.log(`login data`,res.user)
          localStorage.setItem('userId', res.user.id);
          localStorage.setItem('fullname', res.user.full_name);
          localStorage.setItem('username', res.user.user_name);
          this.toastService.showSuccess(res.message)
          this.router.navigate(['/dashboard']);
        },
        error: (err) => this.toastService.showError(err.error.message)
      });
    }else{
      this.toastService.showError('User Name and Password Required');
    }
  }

}
