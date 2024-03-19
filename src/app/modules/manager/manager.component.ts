import {Component, OnInit} from '@angular/core';
import {UserDbService} from '../admin/user-db.service';
import {Observable, ReplaySubject} from 'rxjs';
import {User} from '../../shared/models/user.interface';
import {Mood} from '../../shared/models/mood.interface';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {
  eachDayOfInterval,
  endOfMonth, endOfWeek,
  format,
 startOfISOWeek,
  startOfMonth,  subDays
} from 'date-fns';
import {ManagerStore} from './manager.store';
import {endOfWeekWithOptions} from 'date-fns/fp';
import {take} from 'rxjs/operators';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  userList$: Observable<User[]>;
  isSelectedUser$: Observable<boolean>;
  selectedUser$: Observable<string | null>;
  selectedCharType$: Observable<any>;
  todayDate: string = format(new Date(), 'yyyy-MM-dd');
  barChartData: ChartDataSets[];
  barChartLabels: Label[];
  charType: ChartType = 'bar';
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

  constructor(
    private userDbService: UserDbService,
    private managerStore: ManagerStore) {
  }

  ngOnInit(): void {
    this.userList$ = this.userDbService.getAllActiveWorker();
    this.isSelectedUser$ = this.managerStore.isSelectedUser$;
    this.selectedUser$ = this.managerStore.selectedUser$;
    this.selectedCharType$ = this.managerStore.selectedCharType$;
  }

  getUserData(userId: string): void {
    this.managerStore.selectEmployee(userId);
    this.userDbService.getMoodForUserForDate(userId, this.todayDate)
      .pipe(take(1))
      .subscribe((res => {
        this.barChartData = this.generateDataForSelectedEmployee(res[0]);
        this.barChartLabels = ['Org', 'Team', 'Yourself'];
    }));
  }

  getUserDataForMonth(userId: string): void{
    const month = this.month();
    this.userDbService.getMoodForUserForWeek(userId, format(month[0], 'yyyy-MM-dd'), format(month[month.length - 1], 'yyyy-MM-dd'))
      .pipe(take(1))
      .subscribe(
      res => {
        this.barChartLabels = month.map(date => format(date, 'yyyy-MM-dd'));
        const data: any[] = [];
        res.forEach(mood => data.push(mood.mood_team));
        this.charType = 'line';
        this.barChartData = [
          {data, label: 'Month team mood'}
        ];
      }
    );
  }

  getUserDataForWeek(userId: string): void {
    const week = this.week();
    this.userDbService.getMoodForUserForWeek(userId, format(week[0], 'yyyy-MM-dd'), format(week[4], 'yyyy-MM-dd'))
      .pipe(take(1))
      .subscribe(
      res => {
        this.barChartLabels = week.map(date => format(date, 'yyyy-MM-dd'));
        const data: any[] = [];
        res.forEach(mood => data.push(mood.mood_team));
        this.barChartData = [
          {data, label: 'Week team mood'}
        ];
      }
    );
  }


  generateDataForSelectedEmployee(mood: Mood): ChartDataSets[] {
  const todayMoodArray = [mood.mood_organization, mood.mood_team, mood.mood_yourself];
  return [
    {data: todayMoodArray, label: 'Day mood'}
  ];
  }

  month(): Date[] {
    const today = new Date();
    const startMonth = startOfMonth(today);
    const endMonth = endOfMonth(today);
    return eachDayOfInterval({
      start: startMonth,
      end: endMonth
    });
  }

  week(): Date[]{
    const today = new Date();
    const startWeek = startOfISOWeek(today);
    const endWeek = subDays(endOfWeek(today), 1);
    return eachDayOfInterval({
      start: startWeek,
      end: endWeek
    });
  }
}
