import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/auth.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  addUserForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private dialogRef: MatDialogRef<AddUserModalComponent>) {
  }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        role: ['', Validators.required]
      }
    )
  }
//TODO: Add close method after positiv add User when error show info about
  addUser() {
    const email = this.addUserForm.get('email')?.value;
    const password = this.addUserForm.get('password')?.value;
    const firstName = this.addUserForm.get('firstName')?.value;
    const lastName = this.addUserForm.get('lastName')?.value;
    const role = Number(this.addUserForm.get('role')?.value);
    this.authService.addUser(email, password, role, firstName, lastName);

  }

  closeDialog() {
  this.dialogRef.close()
  }

}
