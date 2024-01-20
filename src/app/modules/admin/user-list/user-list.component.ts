import { Component, OnInit } from '@angular/core';
import {UserDbService} from "../user-db.service";
import {Observable} from "rxjs";
import {User} from "../../../shared/models/user.interface";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList$: Observable<User[]>
  constructor(private userDbService: UserDbService) { }

  ngOnInit(): void {
    this.userList$ = this.userDbService.getAllActiveUsers();
  }

  deleteUser(userUid: string){
    this.userDbService.deactivateUser(userUid)
  }
}
