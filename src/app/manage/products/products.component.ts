import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';
import { GlobalServicesService } from '../../global-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  brandsList: any[] = [];
  vendorsList: any[] = [];
  productsList: any[] = [];
  dataTable: any;
  brandMap: { [key: string]: string } = {};
  vendorMap: { [key: string]: string } = {};

  constructor(private globalServices: GlobalServicesService, private authService: AuthService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
      this.loadBrands();
      this.loadVendors();
      this.loadProduducts()
  }

  loadBrands() {
    this.globalServices.getbrands().subscribe(
      (response: any) => {
        this.brandsList = response.data.data;
        this.brandMap = this.brandsList.reduce((map, brand) => {
          map[brand.id] = brand.brand_name;
          return map;
        }, {});
      },
      (error) => {
        console.error('Error fetching brands', error);
      }
    );
  }

  loadVendors() {
    this.globalServices.getvendors().subscribe(
      (response: any) => {
        this.vendorsList = response.data.data;
        this.vendorMap = this.vendorsList.reduce((map, vendor) => {
          map[vendor.vendor_id] = vendor.name;
          return map;
        }, {});
      },
      (error) => {
        console.error('Error fetching vendor', error);
      }
    );
  }

  loadProduducts() {
    this.globalServices.getproducts().subscribe(
      (response) => {
        console.log('products List', response.data.data);
        this.productsList = response.data.data;
        this.initializeDataTable();
      },
      (error) => {
        console.error('Error fetching products', error);
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
        data: this.productsList,
        columns: [
          { 
            title: 'S.No', 
            data: null,
            render: (data: any, type: any, row: any, meta: any) => {
              return meta.row + 1;
            }
          },
          { 
            title: 'Brands', 
            data: 'brand_id',
            render: (data: any, type: any, row: any) => {
              return this.brandMap[data] || 'Unknown';
            }
          },
          { 
            title: 'Vendors', 
            data: 'vendor_id',
            render: (data: any, type: any, row: any) => {
              return this.vendorMap[data] || 'Unknown';
            }
          },
          { title: 'Product Name', data: 'product_name' },          
          { title: 'Description', data: 'description' },
          { title: 'MRP', data: 'mrp' },
          { title: 'Discount %', data: 'discount_percentage' },
          { title: 'Price', data: 'price' },
          { title: 'Stock', data: 'stock' },
          { 
            title: 'Image Url', 
            data: 'image_urls',
            render: (data: string) => {
              const imageUrls: string[] = JSON.parse(data);
              return imageUrls.map((url: string) => `<img src="${url}" alt="Image" style="width: 50px; height: 50px;">`).join(' ');
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
                <a href="/product/edit/${row.id}" class="btn btn-sm btn-primary mr-2">
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
            this.softDeleteProduct(data);
          });
          return row;
        }
      });
    });
  }

  softDeleteProduct(data: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      let products = { product_id: data.id, status: 0 };
      this.globalServices.updateProduct(products).subscribe(
        (response) => {
          console.log('brand status updated to Inactive', response);
          this.loadProduducts();
        },
        (error) => {
          console.error('Error updating brand status', error);
        }
      );
    }
  }

}
