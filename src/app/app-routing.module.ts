import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { AuthGuard } from './guards/auth.guard'
import { CompaniesComponent } from './manage/companies/companies.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]  },
  { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard]  },
  { path: 'company/:id', component: CompaniesComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
