import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { AuthGuard } from './guards/auth.guard'
import { CategoriesComponent } from './manage/categories/categories.component'
import { SubcategoriesComponent } from './manage/subcategories/subcategories.component'
import { BrandsComponent } from './manage/brands/brands.component'
import { CategoryFormComponent } from './manage/categories/category-form/category-form.component'
import { SubcategoryFormComponent } from './manage/subcategories/subcategory-form/subcategory-form.component'
import { BrandsFormComponent } from './manage/brands/brands-form/brands-form.component'
import { ProductsComponent } from './manage/products/products.component'
import { ProductsFormComponent } from './manage/products/products-form/products-form.component'
import { CustomersComponent } from './manage/customers/customers.component'
import { VendorsComponent } from './manage/vendors/vendors.component'
import { RolesComponent } from './manage/roles/roles.component'
import { VendorFormComponent } from './manage/vendors/vendor-form/vendor-form.component'
import { RolesFormComponent } from './manage/roles/roles-form/roles-form.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]  },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]  },
  { path: 'sub-categories', component: SubcategoriesComponent, canActivate: [AuthGuard]  },
  { path: 'brands', component: BrandsComponent, canActivate: [AuthGuard]  },
  { path: 'category/add', component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'category/edit/:id', component: CategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'subcategory/add', component: SubcategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'subcategory/edit/:id', component: SubcategoryFormComponent, canActivate: [AuthGuard] },
  { path: 'brand/add', component: BrandsFormComponent, canActivate: [AuthGuard] },
  { path: 'brand/edit/:id', component: BrandsFormComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]  },
  { path: 'product/add', component: ProductsFormComponent, canActivate: [AuthGuard] },
  { path: 'product/edit/:id', component: ProductsFormComponent, canActivate: [AuthGuard] },
  { path: 'users-list', component: CustomersComponent, canActivate: [AuthGuard]  },
  { path: 'vendors-list', component: VendorsComponent, canActivate: [AuthGuard]  },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard]  },
  { path: 'vendor/add', component: VendorFormComponent, canActivate: [AuthGuard] },
  { path: 'vendor/edit/:id', component: VendorFormComponent, canActivate: [AuthGuard] },
  { path: 'role/add', component: RolesFormComponent, canActivate: [AuthGuard] },
  { path: 'role/edit/:id', component: RolesFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
