import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../shared/models/user.interface";
import {UserDbService} from "../../user-db.service";
import {Observable} from "rxjs";
import {AddGroupModalService} from "./add-group-modal.service";
import {take} from "rxjs/operators";
import {Group} from "../../../../shared/models/group.interface";
import {GroupDbService} from "../../group-db.service";

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.css'],
  providers: [AddGroupModalService]
})
export class AddGroupModalComponent implements OnInit {
  workerList$: Observable<User[]> = this.addGroupModalService.workerList$;
  managerList$: Observable<User[]>
  manager: User | null;
  teamName: string;
  teamMembers$: Observable<User[]> = this.addGroupModalService.teamMemberList$;

  constructor(private userDbService: UserDbService,
              private addGroupModalService: AddGroupModalService,
              private dialogRef: MatDialogRef<AddGroupModalComponent>,
              private groupDbService: GroupDbService) {
  }

  ngOnInit(): void {
    this.userDbService.getAllActiveWorker().subscribe((workerList) => {
      this.addGroupModalService.updateWorkerList(workerList)
    });
    this.managerList$ = this.userDbService.getAllActiveManager();

  }

  closeModal() {
    this.dialogRef.close()
  }

  chooseManager(manager: User) {
    this.manager = manager
  }

  unsetManager() {
    this.manager = null;
  }

  addWorkerToTeam(user: User) {
    this.addGroupModalService.addMemberToTeam(user).pipe(take(1)).subscribe((newTeam) => {
      this.addGroupModalService.updateTeamMemberList(newTeam)
    });
    this.addGroupModalService.deleteWorkerFromWorkerList(user.uid).pipe(take(1)).subscribe(
      (workerList) => this.addGroupModalService.updateWorkerList(workerList)
    )
  }

  rollbackUserFromTeam(user: User) {
    this.addGroupModalService.rollbackWorkerFromMemberList(user.uid).pipe(take(1)).subscribe((teamMembers) => {
      this.addGroupModalService.updateTeamMemberList(teamMembers);
    })
    this.addGroupModalService.rollbackUserToWorkerList(user).pipe(take(1)).subscribe(
      (workerList) => this.addGroupModalService.updateWorkerList(workerList)
    )
  }

  createTeam(members: User[]|null) {
    if (!this.manager) return
    const team: Group = {
      name: this.teamName,
      managerId: this.manager?.uid,
      members: members,
    }
    this.groupDbService.addGroup(team)
    }


}
