import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {Moods} from "../../shared/enums/moods";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  constructor(private afs: AngularFirestore){}

  isCompleted(userId: string, date: string): Observable<any>{
    return this.afs.collection(`users/${userId}/moods`).doc(date).valueChanges() as Observable<any>
  }

  addMoodForUser(mood_yourself: Moods,
                 mood_team: Moods,
                 mood_organization: Moods,
                 userId: string,date: string){
    this.afs.collection(`users/${userId}/moods`).doc(date).set({mood_yourself: mood_yourself,mood_team: mood_team,mood_organization: mood_organization,date: date});
  }
}
