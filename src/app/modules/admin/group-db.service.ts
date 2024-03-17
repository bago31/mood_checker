import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/firestore";
import {Group} from "../../shared/models/group.interface";

@Injectable({
  providedIn: 'root'
})
export class GroupDbService {
  constructor(private afs: AngularFirestore) {}

 addGroup(group: Group){
    this.afs.collection('devTeam').doc().set(group)
 }
}
