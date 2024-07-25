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
  updateProfileInfo(profiledata:any): Observable<any> {
    return this.http.post<any>(`${this.globalApiURL}auth/update-profile`, profiledata);
  }
  updatePassInfo(passdata:any): Observable<any> {
    return this.http.post<any>(`${this.globalApiURL}auth/update-password`, passdata);
  }
  getRoleName(roleId: number): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}meta/role/${roleId}`);
  } 

  // manage api's
  addCompanyData(payload: any) {
    return this.http.post(`${this.globalApiURL}companies/add/info`, payload);
  }
  getCompanyInfo(campany: any): Observable<any> {
    return this.http.get<any>(`${this.globalApiURL}companies/info/${campany}`);
  }
  updateCompanyData(payload: any) {
    return this.http.put(`${this.globalApiURL}companies/update/info`, payload);
  }
  


}
