import { Component } from '@angular/core';
import { GlobalServicesService } from '../../global-services.service';
import { Router } from '@angular/router';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuData: any[] = [];
  constructor(private globalServices: GlobalServicesService, private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {
      this.getMenuList()
  }

  getMenuList(){
    this.globalServices.getMenuData().subscribe(
      (response) => {
        if (response && response.data) {
          this.menuData = response.data;
        }
        console.log(`menu data`,this.menuData)
      }
    );
  }

}
