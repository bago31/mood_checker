import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./modules/admin/admin.component";

const routes: Routes = [
  {
    path:'login',
    loadChildren:() => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path:'admin',
    loadChildren:() => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'worker',
    loadChildren: () => import('./modules/worker/worker.module').then(m => m.WorkerModule)
  },
  {
    path:'manager',
    loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule)
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
