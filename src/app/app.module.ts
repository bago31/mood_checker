import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {ReactiveFormsModule} from "@angular/forms";
import {WorkerModule} from "./modules/worker/worker.module";
import {ManagerModule} from "./modules/manager/manager.module";
import {AdminModule} from "./modules/admin/admin.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule,
    ReactiveFormsModule,
    WorkerModule,
    ManagerModule,
    AdminModule
    // auth
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
