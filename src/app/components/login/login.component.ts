import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ILogin } from 'src/app/types/login.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dataLogin: ILogin = {} as ILogin;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = this.fb.group({
    user: ['', Validators.required],
    pass: ['', Validators.required]
  })

  login() {
    if (this.loginForm.invalid) {
      this.dataLogin = {
        user: this.loginForm.value.user,
        pass: this.loginForm.value.pass
      } 
      sessionStorage.setItem('username', this.dataLogin.user)
      console.log(this.dataLogin) 
    } else {
      
    }
  }
  logout() {
    sessionStorage.removeItem('username')
  }
}