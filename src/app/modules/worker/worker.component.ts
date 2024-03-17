import {Component} from '@angular/core';
import {User} from "../../shared/models/user.interface";
import {AuthService} from "../../shared/auth.service";
import {Observable, of} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { format } from "date-fns"
import {WorkerService} from "./worker.service";
import {switchMap, take} from "rxjs/operators";
import {Moods} from "../../shared/enums/moods"
@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css'],
})
export class WorkerComponent{
  public loggedInUser: Observable<User|null>;
  public moodForm: FormGroup;
  public date = format(new Date(),"yyyy-MM-dd");
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

  logOut(){
    this.authService.signOut();
  }

  enumToArray(enumObj: any) {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ value: enumObj[key], label: key }));
  }

  sendForm(){
    const mood_yourself: any = this.moodForm.get('mood_yourself')?.value
    const mood_team: any = this.moodForm.get('mood_team')?.value
    const mood_organization: any = this.moodForm.get('mood_organization')?.value
    const user = this.loggedInUser.pipe(take(1)).subscribe((user) => {
      if(user){
      this.workerService.addMoodForUser(mood_yourself,mood_team,mood_organization,user.uid, this.date);}
    })
  }
}
