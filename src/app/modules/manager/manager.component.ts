import { Component, OnInit } from '@angular/core';
import {UserDbService} from '../admin/user-db.service';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user.interface';
import {Mood} from '../../shared/models/mood.interface';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  userList$: Observable<User[]>;
  userMoodList$: Observable<Mood[]>;

  constructor(private userDbService: UserDbService) {
  }

  ngOnInit(): void {
    this.userList$ = this.userDbService.getAllActiveUsers();
  }


  getUserData(userId: string): void {
    this.userMoodList$ = this.userDbService.getMoodsForUser(userId);
  }
}
