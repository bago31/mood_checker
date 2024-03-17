import { NgModule } from '@angular/core';
import { ManagerComponent } from './manager.component';
import {CommonModule} from '@angular/common';
import {ManagerRoutingModule} from './manager-routing.module';

@NgModule({

  declarations: [
    ManagerComponent
  ],
  imports: [CommonModule, ManagerRoutingModule]
})

export class ManagerModule {
}
