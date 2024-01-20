import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {UserListComponent} from "./user-list/user-list.component";
import {ManagerListComponent} from "./manager-list/manager-list.component";
import {WorkerListComponent} from "./worker-list/worker-list.component";
import {GroupListComponent} from "./group-list/group-list.component";

const routes: Routes = [
  {
    path:'',
    component: AdminComponent,
    children:[
      {
        path:'user-list',
        component:UserListComponent
      },
      {
        path:'manager-list',
        component:ManagerListComponent
      },
      {
        path:'worker-list',
        component:WorkerListComponent
      },
      {
        path:'group-list',
        component:GroupListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
