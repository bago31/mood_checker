import { NgModule } from '@angular/core';
import { ManagerComponent } from './manager.component';
import {CommonModule} from '@angular/common';
import {ManagerRoutingModule} from './manager-routing.module';
import {ChartsModule} from 'ng2-charts'

@NgModule({

  declarations: [
    ManagerComponent
  ],
  imports: [CommonModule, ManagerRoutingModule, ChartsModule]
})

export class ManagerModule {
}
