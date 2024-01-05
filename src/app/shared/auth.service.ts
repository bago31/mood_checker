import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "./models/user.interface";
import {Roles} from "./enums/roles";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {}

  addUser(email: string, password: string){
    this.afAuth.createUserWithEmailAndPassword(email,password).then(
      (userCredential) => this.handleUserCredential(userCredential)
    )
  }
    addUserToDb(user: User){
      this.afs.collection('users').add(user)
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
}


