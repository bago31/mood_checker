import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../shared/models/user.interface";
import {UserDbService} from "../user-db.service";
import {MatDialog} from "@angular/material/dialog";
import {AddUserModalComponent} from "../add-user-modal/add-user-modal.component";
import {ManagerListStore} from "./manager-list.store";

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
  providers:[ManagerListStore]
})
export class ManagerListComponent implements OnInit {
  managerList$ = this.managerListStore.managerList$

  constructor(private userDbService: UserDbService,
              private matDialog: MatDialog,
              private managerListStore: ManagerListStore) {
  }

  ngOnInit(): void {
    this.userDbService.getAllManager().subscribe((managerList) => {
      this.managerListStore.updateManagerList(managerList)
    })
  }
  openAddUserModal(){
    this.matDialog.open(AddUserModalComponent)
  }
}
