import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalServicesService } from '../../../global-services.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  cate: any = { cat_name: [], status: '' };
  isEdit: boolean = false;

  constructor(private globalServices: GlobalServicesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let paramId = this.activatedRoute.snapshot.paramMap.get('id')
    if(paramId){
      console.log(`geturlparams`,paramId);
    this.getCategoryDataById(paramId)
    this.isEdit = true;
    }
  }

  getCategoryDataById(paramId:any) {
    this.globalServices.getCategoryId(paramId).subscribe(
      (response) => {
        console.log('categories Data', response.data);
        this.cate = response.data
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  addCategory(): void{
    console.log(`cat_name`,this.cate.cat_name);
    if (Array.isArray(this.cate.cat_name) && this.cate.cat_name.length > 0) {
      this.globalServices.addcategory({ cat_name: this.cate.cat_name }).subscribe({
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
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  updateCategory(): void {
    if (this.cate.id && this.cate.cat_name.trim().length > 0) {
      this.globalServices.updatecategory(this.cate).subscribe({
        next: (res: any) => {
          console.log('updateCategory Response:', res);
          alert(res.message);
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          console.error('updateCategory Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter a category name');
    }
  }

  backTo(){
    this.router.navigate(['/categories']);
  }
}
