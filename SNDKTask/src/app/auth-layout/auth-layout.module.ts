import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { LoginComponent } from './modules/login/login.component';
import { FirebaseService } from './services/firebase.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ], providers: [
    FirebaseService
  ]
})
export class AuthLayoutModule { }
