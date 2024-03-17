import {NgModule} from '@angular/core';
import {WorkerComponent} from './worker.component';
import {CommonModule} from "@angular/common";
import {WorkerRoutingModule} from "./worker-routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    WorkerComponent
  ],
  imports: [CommonModule, WorkerRoutingModule, ReactiveFormsModule]
})
export class WorkerModule {
}
