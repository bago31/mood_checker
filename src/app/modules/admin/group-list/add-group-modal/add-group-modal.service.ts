import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../../../../shared/models/user.interface";
import {map} from "rxjs/operators";

@Injectable()
export class AddGroupModalService {
  workerList$$ = new BehaviorSubject<User[]>([]);
  workerList$ = this.workerList$$.asObservable();

  teamMemberList$$ = new BehaviorSubject<User[]>([]);
  teamMemberList$ = this.teamMemberList$$.asObservable();

  updateWorkerList(newWorkerList: User[]){
    this.workerList$$.next(newWorkerList)
  }
  updateTeamMemberList(newTeamMemberList: User[]){
    this.teamMemberList$$.next(newTeamMemberList)
  }
  deleteWorkerFromWorkerList(workerId: string){
    return this.workerList$$.pipe(map((workerList) => {
      return workerList?.filter(worker => worker.uid !== workerId) || [];
    }))
  }
  rollbackWorkerFromMemberList(teamMemberId: string) {
    return this.teamMemberList$$.pipe(map((memberTeamList)=>{
      return memberTeamList?.filter(teamMember => teamMember.uid !== teamMemberId) || []
    }))
  }

  addMemberToTeam(newMember: User){
    return this.teamMemberList$$.pipe(map((teamMembers) => {
     return  [...teamMembers, newMember]
    }))
  }
  rollbackUserToWorkerList(user: User){
    return this.workerList$$.pipe(map((workerList) => {
      return  [...workerList, user]
    }))
  }
}
