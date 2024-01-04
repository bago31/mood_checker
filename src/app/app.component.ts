import {Component, OnInit} from '@angular/core';
import {AngularFireModule} from "@angular/fire";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mood-checker';
    loginForm: FormGroup;

      constructor(private formBuilder: FormBuilder) {}

      ngOnInit() {
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });
      }

      onSubmit() {

      }
}
