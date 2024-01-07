import { NgModule } from '@angular/core';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";

@NgModule({
  declarations:[AdminComponent],
  imports:[AdminRoutingModule],
  exports:[]
})

export class AdminModule { }
