import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalServicesService } from '../../../global-services.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.css'
})
export class RolesFormComponent {

  roleData: any = { role: '', role_name: [], role_status: '' };
  isEdit: boolean = false;

  constructor(private globalServices: GlobalServicesService, private router: Router, private activatedRoute: ActivatedRoute) { }

 ngOnInit(): void {
    let paramId = this.activatedRoute.snapshot.paramMap.get('id')
    if(paramId){
      console.log(`geturlparams`,paramId);
    this.getRoleDataById(paramId)
    this.isEdit = true;
    }
  }

  getRoleDataById(paramId:any) {
    this.globalServices.getRoleName(paramId).subscribe(
      (response) => {
        console.log('role Data', response.data);
        this.roleData = response.data
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  addRole(): void{
    console.log(`role_name`,this.roleData.role_name);
    if (this.roleData.role && this.roleData.role_name) {
      this.globalServices.addrole({ subcat_id: this.roleData.role, brand_name: this.roleData.role_name }).subscribe({
        next: (res: any) => {
          console.log('add Role Response:', res);
          alert(res.message);
        },
        error: (err) => {
          console.error('add Role Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter at least one role name and role');
    }
  }

  handleSubmit(): void {
    if (this.isEdit) {
      this.updateBrands();
    } else {
      this.addRole();
    }
  }

  updateBrands(): void {
    // if (this.brand.id && this.brand.subcat_id && this.brand.image_url && this.brand.brand_name.trim().length > 0) {
    //   this.globalServices.updatebrand(this.brand).subscribe({
    //     next: (res: any) => {
    //       console.log('updatebrand Response:', res);
    //       alert(res.message);
    //       this.router.navigate(['/brands']);
    //     },
    //     error: (err) => {
    //       console.error('updatebrand Error:', err);
    //       alert(err.error.message);
    //     }
    //   });
    // } else {
    //   alert('Please enter a brand name and image url');
    // }
  }

  backTo(){
    this.router.navigate(['/roles']);
  }

}
