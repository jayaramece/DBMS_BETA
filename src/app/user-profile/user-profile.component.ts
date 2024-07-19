import { Component, OnInit } from '@angular/core';
import { GlobalServicesService } from '../global-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userData:any;
  roleName: string | undefined;
  roleSubName: string | undefined;
  password = { currentPassword: '', newPassword: '', renewPassword: '' };

  constructor(private globalServices: GlobalServicesService, private router: Router) {}

  ngOnInit(): void {
    // if (localStorage.getItem('token')) {
    //   this.getUserDetails()
    //   this.fetchRoleName(localStorage.getItem('roleId'));
    // }else{
    //   localStorage.removeItem('token');
    //   alert('Token Expired')
    //   this.router.navigate(['/login']);
    // }
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

updateProfile(){
  console.log(`userprofile`,this.userData)
  this.globalServices.updateProfileInfo(this.userData).subscribe(
    (response :any) => {
      console.log(`profile Data`,response)
      alert(response.message)
    },
    (error: any) => {
      console.error('Error fetching data', error);
    }
  );
}

updatePassword(){
  console.log(`password`,this.password)
  if( this.password.currentPassword !=="" && this.password.newPassword !=="" && this.password.renewPassword !=="" ){
    if(this.password.newPassword === this.password.renewPassword){
      let updatePass = {
        old_password: this.password.currentPassword,
        new_password: this.password.newPassword
      };
      console.log(`userData`, this.userData);
      this.globalServices.updatePassInfo(updatePass).subscribe(
        (response: any) => {
          console.log(`profile Data`, response);
          localStorage.removeItem('token');
          alert(response.message);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          alert('Enter Current Password Incorectly');
          console.error('Error fetching data', error.message);
        }
      );
    }else{
      alert('New password and confirm password do not match.')
    }
  }else{
    alert("Please fill in all required fields.")
  }

}

}
