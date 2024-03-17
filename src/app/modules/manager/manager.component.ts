import { Component, OnInit } from '@angular/core';
import {UserDbService} from "../admin/user-db.service";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.interface";
import {Mood} from "../../shared/models/mood.interface";
//import { Label } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  userList$: Observable<User[]>
  userMoodList$: Observable<Mood[]>
  public barChartOptions: ChartOptions = { responsive: true };
  //public barChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataset[] = [
    { data: [45, 37, 60], label: 'My Data' }
  ];
  constructor(private userDbService: UserDbService) { }

  ngOnInit(): void {
    this.userList$ = this.userDbService.getAllActiveUsers();
  }


getUserData(userId: string){
this.userMoodList$ = this.userDbService.getMoodsForUser(userId)
}
}
//Wyświelenie wszystkich użytkowników po prawej strnie
// Możliwość klknięcia i wyświetlenia donaych przez nich dancyh
//Po prawej lista członków teamu
//Czyli znalezienie na bazie menagera wejście w kolekcje team i następnie pobranie wszystkich z użytkowników
