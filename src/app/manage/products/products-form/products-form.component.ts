import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalServicesService } from '../../../global-services.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent implements OnInit {

  brandList: any[] = [];
  vendorList: any[] = [];
  productList: any = { brand_id: '', vendor_id: '', product_name: '', description: '', mrp: '', discount_percentage: '', price: '', stock: '', image_urls: [], status: '' };
  isEdit: boolean = false;

  constructor(private globalServices: GlobalServicesService, private router: Router, private activatedRoute: ActivatedRoute) { }

 ngOnInit(): void {
    let paramId = this.activatedRoute.snapshot.paramMap.get('id')
    if(paramId){
      console.log(`geturlparams`,paramId);
    this.getProductDataById(paramId)
    this.isEdit = true;
    }
    this.loadBrands()
    this.loadVendors()
  }

  getProductDataById(paramId:any) {
    this.globalServices.getProductId(paramId).subscribe(
      (response) => {
        console.log('products Data', response.data);
        this.productList = response.data
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  loadBrands() {
    this.globalServices.getbrands().subscribe(
      (response: any) => {
        this.brandList = response.data.data;
      },
      (error) => {
        console.error('Error fetching brand', error);
      }
    );
  }

  loadVendors() {
    this.globalServices.getvendors().subscribe(
      (response: any) => {
        this.vendorList = response.data.data;
      },
      (error) => {
        console.error('Error fetching vendorList', error);
      }
    );
  }

  addProduct(): void{
    console.log(`product name`,this.productList);
    if (Array.isArray(this.productList.image_urls) && this.productList.brand_id && this.productList.vendor_id && this.productList.product_name && this.productList.mrp && this.productList.discount_percentage && this.productList.price && this.productList.stock ) {
      let productObj = { 
        vendor_id: this.productList.vendor_id,
        brand_id: this.productList.brand_id,
        product_name: this.productList.product_name,
        mrp: this.productList.mrp,
        discount_percentage: this.productList.discount_percentage,
        price: this.productList.price,
        stock: this.productList.stock,
        description: this.productList.description,
        image_urls: this.productList.image_urls
       }
       
    console.log(`product name`,this.productList);
      this.globalServices.addproduct(productObj).subscribe({
        next: (res: any) => {
          console.log('addProduct Response:', res);
          alert(res.message);
        },
        error: (err) => {
          console.error('addProduct Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter required fields');
    }
  }

  handleSubmit(): void {
    if (this.isEdit) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  updateProduct(): void {
    if (this.productList.brand_id && this.productList.vendor_id && this.productList.product_name && this.productList.mrp && this.productList.discount_percentage && this.productList.price && this.productList.stock ) {
      this.productList.product_id = this.productList.id
      this.globalServices.updateProduct(this.productList).subscribe({
        next: (res: any) => {
          console.log('update product Response:', res);
          alert(res.message);
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('update product Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter a valid data');
    }
  }

  backTo(){
    this.router.navigate(['/products']);
  }

}
