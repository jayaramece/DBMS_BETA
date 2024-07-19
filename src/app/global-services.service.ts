import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalServicesService {

  private globalApiURL = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.post<any>(`${this.globalApiURL}auth/profile`, {});
  }
  getMenuData(): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/getmenulist`);
  }
  getRoleName(roleId: number): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/role/${roleId}`);
  }
  updateProfileInfo(profiledata:any): Observable<any> {
    return this.http.post<any>(`${this.globalApiURL}auth/update-profile`, profiledata);
  }
  updatePassInfo(passdata:any): Observable<any> {
    return this.http.post<any>(`${this.globalApiURL}auth/update-password`, passdata);
  }
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/getcategories`);
  }
  addcategory(category: any) {
    return this.http.post(`${this.globalApiURL}meta/category`, category);
  }
  getCategoryId(catId: number): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/getcategories/${catId}`);
  }
  updatecategory(catdata:any): Observable<any> {
    return this.http.put<any>(`${this.globalApiURL}meta/updatecategory`, catdata);
  }
  getSubCategories(): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/getsubcategories`);
  }
  addsubcategory(payload: any) {
    return this.http.post(`${this.globalApiURL}meta/subcategory`, payload);
  }
  getSubCategoryId(subcatId: number): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/getsubcategories/${subcatId}`);
  }
  updatesubcategory(subcatdata:any): Observable<any> {
    return this.http.put<any>(`${this.globalApiURL}meta/updatesubcategory`, subcatdata);
  }
  getbrands(): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/getbrands`);
  }
  getbrandId(brandId: number): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/getbrands/${brandId}`);
  }
  addbrand(payload: any) {
    return this.http.post(`${this.globalApiURL}meta/brands`, payload);
  }
  updatebrand(brand:any): Observable<any> {
    return this.http.put<any>(`${this.globalApiURL}meta/updatebrands`, brand);
  }
  getvendors(): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}vendor/info`);
  }
  getvendorId(vendorId: number): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}vendor/info/${vendorId}`);
  }
  getproducts(): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}product/fetch`);
  }
  addproduct(payload: any) {
    return this.http.post(`${this.globalApiURL}product/add`, payload);
  }
  updateProduct(product:any): Observable<any> {
    return this.http.put<any>(`${this.globalApiURL}product/update`, product);
  }
  getProductId(productId: number): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}product/fetch/${productId}`);
  }
  getusers(): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}auth`);
  }
  getroles(): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/allroles`);
  }
  addvendor(payload: any) {
    return this.http.post(`${this.globalApiURL}vendor/add/info`, payload);
  }
  updateVendor(vendor:any): Observable<any> {
    return this.http.put<any>(`${this.globalApiURL}vendor/update/info`, vendor);
  }
  addrole(payload: any) {
    return this.http.post(`${this.globalApiURL}meta/role`, payload);
  }


}
