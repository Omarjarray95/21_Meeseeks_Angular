import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { SingleComponent } from './single/single.component';
import { MapviewComponent } from './mapview/mapview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddComponent, SingleComponent, MapviewComponent]
})
export class ClientModule { }
