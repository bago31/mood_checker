import { NgModule } from '@angular/core';
import { WorkerComponent } from './worker.component';
import {CommonModule} from "@angular/common";
import {WorkerRoutingModule} from "./worker-routing.module";

@NgModule({
  declarations: [
    WorkerComponent
  ],
  imports:[CommonModule, WorkerRoutingModule]
})
export class WorkerModule { }
