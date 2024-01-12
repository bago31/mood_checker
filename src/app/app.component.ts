import {Component, OnInit} from '@angular/core';
import {AngularFireModule} from "@angular/fire";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "./shared/auth.service";
import {User} from "./shared/models/user.interface";
import {take} from "rxjs/operators";
import {Router} from "@angular/router";
import {Roles} from "./shared/enums/roles";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService,FormBuilder]
})
export class AppComponent implements OnInit{
  title = 'mood-checker';

      constructor() {}

      ngOnInit() {
      }

}
