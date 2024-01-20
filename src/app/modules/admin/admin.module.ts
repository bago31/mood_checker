import {NgModule} from '@angular/core';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {CommonModule} from "@angular/common";
import {MenuComponent} from "./menu/menu.component";
import {ManagerListComponent} from "./manager-list/manager-list.component";
import {UserListComponent} from "./user-list/user-list.component";
import {AddUserModalComponent} from "./add-user-modal/add-user-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {NavbarComponent} from "./navbar/navbar.component";
import {GroupListComponent} from "./group-list/group-list.component";
import {WorkerListComponent} from "./worker-list/worker-list.component";
import {AddGroupModalComponent} from "./group-list/add-group-modal/add-group-modal.component";

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    ManagerListComponent,
    UserListComponent,
    AddUserModalComponent,
    NavbarComponent,
    GroupListComponent,
    WorkerListComponent,
    AddGroupModalComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule],
  exports: []
})

export class AdminModule {
}
