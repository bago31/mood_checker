import { Component, OnInit } from '@angular/core';
import {UserDbService} from '../admin/user-db.service';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user.interface';
import {Mood} from '../../shared/models/mood.interface';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {Moods} from '../../shared/enums/moods';
import {format} from 'date-fns';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  userList$: Observable<User[]>;
  userMoodList$: Observable<Mood[]>;
  todayDate: string = format(new Date(), 'yyyy-MM-dd');
  isUserSelect: boolean;
  barChartData:ChartDataSets[];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  barChartLabels: Label[] = ['Org', 'Team', 'Yourself'];
  barChartLabelsV2: Label[] = ['01-02-2022', '02-02-2022', '03-02-2022','04-02-2022', '05-02-2022'];

  constructor(private userDbService: UserDbService) {
  }

  ngOnInit(): void {
    this.userList$ = this.userDbService.getAllActiveWorker();
  }


  getUserData(userId: string): void {
    this.setIsUserSelect();
      this.userDbService.getMoodForUserForDate(userId,this.todayDate).subscribe((res => {
        this.barChartData = this.generateDataForSelectedEmployee(res[0])
    }));
  }

  setIsUserSelect(){
    this.isUserSelect = true;
  }

  unsetIsUserSelect(){
    this.isUserSelect = false
  }

  generateDataForSelectedEmployee(mood: Mood) {
  const todayMoodArray = [mood.mood_organization,mood.mood_team,mood.mood_yourself];
  const barChartData: ChartDataSets[] = [
      { data: todayMoodArray, label: 'Day mood' }
    ];
  return barChartData;
  }
}
