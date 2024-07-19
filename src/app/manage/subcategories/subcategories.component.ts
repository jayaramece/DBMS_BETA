import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';
import { GlobalServicesService } from '../../global-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.css'
})
export class SubcategoriesComponent implements OnInit {

  categoriesList: any[] = [];
  subcategoriesList: any[] = [];
  dataTable: any;
  categoryMap: { [key: string]: string } = {};

  constructor(private globalServices: GlobalServicesService, private authService: AuthService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
      this.loadCategories();
      this.getSubCategories()
  }

  loadCategories() {
    this.globalServices.getCategories().subscribe(
      (response: any) => {
        this.categoriesList = response.data.data;
        this.categoryMap = this.categoriesList.reduce((map, category) => {
          map[category.id] = category.cat_name;
          return map;
        }, {});
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  getSubCategories() {
    this.globalServices.getSubCategories().subscribe(
      (response) => {
        console.log('sub categories Data', response.data.data);
        this.subcategoriesList = response.data.data;
        this.initializeDataTable();
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  initializeDataTable() {
    $(() => {
      const table: any = $('#example');
      if ($.fn.DataTable.isDataTable(table)) {
        table.DataTable().destroy();
      }
      this.dataTable = table.DataTable({
        data: this.subcategoriesList,
        columns: [
          { 
            title: 'S.No', 
            data: null,
            render: (data: any, type: any, row: any, meta: any) => {
              return meta.row + 1;
            }
          },
          { 
            title: 'Category', 
            data: 'cat_id',
            render: (data: any, type: any, row: any) => {
              return this.categoryMap[data] || 'Unknown';
            }
          },
          { title: 'Sub Category', data: 'sub_name' },
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
                <a href="/subcategory/edit/${row.id}" class="btn btn-sm btn-primary mr-2">
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
            this.softDeleteSubCategory(data);
          });
          return row;
        }
      });
    });
  }

  softDeleteSubCategory(data: any) {
    if (confirm('Are you sure you want to delete this sub category?')) {
      let category = { id: data.id, status: 0 };
      this.globalServices.updatesubcategory(category).subscribe(
        (response) => {
          console.log('Sub Category status updated to Inactive', response);
          this.getSubCategories();
        },
        (error) => {
          console.error('Error updating sub category status', error);
        }
      );
    }
  }

}
