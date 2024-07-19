import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';
import { GlobalServicesService } from '../../global-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  subcategoriesList: any[] = [];
  brandsList: any[] = [];
  dataTable: any;
  subCategoryMap: { [key: string]: string } = {};

  constructor(private globalServices: GlobalServicesService, private authService: AuthService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
      this.loadSubCategories();
      this.getBrands()
  }

  loadSubCategories() {
    this.globalServices.getSubCategories().subscribe(
      (response: any) => {
        this.subcategoriesList = response.data.data;
        this.subCategoryMap = this.subcategoriesList.reduce((map, subcategory) => {
          map[subcategory.id] = subcategory.sub_name;
          return map;
        }, {});
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  getBrands() {
    this.globalServices.getbrands().subscribe(
      (response) => {
        console.log('brands Data', response.data.data);
        this.brandsList = response.data.data;
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
        data: this.brandsList,
        columns: [
          { 
            title: 'S.No', 
            data: null,
            render: (data: any, type: any, row: any, meta: any) => {
              return meta.row + 1;
            }
          },
          { 
            title: 'Sub Category', 
            data: 'subcat_id',
            render: (data: any, type: any, row: any) => {
              return this.subCategoryMap[data] || 'Unknown';
            }
          },
          { title: 'Brands', data: 'brand_name' },
          { 
            title: 'Image Url', 
            data: 'image_url',
            render: (data: string) => {
              return `<img src="${data}" alt="Image" style="width: 50px; height: 50px;">`;
            }
          },
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
                <a href="/brand/edit/${row.id}" class="btn btn-sm btn-primary mr-2">
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
            this.softDeleteBrands(data);
          });
          return row;
        }
      });
    });
  }

  softDeleteBrands(data: any) {
    if (confirm('Are you sure you want to delete this brands?')) {
      let brands = { id: data.id, status: 0 };
      this.globalServices.updatebrand(brands).subscribe(
        (response) => {
          console.log('brand status updated to Inactive', response);
          this.getBrands();
        },
        (error) => {
          console.error('Error updating brand status', error);
        }
      );
    }
  }

}
