import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
export enum CharEnum{
  day,
  wee,
  month
}
@Injectable({
  providedIn: 'root'
})
export class ManagerStore {

  isSelectedUser$$ = new BehaviorSubject<boolean>(false);
  isSelectedUser$ = this.isSelectedUser$$.asObservable();

  selectedUser$$ = new BehaviorSubject<null | string>(null);
  selectedUser$ = this.selectedUser$$.asObservable();

  selectedCharType$$ = new BehaviorSubject<CharEnum>(CharEnum.day);
  selectedCharType$ = this.selectedCharType$$.asObservable();

  selectEmployee(userId: string): void  {
    this.selectedUser$$.next(userId);
    this.isSelectedUser$$.next(true);
  }

}
