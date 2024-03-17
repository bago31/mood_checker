import {Component} from '@angular/core';
import {User} from '../../shared/models/user.interface';
import {AuthService} from '../../shared/auth.service';
import {Observable, of} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {format} from 'date-fns';
import {WorkerService} from './worker.service';
import {switchMap, take} from 'rxjs/operators';
import {Moods} from '../../shared/enums/moods';
@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css'],
})
export class WorkerComponent{
  public loggedInUser: Observable<User|null>;
  public moodForm: FormGroup;
  public date = format(new Date(), 'yyyy-MM-dd');
  public moods = this.enumToArray(Moods);
  public isAdded: boolean;
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private workerService: WorkerService) {
    this.loggedInUser = this.authService.loggedInUser$;
  }
  ngOnInit(){
    this.loggedInUser.subscribe((user) => {
      if(!user){
       // this.authService.signOut()
      }
    })
    this.loggedInUser.pipe(
      take(1),
      switchMap((user) => {
      if(user){
        return this.workerService.isCompleted(user.uid,this.date)
      } else{
        return of(null)
      }
    })).subscribe((res) => {
      if(res) {
        this.isAdded = true
      }
    })

    this.moodForm = this.fb.group(
      {
        mood_yourself: ["", Validators.required],
        mood_team: ["", Validators.required],
        mood_organization: ["", Validators.required],
      }
    )
  }

  logOut(): void{
    this.authService.signOut();
  }

  enumToArray(enumObj: any) {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ value: enumObj[key], label: key }));
  }

  sendForm(){
    const mood_yourself: any = this.moodForm.get('mood_yourself')?.value;
    const mood_team: any = this.moodForm.get('mood_team')?.value;
    const mood_organization: any = this.moodForm.get('mood_organization')?.value;
    this.loggedInUser.pipe(take(1)).subscribe((user) => {
      if(user){
      this.workerService.addMoodForUser(mood_yourself,mood_team,mood_organization,user.uid, this.date);
      }
    })
  }
/*
  getRandomInt(): number {
    const min = 1;
    const max = 5;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
*/
/*
  genereteDate(){
    const dateArr = [
      "2024-03-01",
      "2024-03-02",
      "2024-03-03",
      "2024-03-04",
      "2024-03-05",
      "2024-03-06",
      "2024-03-07",
      "2024-03-08",
      "2024-03-09",
      "2024-03-10",
      "2024-03-11",
      "2024-03-12",
      "2024-03-13",
      "2024-03-14",
      "2024-03-15",
      "2024-03-16",
      "2024-03-17",
      "2024-03-18",
      "2024-03-19",
      "2024-03-20",
      "2024-03-21",
      "2024-03-22",
      "2024-03-23",
      "2024-03-24",
      "2024-03-25",
      "2024-03-26",
      "2024-03-27",
      "2024-03-28",
      "2024-03-29",
      "2024-03-30",
      "2024-03-31"
    ]
    this.loggedInUser.pipe(take(1)).subscribe((user) => {
      if(user){
       dateArr.forEach(date => {
         const mood_yourself: any = this.getRandomInt()
         const mood_team: any = this.getRandomInt()
         const mood_organization: any = this.getRandomInt()
         this.workerService.addMoodForUser(mood_yourself,mood_team,mood_organization,user.uid, date)});
      }
    })
  }
*/
}
