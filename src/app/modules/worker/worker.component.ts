import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/user.interface";
import {AuthService} from "../../shared/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css'],
})
export class WorkerComponent{
  public loggedInUser: Observable<User|null>
  constructor(private authService: AuthService) {
    this.loggedInUser = this.authService.loggedInUser$;
  }
  logOut(){
    this.authService.signOut()
  }
}
