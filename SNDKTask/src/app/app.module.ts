import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-layout/services/auth-guard.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FirebaseService } from './auth-layout/services/firebase.service';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/**
 * Intial Configuration for firebase and other required modules
 * used HashLocationStrategy
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA5yAslAVlvJL2KIM3fdajmNpQ2v3uZZMM",
      authDomain: "sndk-test-project.firebaseapp.com",
      projectId: "sndk-test-project",
      storageBucket: "sndk-test-project.appspot.com",
      messagingSenderId: "306160756253",
      appId: "1:306160756253:web:0ceddc0ff595c0f97508f4"
    }),
  ],
  providers: [
    AuthGuardService,
    FirebaseService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



