import { NgModule } from '@angular/core';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "./menu/menu.component";
import {ManagerListComponent} from "./manager-list/manager-list.component";
import {UserListComponent} from "./user-list/user-list.component";
import {AddUserModalComponent} from "./add-user-modal/add-user-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations:[AdminComponent,MenuComponent,ManagerListComponent,UserListComponent,AddUserModalComponent],
  imports: [AdminRoutingModule, CommonModule, ReactiveFormsModule,MatDialogModule],
  exports:[]
})

export class AdminModule { }
