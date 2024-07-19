import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalServicesService } from '../../../global-services.service';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrl: './brands-form.component.css'
})
export class BrandsFormComponent {

  subcate: any[] = [];
  brand: any = { subcat_id: '', brand_name: [], image_url: [], status: '' };
  isEdit: boolean = false;

  constructor(private globalServices: GlobalServicesService, private router: Router, private activatedRoute: ActivatedRoute) { }

 ngOnInit(): void {
    let paramId = this.activatedRoute.snapshot.paramMap.get('id')
    if(paramId){
      console.log(`geturlparams`,paramId);
    this.getBrandDataById(paramId)
    this.isEdit = true;
    }
    this.loadSubCategories()
  }

  getBrandDataById(paramId:any) {
    this.globalServices.getbrandId(paramId).subscribe(
      (response) => {
        console.log('brand Data', response.data);
        this.brand = response.data
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  loadSubCategories() {
    this.globalServices.getSubCategories().subscribe(
      (response: any) => {
        this.subcate = response.data.data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  addBrand(): void{
    console.log(`brand_name`,this.brand.brand_name);
    if (Array.isArray(this.brand.brand_name) && Array.isArray(this.brand.image_url) && this.brand.subcat_id && this.brand.brand_name.length > 0) {
      this.globalServices.addbrand({ subcat_id: this.brand.subcat_id, brand_name: this.brand.brand_name, image_url: this.brand.image_url }).subscribe({
        next: (res: any) => {
          console.log('addBrand Response:', res);
          alert(res.message);
        },
        error: (err) => {
          console.error('addBrand Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter at least one brand name and image url');
    }
  }

  handleSubmit(): void {
    if (this.isEdit) {
      this.updateBrands();
    } else {
      this.addBrand();
    }
  }

  updateBrands(): void {
    if (this.brand.id && this.brand.subcat_id && this.brand.image_url && this.brand.brand_name.trim().length > 0) {
      this.globalServices.updatebrand(this.brand).subscribe({
        next: (res: any) => {
          console.log('updatebrand Response:', res);
          alert(res.message);
          this.router.navigate(['/brands']);
        },
        error: (err) => {
          console.error('updatebrand Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter a brand name and image url');
    }
  }

  backTo(){
    this.router.navigate(['/brands']);
  }

}