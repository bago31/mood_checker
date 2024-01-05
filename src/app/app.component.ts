import {Component, OnInit} from '@angular/core';
import {AngularFireModule} from "@angular/fire";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "./shared/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService,FormBuilder]
})
export class AppComponent implements OnInit{
  title = 'mood-checker';
    loginForm: FormGroup;

      constructor(private formBuilder: FormBuilder,private authService: AuthService) {}

      ngOnInit() {
        this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
        });
      }

      adduser(){
        console.log(this.loginForm.get('email')?.value)
        //this.authService.addUser(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value)
      }

      onSubmit() {

      }
}
