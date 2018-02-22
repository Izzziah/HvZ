import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AboutComponent } from './about/about.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ViewportComponent } from './viewport/viewport.component';
import { AppRoutingModule } from 'app/app-routing/app-routing.module';
import { AuthenticationService } from 'app/services/authentication.service';
import { ApiService } from "app/services/api.service";
import { NavService } from "app/services/nav.service";

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    AboutComponent,
    RegistrationComponent,
    AdminComponent,
    LoginComponent,
    ViewportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService, ApiService, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
