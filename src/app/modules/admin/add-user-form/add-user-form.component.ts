import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css']
})
export class AddUserFormComponent implements OnInit {
  addUserForm: FormGroup
  constructor(private formBuilder: FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group(
      {
        email:['',Validators.required],
        password:['',Validators.required],
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        role:['', Validators.required]
      }
    )
  }
  addUser(){
    const email = this.addUserForm.get('email')?.value;
    const password = this.addUserForm.get('password')?.value;
    const firstName = this.addUserForm.get('firstName')?.value;
    const lastName = this.addUserForm.get('lastName')?.value;
    const role = Number(this.addUserForm.get('role')?.value);
    this.authService.addUser(email,password,role,firstName,lastName)
  }

}
