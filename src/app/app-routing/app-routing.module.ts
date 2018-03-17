import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from 'app/login/login.component';
import { UserHomeComponent } from 'app/user-home/user-home.component';
import { RegistrationComponent } from '../registration/registration.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'userhome', component: UserHomeComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'about', component: AboutComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
