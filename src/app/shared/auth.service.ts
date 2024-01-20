import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "./models/user.interface";
import {Roles} from "./enums/roles";
import {BehaviorSubject, from, Observable, Subject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
loggedInUser$$ = new BehaviorSubject<User | null>(null);
loggedInUser$ = this.loggedInUser$$.asObservable()
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {}

  addUser(email: string, password: string,role: Roles,firstName: string, lastName: string){
    this.afAuth.createUserWithEmailAndPassword(email,password).then(
      (userCredential) =>
        this.handleUserCredential(userCredential,role,firstName,lastName)
    )
  }
  updateLoggedInUser(user: User | null){
  this.loggedInUser$$.next(user)
  }
    addUserToDb(user: User){
      this.afs.collection('users').doc(user.uid).set(user)
    }
  handleUserCredential(userCredential: firebase.auth.UserCredential,role:Roles,firstName:string,lastName:string){
  const uid = userCredential?.user?.uid;
  const email = userCredential?.user?.email;
    if(uid && email) {
      const user = this.createUser(
        uid,
        email,
        role,
        firstName,
        lastName
      )
      this.addUserToDb(user)
    } else {
      console.log('Incorrect result')
    }
  }
  createUser(uid: string,email: string,role: Roles,firstName: string,lastName: string) {
   const user: User = {
     uid: uid,
     email: email,
     role: role,
     firstName: firstName,
     lastName: lastName,
     active: true
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
    this.afAuth.signOut();
    this.router.navigate(['/login'])
  }
}


