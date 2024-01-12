import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {Roles} from "../../shared/enums/roles";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logIn(){
    const email: string = this.loginForm.get('email')?.value;
    const password: string = this.loginForm.get('password')?.value;
    this.authService.signIn(email,password).pipe(
      take(1))
      .subscribe((res) => {
        this.authService.updateLoggedInUser(res)
        this.switchRoleAndRedirect(res.role)})
  }
  logOut(){
    this.authService.signOut()
    this.route.navigate(['/'])
    this.authService.updateLoggedInUser(null)
  }
  goToAdmin(){
    this.route.navigate(['/admin'])
  }
  goToWorker(){
    this.route.navigate(['/worker'])
  }
  goToManager(){
    this.route.navigate((['/manager']))
  }
  switchRoleAndRedirect(role: number){
    switch (role) {
      case Roles.admin:
        this.goToAdmin()
        break;
      case Roles.moderator:
        this.goToManager();
        break;
      default:
        this.goToWorker()
    }

  }

  protected readonly Roles = Roles;
}
