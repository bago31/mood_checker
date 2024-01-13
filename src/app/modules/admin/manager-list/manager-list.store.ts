import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../../shared/models/user.interface";

@Injectable()
export class ManagerListStore {
  managerList$$: BehaviorSubject<User[]|null> = new BehaviorSubject<User[]|null>(null);
  managerList$:Observable<User[]|null> = this.managerList$$.asObservable();

  updateManagerList(newList: User[]){
    this.managerList$$.next(newList)
  }


}
