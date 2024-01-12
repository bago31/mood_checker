import { NgModule } from '@angular/core';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "./menu/menu.component";
import {ManagerListComponent} from "./manager-list/manager-list.component";
import {UserListComponent} from "./user-list/user-list.component";
import {AddUserFormComponent} from "./add-user-form/add-user-form.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations:[AdminComponent,MenuComponent,ManagerListComponent,UserListComponent,AddUserFormComponent],
  imports: [AdminRoutingModule, CommonModule, ReactiveFormsModule],
  exports:[]
})

export class AdminModule { }
