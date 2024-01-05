import {Component, OnInit} from '@angular/core';
import {AngularFireModule} from "@angular/fire";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "./shared/auth.service";
import {User} from "./shared/models/user.interface";
import {take} from "rxjs/operators";


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
        this.authService.loggedInUser$.subscribe((res) => console.log(res))
        this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
        });
      }

      adduser(){
        this.authService.addUser(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value)
      }
      logIn(){
        this.authService.signIn(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).pipe(take(1)).subscribe((res) =>
          this.authService.updateLoggedInUser(res))
      }
      logOut(){
        this.authService.signOut()
        this.authService.updateLoggedInUser(null)
      }



      onSubmit() {

      }
}
