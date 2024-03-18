import {Component, OnInit} from '@angular/core';
import {UserDbService} from '../admin/user-db.service';
import {Observable, ReplaySubject} from 'rxjs';
import {User} from '../../shared/models/user.interface';
import {Mood} from '../../shared/models/mood.interface';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label} from 'ng2-charts';
import {eachDayOfInterval, format, isFriday, isMonday, isWeekend, nextFriday, previousFriday, previousMonday} from 'date-fns';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  userList$: Observable<User[]>;
  userMoodList$: Observable<Mood[]>;
  charConfigList$ = new ReplaySubject<any[]>();
  todayDate: string = format(new Date(), 'yyyy-MM-dd');
  isUserSelect: boolean;
  barChartData: ChartDataSets[];
  barChartLabels: Label[];
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

  constructor(private userDbService: UserDbService) {
  }

  ngOnInit(): void {
    this.userList$ = this.userDbService.getAllActiveWorker();
    this.userDbService.getAllActiveWorker().subscribe(res => this.getUsersData(res));
  }

  getUsersData(users: User[]): void{
    const configList: any[] = [];
    users.forEach(user => {
      this.userDbService.getMoodForUserForDate(user.uid, this.todayDate).subscribe(
        res => {
          configList.push(this.generateDataForSelectedEmployee(res[0]));
          this.charConfigList$.next(configList);
        });
    });
  }
  getUserData(userId: string): void {
    this.setIsUserSelect();
    this.userDbService.getMoodForUserForDate(userId, this.todayDate).subscribe((res => {
        this.barChartData = this.generateDataForSelectedEmployee(res[0]);
        this.barChartLabels = ['Org', 'Team', 'Yourself'];
    }));
  }
  getUserDataForWeek(userId: string){
    const week = this.weekCheck();
    this.userDbService.getMoodForUserForWeek(userId, format(week[0], 'yyyy-MM-dd'), format(week[4], 'yyyy-MM-dd')).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  setIsUserSelect(): void {
    this.isUserSelect = true;
  }

  unsetIsUserSelect(): void {
    this.isUserSelect = false;
  }

  generateDataForSelectedEmployee(mood: Mood): ChartDataSets[] {
  const todayMoodArray = [mood.mood_organization, mood.mood_team, mood.mood_yourself];
  return [
    {data: todayMoodArray, label: 'Day mood'}
  ];
  }
  weekCheck(): Date[] {
    const today = new Date();
    if (isMonday(today)){
      const startWeekDate = today;
      const endWeekDate: any = nextFriday(today);
      return eachDayOfInterval({
        start: startWeekDate,
        end: endWeekDate
      });
    }
    else if (isFriday(today)){
      const startWeekDate = previousMonday(today);
      const endWeekDate: any = today;
      return eachDayOfInterval({
        start: startWeekDate,
        end: endWeekDate
      });
    }
    else if (isWeekend(today)){
      const startWeekDate = previousMonday(today);
      const endWeekDate: any = previousFriday(today);
      return eachDayOfInterval({
        start: startWeekDate,
        end: endWeekDate
      });
    }
    else {
      const startWeekDate = previousMonday(today);
      const endWeekDate: any = nextFriday(today);
      return eachDayOfInterval({
        start: startWeekDate,
        end: endWeekDate
      });
    }
  }
}
