import { Component, OnInit  } from '@angular/core';
import { GlobalServicesService } from '../../global-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userData: any;
  roleName: string | undefined;
  roleSubName: string | undefined;
  
  constructor(private globalServices: GlobalServicesService, private authService: AuthService, private router: Router, private toastService: ToastService) {}
  headerName: string = '';

  ngOnInit(): void {
    if (localStorage.getItem('fullname')) {
      const fullname = localStorage.getItem('fullname');
      this.headerName = fullname !== null ? fullname : '';
    }
  }
  getUserDetails(){
    this.globalServices.getData().subscribe(
      (response) => {
        const { password, ...userWithoutPassword } = response;
        this.userData = userWithoutPassword;
        console.log(`user Data`,this.userData)
      },
      (error) => {
        localStorage.removeItem('token');
        alert('Token Expired')
        this.router.navigate(['/login']);
        console.error('Error fetching data', error);
      }
    );
  }

  fetchRoleName(roleId: any) {
    this.globalServices.getRoleName(roleId).subscribe(
      (response: any) => {
        this.roleName = response.data.role;
        this.roleSubName = response.data.role_name;
        console.log('Role name fetched successfully:', this.roleName);
      },
      (error: any) => {
        console.error('Error fetching role name:', error);
      }
    );
  }
  
  logout(): void {
    this.authService.logout();
    this.toastService.showSuccess('Sign Out Succcessfully..!');
    this.router.navigate(['/login']);
  }
}
