import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user.interface';
import {Roles} from '../../shared/enums/roles';
import {Mood} from '../../shared/models/mood.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDbService {
  constructor(private afs: AngularFirestore) {
  }


  getAllActiveUsers(): Observable<User[]> {
    return this.afs.collection('users',
      ref => ref
        .where('active', '==', true))
      .valueChanges() as Observable<User[]>;
  }

  getMoodForUserForDate(userId: string, date: string){
    return this.afs.collection(`users/${userId}/moods`, ref => ref
      .where('date', '==', date)).valueChanges() as Observable<Mood[]>;
  }
  getMoodForUserForWeek(userId: string, startDate: string, endDate: string): Observable<Mood[]> {
    return this.afs
      .collection(`users/${userId}/moods`, ref => ref
        .where('date', '>=', startDate)
        .where('date', '<=', endDate))
      .valueChanges() as Observable<Mood[]>;
  }

getAllActiveWorker() {
    return this.afs.collection('users',
      ref => ref
        .where('role', '==', Roles.worker)
        .where('active', '==', true))
      .valueChanges() as Observable<User[]>;
  }

  getAllActiveManager(): Observable<User[]> {
    return this.afs.collection('users',
      ref => ref
        .where('role', '==', Roles.manager)
        .where('active', '==', true))
      .valueChanges() as Observable<User[]>;
  }
  deactivateUser(userUid: string): void{
  const user = this.afs.collection('users').doc(userUid);
  user.set({active: false },{merge: true});
  }
}
