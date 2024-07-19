import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InlineHeaderComponent } from './auth/inline-header/inline-header.component';
import { InlineFooterComponent } from './auth/inline-footer/inline-footer.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CategoriesComponent } from './manage/categories/categories.component';
import { SubcategoriesComponent } from './manage/subcategories/subcategories.component';
import { BrandsComponent } from './manage/brands/brands.component';
import { ProductsComponent } from './manage/products/products.component';
import { CategoryFormComponent } from './manage/categories/category-form/category-form.component';
import { SubcategoryFormComponent } from './manage/subcategories/subcategory-form/subcategory-form.component';
import { BrandsFormComponent } from './manage/brands/brands-form/brands-form.component';
import { ProductsFormComponent } from './manage/products/products-form/products-form.component';
import { CustomersComponent } from './manage/customers/customers.component';
import { VendorsComponent } from './manage/vendors/vendors.component';
import { RolesComponent } from './manage/roles/roles.component';
import { VendorFormComponent } from './manage/vendors/vendor-form/vendor-form.component';
import { RolesFormComponent } from './manage/roles/roles-form/roles-form.component';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    InlineHeaderComponent,
    InlineFooterComponent,
    UserProfileComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    BrandsComponent,
    ProductsComponent,
    CategoryFormComponent,
    SubcategoryFormComponent,
    BrandsFormComponent,
    ProductsFormComponent,
    CustomersComponent,
    VendorsComponent,
    RolesComponent,
    VendorFormComponent,
    RolesFormComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
