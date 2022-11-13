import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;
  submitted: boolean = false;
  loggedIn: boolean = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService, private router: Router) {
    this.createForm();
    this.setValue();
  }


  createForm() {
    this.form = this.fb.group({
      username: [{ value: '' }, [Validators.email, Validators.required]],
      password: [{ value: '' }, [Validators.required]]
    });
  }

  setValue() {
    this.form.patchValue({
      username: '',
      password: ''
    })
  }

  /**
   * 
   * @returns User Logged in status
   * In case of success user will be redirected to task page
   * In case of failure validation will be displayed.
   */

  onSubmit() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    this.loading = true;
    this.firebaseService.login(this.form.controls.username.value, this.form.controls.password.value).then(res => {
      this.loading = false;
      if (this.firebaseService.isLoggedIn) {
        this.loggedIn = true;
        this.router.navigate(['/task']);
      } else {
        this.loggedIn = false;
      }
      this.submitted = true;
    }).finally(() => {
      this.loading = false;
    });
  }

}
