import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalServicesService } from '../../../global-services.service';

@Component({
  selector: 'app-subcategory-form',
  templateUrl: './subcategory-form.component.html',
  styleUrl: './subcategory-form.component.css'
})
export class SubcategoryFormComponent {

  categoriesList: any[] = [];
  subcate: any = { cat_id: '', sub_name: [], status: '' };
  isEdit: boolean = false;

  constructor(private globalServices: GlobalServicesService, private router: Router, private activatedRoute: ActivatedRoute) { }

 ngOnInit(): void {
    let paramId = this.activatedRoute.snapshot.paramMap.get('id')
    if(paramId){
      console.log(`geturlparams`,paramId);
    this.getSubCategoryDataById(paramId)
    this.isEdit = true;
    }
    this.loadCategories()
  }

  getSubCategoryDataById(paramId:any) {
    this.globalServices.getSubCategoryId(paramId).subscribe(
      (response) => {
        console.log('sub categories Data', response.data);
        this.subcate = response.data
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  loadCategories() {
    this.globalServices.getCategories().subscribe(
      (response: any) => {
        this.categoriesList = response.data.data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  addSubCategory(): void{
    console.log(`sub_name`,this.subcate.sub_name);
    if (Array.isArray(this.subcate.sub_name) && this.subcate.cat_id && this.subcate.sub_name.length > 0) {
      this.globalServices.addsubcategory({ cat_id: this.subcate.cat_id, subcat_name: this.subcate.sub_name }).subscribe({
        next: (res: any) => {
          console.log('addCategory Response:', res);
          alert(res.message);
        },
        error: (err) => {
          console.error('addCategory Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter at least one category name');
    }
  }

  handleSubmit(): void {
    if (this.isEdit) {
      this.updateSubCategory();
    } else {
      this.addSubCategory();
    }
  }

  updateSubCategory(): void {
    if (this.subcate.id && this.subcate.cat_id && this.subcate.sub_name.trim().length > 0) {
      this.globalServices.updatesubcategory(this.subcate).subscribe({
        next: (res: any) => {
          console.log('updateCategory Response:', res);
          alert(res.message);
          this.router.navigate(['/sub-categories']);
        },
        error: (err) => {
          console.error('updateSubCategory Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter a sub category name');
    }
  }

  backTo(){
    this.router.navigate(['/sub-categories']);
  }

}
