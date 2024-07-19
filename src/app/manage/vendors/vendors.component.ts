import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';
import { GlobalServicesService } from '../../global-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent implements OnInit, AfterViewInit {
  
  vendorList: any[] = [];
  roleList: any[] = [];
  dataTable: any;
  roleMap: { [key: string]: string } = {};
  constructor(private globalServices: GlobalServicesService, private authService: AuthService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
      this.loadVendors()
      this.loadRoles();
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }
  
  loadVendors() {
    this.globalServices.getvendors().subscribe(
      (response) => {
        console.log('getvendors Data', response.data.data);
        this.vendorList = response.data.data;
        this.initializeDataTable();
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  loadRoles() {
    this.globalServices.getroles().subscribe(
      (response: any) => {
        this.roleList = response.data.data;
        this.roleMap = this.roleList.reduce((map, role) => {
          map[role.role_id] = role.role;
          return map;
        }, {});
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  initializeDataTable() {
    $(() => {
      const table: any = $('#example');
      if ($.fn.DataTable.isDataTable(table)) {
        table.DataTable().destroy();
      }
      this.dataTable = table.DataTable({
        data: this.vendorList,
        columns: [
          { 
            title: 'S.No', 
            data: null,
            render: (data: any, type: any, row: any, meta: any) => {
              return meta.row + 1;
            }
          },
          { title: 'Full Name', data: 'vendor_name' },
          { title: 'Contact Number', data: 'contact_no' },
          { title: 'City', data: 'city' },
          { title: 'State', data: 'state' },
          { title: 'Country', data: 'country' },
          { title: 'Address', data: 'address' },
          { title: 'Pincode', data: 'pincode' },
          { title: 'Logo', data: 'logo' },
          { title: 'Lat', data: 'lat' },
          { title: 'Lng', data: 'lng' },
          { 
            title: 'Status', 
            data: null,
            render: (data: any, type: any, row: any) => {
              return row.status == 1 ? 'Active' : 'Inactive';
            }
          },
          { title: 'Created Date', data: 'created_at', render: (data: string) => {
            const date = new Date(data);
            const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            return formattedDate;
            }
          },
          {
            title: 'Action',
            data: null,
            render: (data: any, type: any, row: any) => {
              return `
                <a href="/vendor/edit/${row.vendor_id}" class="btn btn-sm btn-primary mr-2">
                  <i class="bi bi-pencil-square"></i>
                </a>
                <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${row.vendor_id}">
                  <i class="bi bi-trash"></i>
                </button>`;
            }
          }
        ],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const deleteButton = $(row).find('.delete-btn')[0];
          this.renderer.listen(deleteButton, 'click', () => {
            this.softDeleteCustomer(data);
          });
          return row;
        }
      });
    });
  }

  softDeleteCustomer(data: any) {
    if (confirm('Are you sure you want to delete this vendor?')) {
      let userpayload = { vendor_id: data.vendor_id, status: 0 };
      this.globalServices.updateVendor(userpayload).subscribe(
        (response) => {
          console.log('vendor status updated to Inactive', response);
          this.loadVendors();
        },
        (error) => {
          console.error('Error updating category status', error);
        }
      );
    }
  }


}