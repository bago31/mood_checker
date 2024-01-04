import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "./models/user.interface";

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
  //TODO: add function with add user to db
/*  adduserToDb(){
    this.afs.doc<User>
  }*/
  handleUserCredential(userCredential: firebase.auth.UserCredential){
    if(userCredential?.user?.uid){
      console.log(userCredential.user.uid)
    } else {
      console.log('Incorrect result')
    }
  }
}


