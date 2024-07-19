import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalServicesService } from '../../../global-services.service';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrl: './vendor-form.component.css'
})
export class VendorFormComponent  implements OnInit {

  vendorList: any = { vendor_name: '', contact_no: '', city: '', state: '', country: '', address: '', pincode: '', logo: '', lat: '', lng: '', status: '' };
  isEdit: boolean = false;

  constructor(private globalServices: GlobalServicesService, private router: Router, private activatedRoute: ActivatedRoute) { }

 ngOnInit(): void {
    let paramId = this.activatedRoute.snapshot.paramMap.get('id')
    if(paramId){
      console.log(`geturlparams`,paramId);
    this.getVendorDataById(paramId)
    this.isEdit = true;
    }
  }

  getVendorDataById(paramId:any) {
    this.globalServices.getvendorId(paramId).subscribe(
      (response) => {
        console.log('products Data', response.data);
        this.vendorList = response.data
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  addVendor(): void{
    console.log(`vendor payload`,this.vendorList);
    if (this.vendorList.vendor_name && this.vendorList.contact_no && this.vendorList.city && this.vendorList.state && this.vendorList.pincode && this.vendorList.country && this.vendorList.address ) {
      let vendorObj = { 
        vendor_name: this.vendorList.vendor_name,
        contact_no: this.vendorList.contact_no,
        city: this.vendorList.city,
        state: this.vendorList.state,
        country: this.vendorList.country,
        address: this.vendorList.address,
        pincode: this.vendorList.pincode,
        logo: this.vendorList.logo,
        lat: this.vendorList.lat,
        lng: this.vendorList.lng
       }
       
      this.globalServices.addvendor(vendorObj).subscribe({
        next: (res: any) => {
          console.log('addvendor Response:', res);
          alert(res.message);
        },
        error: (err) => {
          console.error('addvendor Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter required fields');
    }
  }

  handleSubmit(): void {
    if (this.isEdit) {
      this.updateVendor();
    } else {
      this.addVendor();
    }
  }

  updateVendor(): void {
    if (this.vendorList.vendor_id && this.vendorList.vendor_name && this.vendorList.contact_no && this.vendorList.city && this.vendorList.state && this.vendorList.pincode && this.vendorList.country && this.vendorList.address ) {
      this.vendorList.vendor_id = this.vendorList.vendor_id
      this.globalServices.updateVendor(this.vendorList).subscribe({
        next: (res: any) => {
          console.log('update vendor Response:', res);
          alert(res.message);
          this.router.navigate(['/vendors-list']);
        },
        error: (err) => {
          console.error('update vendor Error:', err);
          alert(err.error.message);
        }
      });
    } else {
      alert('Please enter a valid data');
    }
  }

  backTo(){
    this.router.navigate(['/vendors-list']);
  }

}