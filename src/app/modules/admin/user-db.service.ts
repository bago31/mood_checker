import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.interface";
import {Roles} from "../../shared/enums/roles";

@Injectable({
  providedIn: 'root'
})
export class UserDbService {
  constructor(private afs: AngularFirestore) {
  }

  getAllUsers(): Observable<User[]> {
    return this.afs.collection('users').valueChanges() as Observable<User[]>
  }

  getAllWorker() {

  }

  getAllManager(): Observable<User[]> {
    return this.afs.collection('users',
      ref => ref.where('role', '==', Roles.manager))
      .valueChanges() as Observable<User[]>
  }
}
