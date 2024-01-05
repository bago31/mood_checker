import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "./models/user.interface";
import {Roles} from "./enums/roles";
import {BehaviorSubject, from, Observable, Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
loggedInUser$$ = new BehaviorSubject<User | null>(null);
loggedInUser$ = this.loggedInUser$$.asObservable()
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {}

  addUser(email: string, password: string){
    this.afAuth.createUserWithEmailAndPassword(email,password).then(
      (userCredential) => this.handleUserCredential(userCredential)
    )
  }
  updateLoggedInUser(user: User | null){
  this.loggedInUser$$.next(user)
  }
    addUserToDb(user: User){
      this.afs.collection('users').doc(user.uid).set(user)
    }
  handleUserCredential(userCredential: firebase.auth.UserCredential){
    if(userCredential?.user?.uid && userCredential?.user?.email) {
      const user = this.createUser(userCredential?.user?.uid,userCredential?.user?.email)
      this.addUserToDb(user)
    } else {
      console.log('Incorrect result')
    }
  }
  createUser(uid: string,email: string) {
   const user: User = {
     uid: uid,
     email: email,
     role: Roles.worker,
     firstName: 'Secend',
     lastName: 'worker'
   }
   return user
  }

  signIn(email: string,password: string): Observable<User>{
  return from(this.afAuth.signInWithEmailAndPassword(email,password)).pipe(
    switchMap(result => {
       return this.afs.collection('users').doc(result.user?.uid).valueChanges() as Observable<User>
    })
  )
  }
  signOut(){
    this.afAuth.signOut()
  }
}


