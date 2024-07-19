import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';
import { GlobalServicesService } from '../../global-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit, AfterViewInit {
  
  usersList: any[] = [];
  roleList: any[] = [];
  dataTable: any;
  roleMap: { [key: string]: string } = {};
  constructor(private globalServices: GlobalServicesService, private authService: AuthService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
      this.loadUsers()
      this.loadRoles();
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }
  
  loadUsers() {
    this.globalServices.getusers().subscribe(
      (response) => {
        console.log('getusers Data', response.data);
        this.usersList = response.data;
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
      console.log('initializeDataTable Data', this.usersList);
      this.dataTable = table.DataTable({
        data: this.usersList,
        columns: [
          { 
            title: 'S.No', 
            data: null,
            render: (data: any, type: any, row: any, meta: any) => {
              return meta.row + 1;
            }
          },
          { 
            title: 'Role', 
            data: 'role',
            render: (data: any, type: any, row: any) => {
              return this.roleMap[data] || 'Unknown';
            }
          },
          { title: 'Full Name', data: 'fname' },
          { title: 'User Name', data: 'username' },
          { title: 'Email', data: 'email' },
          { title: 'Contact Number', data: 'contact_no' },
          { title: 'Address', data: 'address' },
          { title: 'Country', data: 'country' },
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
          }
          // ,{
          //   title: 'Action',
          //   data: null,
          //   render: (data: any, type: any, row: any) => {
          //     return `
          //       <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${row.id}">
          //         <i class="bi bi-trash"></i>
          //       </button>`;
          //   }
          // }
        ],
        // rowCallback: (row: Node, data: any[] | Object, index: number) => {
        //   const deleteButton = $(row).find('.delete-btn')[0];
        //   this.renderer.listen(deleteButton, 'click', () => {
        //     this.softDeleteCustomer(data);
        //   });
        //   return row;
        // }
      });
    });
  }

  // softDeleteCustomer(data: any) {
  //   if (confirm('Are you sure you want to delete this user?')) {
  //     let userpayload = { id: data.id, status: 0 };
  //     this.globalServices.updatecategory(category).subscribe(
  //       (response) => {
  //         console.log('Category status updated to Inactive', response);
  //         this.loadUsers();
  //       },
  //       (error) => {
  //         console.error('Error updating category status', error);
  //       }
  //     );
  //   }
  // }


}