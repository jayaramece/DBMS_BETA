import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';
import { GlobalServicesService } from '../../global-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [DatePipe]
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  
  categoriesList: any[] = [];
  dataTable: any;
  constructor(private globalServices: GlobalServicesService, private authService: AuthService, private router: Router, private datePipe: DatePipe, private renderer: Renderer2) { }

  ngOnInit(): void {
      this.getCategories()
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }
  
  getCategories() {
    this.globalServices.getCategories().subscribe(
      (response) => {
        console.log('categories Data', response.data.data);
        this.categoriesList = response.data.data;
        this.initializeDataTable();
      },
      (error) => {
        console.error('Error fetching data', error);
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
        data: this.categoriesList,
        columns: [
          { 
            title: 'S.No', 
            data: null,
            render: (data: any, type: any, row: any, meta: any) => {
              return meta.row + 1;
            }
          },
          { title: 'Category', data: 'cat_name' },
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
                <a href="/category/edit/${row.id}" class="btn btn-sm btn-primary mr-2">
                  <i class="bi bi-pencil-square"></i>
                </a>
                <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${row.id}">
                  <i class="bi bi-trash"></i>
                </button>`;
            }
          }
        ],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const deleteButton = $(row).find('.delete-btn')[0];
          this.renderer.listen(deleteButton, 'click', () => {
            this.softDeleteCategory(data);
          });
          return row;
        }
      });
    });
  }

  softDeleteCategory(data: any) {
    if (confirm('Are you sure you want to delete this category?')) {
      let category = { id: data.id, status: 0 };
      this.globalServices.updatecategory(category).subscribe(
        (response) => {
          console.log('Category status updated to Inactive', response);
          this.getCategories();
        },
        (error) => {
          console.error('Error updating category status', error);
        }
      );
    }
  }


}