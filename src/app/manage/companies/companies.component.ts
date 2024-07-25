import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'jquery';
import 'datatables.net';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalServicesService } from '../../global-services.service';
import { ToastService } from '../../toast.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  companyData: any;
  paramId: any;

  constructor(
    private globalServices: GlobalServicesService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      company_id:[''],
      company_name: [''],
      company_url: [''],
      post_panel_url: this.fb.array([]),
      cms_url: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.getCompanyDetails();
  }

  getCompanyDetails(): void {
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
    const companyInfo = this.paramId ? this.paramId : '';
    this.globalServices.getCompanyInfo(companyInfo).subscribe(
      (response) => {
        this.companyData = this.paramId ? response.data : response.data.data;
        console.log('companyData', this.companyData);
        // Reinitialize DataTable after data is set
        this.initializeDataTables();
      },
      (error) => {
        this.toastService.showError(error);
      }
    );
  }

  get postPanelUrls(): FormArray {
    return this.form.get('post_panel_url') as FormArray;
  }

  ngAfterViewInit(): void {
    this.initializeDataTables();
  }

  initializeDataTables(): void {
    const tableId = '#style-3';
    // Destroy existing DataTable instance if any
    if ($.fn.DataTable.isDataTable(tableId)) {
      $(tableId).DataTable().destroy();
    }

    const table = $(tableId).DataTable({
      data: this.companyData,
      columns: [
        {
          title: 'S.No',
          data: null,
          render: (data: any, type: any, row: any, meta: any) => {
            return meta.row + 1;
          }
        },
        { title: 'Company Name', data: 'company_name' },
        { title: 'Company URL', data: 'company_url' },
        { title: 'Post Panel URL', data: 'post_panel_url' },
        { title: 'Report', data: 'company_name' },
        {
          title: 'Action',
          data: null,
          render: (data: any, type: any, row: any) => {
            return `
              <ul class="table-controls">
                <li>
                  <button class="edit-button" data-toggle="modal" data-target="#exampleModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 p-1 br-6 mb-1">
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <a href="javascript:void(0);" class="bs-tooltip" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash p-1 br-6 mb-1">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </a>
                </li>
              </ul>`;
          }
        }
      ],
      language: {
        paginate: { previous: '<svg ... ></svg>', next: '<svg ... ></svg>' },
        info: 'Showing page _PAGE_ of _PAGES_',
        search: '<svg ... ></svg>',
        searchPlaceholder: 'Search...',
        lengthMenu: 'Results :  _MENU_',
      },
      stripeClasses: [],
      lengthMenu: [5, 10, 20, 50],
      pageLength: 5
    });

    const component = this; // Capture component context

    $(tableId).on('click', '.edit-button', (event) => {
      const rowIndex = table.row($(event.target).closest('tr')).index();
      const rowData = table.row(rowIndex).data();
      console.log(`rowData`,rowData)
      if (rowData) {
        this.populateModalForm(rowData);
      } else {
        console.error('rowData is undefined or empty');
      }
    });
  }

  populateModalForm(rowData: any): void {
    this.form.patchValue({
      company_id: rowData.id,
      company_name: rowData.company_name,
      company_url: rowData.company_url,
      cms_url: rowData.cms_url,
      description: rowData.description
      // Add more fields as needed
    });
    // Clear and populate post_panel_url FormArray
    this.clearPostPanelUrls();
    rowData.post_panel_url.forEach((url: string) => {
      this.addInput(url);
    });
  }

  addInput(url: string = ''): void {
    this.postPanelUrls.push(this.fb.control(url));
  }

  removeInput(index: number): void {
    this.postPanelUrls.removeAt(index);
  }

  clearPostPanelUrls(): void {
    const control = this.form.get('post_panel_url') as FormArray;
    while (control.length) {
      control.removeAt(0);
    }
  }

  submitForm(): void {
    const formData = this.form.value;
    if (formData.company_name.trim() !== "") {
      let payload: {
        company_name: string;
        company_url: string;
        post_panel_url: any;
        cms_url: string;
        description: string;
        company_id?: any; // Optional company_id
      } = {
        company_name: formData.company_name,
        company_url: formData.company_url,
        post_panel_url: formData.post_panel_url,
        cms_url: formData.cms_url,
        description: formData.description
      };
      if(formData.company_id){
        payload.company_id = formData.company_id;
        console.log(`formData update`,payload)
        this.globalServices.updateCompanyData(payload).subscribe({
          next: (res: any) => {
            console.log('updatecompany Response:', res);
            this.toastService.showSuccess(res.message);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error: (err) => {
            console.error('addcompany Error:', err);
            this.toastService.showError(err.error.message);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        });
      }else{
        console.log(`formData add`,payload)
        this.globalServices.addCompanyData(payload).subscribe({
          next: (res: any) => {
            console.log('addcompany Response:', res);
            this.toastService.showSuccess(res.message);
            this.router.navigate(['/companies']);
          },
          error: (err) => {
            console.error('addcompany Error:', err);
            this.toastService.showError(err.error.message);
          }
        });
    }
    } else {
      this.toastService.showError('Company Name Required');
    }
  }

  resetForm(): void {
    this.form.reset({
      company_id: '',
      company_name: '',
      company_url: '',
      post_panel_url: [],
      cms_url: '',
      description: ''
    });
  }
  
}
