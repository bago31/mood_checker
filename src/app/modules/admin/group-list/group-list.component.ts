import { Component, OnInit } from '@angular/core';
import {AddUserModalComponent} from "../add-user-modal/add-user-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {AddGroupModalComponent} from "./add-group-modal/add-group-modal.component";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  constructor(private matDialog: MatDialog) {
  }
openCreateGroupModal(){
  this.matDialog.open(AddGroupModalComponent)
}
}
